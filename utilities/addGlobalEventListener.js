export default function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if(e.target.matches(selector)) {
            callback(e) // to get the id, ill pass the data atrribute id given to "const container" in line 25. ParseInt() converts the string into a number because in the items.json, the id is a number 
        }
    })
}