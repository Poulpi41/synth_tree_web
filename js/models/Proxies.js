// async function getDB(url){
//     const response = fetch(url).then(response => response.json()).then(data => { return data; });
//     return await response;
// }

import rsrc from "./DQMJ2_fetcher.js";
const propVal = {
    "generic": {
        "rank decrease": 1,
        "same rank": 2,
        "rank increase": 3
    },
    "special": {
        "rank decrease": 4,
        "same rank": 5,
        "rank increase": 6
    }
}

var compareSynthProp = function(a, b){
    return propVal[b['synthtype']][b['ranktype']] - propVal[a['synthtype']][a['ranktype']];
}
class ProxyDQMJ2 {
    constructor(){
        this.load();
    }
    async load(){
        this.db_dqmj2 = rsrc;
    }
    searchFor(name){
        let test = this.db_dqmj2[name];
        if (test == undefined){
            return []
        }
        else{
            return test.sort(compareSynthProp);
        }
    }
    searchFirst(name){
        let tmp = this.searchFor(name);
        if (tmp.length == 0){
            return null;
        }
        else{
            return tmp[0];
        }
    }
}
class ProxyDQMJ2Pro{
    loaded = false;
    constructor(){}
    async load(){
        this.db_dqmj2_pro = getDB("https://poulpi41.github.io/db_pro.json");
        this.loaded = true;
    }

}

export {ProxyDQMJ2};