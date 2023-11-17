const rsrc = fetch("https://poulpi41.github.io/db.json").then(response => response.json()).then(data => { return data; });

export default await rsrc;