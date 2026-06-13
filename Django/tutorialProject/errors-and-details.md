1) The mismatch is clear. In urls.py:9, the URL captures are named num1 and num2, but in views.py:18, the function parameters are n1 and n2. Django passes captured URL values as keyword arguments matching the names in the URL pattern, so the names must match exactly.
Fix — rename the view parameters to match the URL names

2) For the todos view once the code is written (views.py, urls.py, todos.html, models.py), the work is still not complete as the DB is not aware of it. So close the server and do the migration:
python manage.py makemigrations
python manage.py migrate

3) In a ModelForm, the class body is reserved for defining custom form fields — things you manually add or override. Django watches everything you define directly on the class and treats it as a field.

The Meta class is a separate, dedicated namespace purely for configuration — telling Django which model to use, which fields to include, how to render them, etc. Django's ModelForm internals specifically look inside Meta for this config, and nowhere else.

To create a superuser:
python manage.py createsuperuser
To include our database models, we need to register them in the admin interface. Open admin.py and add:
from .models import Person, Todo
admin.site.register(Person)
admin.site.register(Todo)

4) Gunicorn does not work on Windows — ModuleNotFoundError: No module named 'fcntl'

Error:
    ModuleNotFoundError: No module named 'fcntl'

Cause:
    fcntl is a Unix-only module (Linux/macOS). It does not exist on Windows at all.
    Gunicorn depends on it internally, so Gunicorn cannot run on Windows — this is a known,
    documented limitation and not a bug in your code.

Recommendation — Use WSL (Windows Subsystem for Linux):
    WSL lets you run a real Linux environment inside Windows. Since Gunicorn is the standard
    production WSGI server for Django on Linux (used on AWS, DigitalOcean, Heroku, etc.),
    learning it inside WSL is the best approach — it mirrors a real production setup.

    Steps:
    1. Install WSL: open PowerShell as Administrator and run:
           wsl --install
    2. Open your project inside WSL and create a new virtual environment there.
    3. Install gunicorn inside the WSL venv:
           pip install gunicorn
    4. Run gunicorn normally:
           gunicorn tutorialProject.wsgi:application

    For local development only (not production), you can also use:
        python manage.py runserver       (Django's built-in dev server, works on Windows)
        waitress-serve --port=8000 tutorialProject.wsgi:application  (Windows-compatible WSGI server)

5) Gunicorn in WSL — static files 500 error (TypeError: expected str, bytes or os.PathLike object, not NoneType)

Error:
    Internal Server Error: /static/css/style.css
    TypeError: expected str, bytes or os.PathLike object, not NoneType

Cause:
    STATIC_ROOT is not set in settings.py. Gunicorn (unlike runserver) does not serve static
    files automatically — it hands that responsibility to Django's static file handler, which
    needs STATIC_ROOT to know where the collected files live. runserver hides this gap because
    it handles static files itself in DEBUG mode.

Fix:
    1. Add STATIC_ROOT to settings.py:
           STATIC_ROOT = BASE_DIR / 'staticfiles'

    2. Run collectstatic to gather all static files into that folder:
           python manage.py collectstatic

    3. Restart gunicorn — the 500 error will be gone.

6) Docker port already allocated when starting PostgreSQL container

Error:
    docker: Error response from daemon: failed to set up container networking:
    Bind for 0.0.0.0:5432 failed: port is already allocated

Cause:
    Port 5432 is already in use — either by a previously created Docker container that
    wasn't removed, or by a local PostgreSQL installation on Windows.

Fix:
    Option A — Remove the old container and reuse port 5432:
        docker ps -a              # find the old container
        docker rm pgdb            # remove it
        docker run --name pgdb -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

    Option B — Use a different port (what worked here):
        docker run --name pgdb -e POSTGRES_PASSWORD=postgres -p 5433:5432 -d postgres
        Then update settings.py:
            'PORT': '5433'

    To check what is occupying the port on Windows:
        netstat -ano | findstr :5432

7) Django migrate fails — password authentication failed for user "postgres"

Error:
    psycopg2.OperationalError: connection to server at "localhost" (::1), port 5432 failed:
    FATAL: password authentication failed for user "postgres"

Cause:
    The Docker container failed to start (due to error 6 above), so Django connected to
    whatever else was running on port 5432 (a local PostgreSQL install or old container)
    which did not have a matching postgres/postgres credential.

Fix:
    Resolve the port conflict first (see error 6), ensure the correct container is running
    with docker ps, then rerun:
        python manage.py migrate

8) Gunicorn "Error handling request (no URI read)" — harmless, can be ignored

Error:
    [ERROR] Error handling request (no URI read)
    gunicorn.http.errors.NoMoreData / SystemExit: 1

Cause:
    The browser opened a TCP connection to Gunicorn but closed it before sending an HTTP
    request. This is normal browser behaviour — browsers speculatively open connections,
    prefetch, or send HTTPS probes to an HTTP server. It is not a code error or DB issue.
    Django's runserver silently swallows these; Gunicorn logs them because it is a
    production-grade server that logs all worker-level events.

    The app continues working correctly — this log line can be safely ignored.

Fix (to reduce noise):
    Run Gunicorn with --log-level warning to suppress these routine messages:
        gunicorn tutorialProject.wsgi:application --log-level warning

    Real errors to watch for instead:
        [ERROR] Exception in worker process     ← actual crash
        django.db.utils.OperationalError        ← DB connection issue
        ModuleNotFoundError                     ← missing package