const IDToMonster = fetch("https://poulpi41.github.io/resources/DQMJ2_Pro/IDToMonster.json").then(response => response.json()).then(data => { return data; });

export default await IDToMonster;