const IDToMonster = fetch("https://poulpi41.github.io/resources/DQMJ2/IDToMonster.json").then(response => response.json()).then(data => { return data; });

export default await IDToMonster;