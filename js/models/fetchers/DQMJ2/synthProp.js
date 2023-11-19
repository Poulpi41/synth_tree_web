const synthProp = fetch("https://poulpi41.github.io/DQMJ2/synthProp.json").then(response => response.json()).then(data => { return data; });

export default await synthProp;