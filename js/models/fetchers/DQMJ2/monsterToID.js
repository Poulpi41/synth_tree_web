const monsterToID = fetch("https://poulpi41.github.io/resources/DQMJ2/monsterToID.json").then(response => response.json()).then(data => { return data; });

export default await monsterToID;