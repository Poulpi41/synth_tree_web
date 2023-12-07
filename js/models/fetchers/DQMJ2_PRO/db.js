const dqmj2_db = fetch("https://poulpi41.github.io/resources/DQMJ2_Pro/synth.json").then(response => response.json()).then(data => { return data; });

export default await dqmj2_db;