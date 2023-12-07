const synthProp = fetch("https://poulpi41.github.io/resources/DQMJ2_InComon/synthProp.json").then(response => response.json()).then(data => { return data; });

export default await synthProp;