const dqmj2_db_pro = fetch("https://poulpi41.github.io/resources/DQMJ2/synth.json").then(response => response.json()).then(data => { return data; });

export default await dqmj2_db_pro;