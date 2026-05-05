// innerHTML — gets or sets the HTML markup inside an element as a string (element nodes only)
document.querySelector(".container").innerHTML

// innerText — gets or sets the visible text content inside an element (respects CSS styling, e.g. hidden text is excluded)
document.querySelector(".container").innerText

// outerHTML — gets the full HTML of the element including the element's own opening/closing tags
document.querySelector(".container").outerHTML

// tagName — returns the tag name of an element node in uppercase (e.g. "DIV"); only available on Element nodes
document.querySelector(".container").tagName

// nodeName — similar to tagName but works on any node type (Element, Text, Comment, etc.)
document.querySelector(".container").nodeName

// textContent — gets or sets all text inside an element, including text in hidden elements; ignores HTML tags
document.querySelector(".container").textContent

// hidden — setting to true adds display:none to the element, making it invisible on the page
document.querySelector(".container").hidden = true

// designMode — when set to "on", makes the entire page editable (like a rich-text editor) in the browser
document.designMode = "on"

// ─── Attribute Methods ────────────────────────────────────────────────────────
// Method                           Description
// elem.hasAttribute(name)          Returns true/false — checks whether the attribute exists on the element
// elem.getAttribute(name)          Returns the value of the named attribute as a string
// elem.setAttribute(name, value)   Creates or updates the named attribute with the given value
// elem.removeAttribute(name)       Removes the named attribute from the element entirely
// elem.attributes                  Returns a live NamedNodeMap of all attributes on the element