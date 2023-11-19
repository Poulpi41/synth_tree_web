import dqmj2_db from "./fetchers/DQMJ2/db.js";
import monsterToID from "./fetchers/DQMJ2/monsterToID.js";



class DB_DQMJ2 {
    constructor(){
        this.load();
    }
    async load(){
        this.db_dqmj2 = dqmj2_db;
    }
    searchFor(name){
        let id = monsterToID[name];
        let test = this.db_dqmj2[id];
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

export {DB_DQMJ2};