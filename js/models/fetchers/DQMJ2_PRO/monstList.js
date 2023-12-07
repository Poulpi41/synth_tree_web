const monstList = fetch("https://poulpi41.github.io/resources/DQMJ2_Pro/monster_list.json").then(response => response.json()).then(data => { return data; });

export default await monstList;