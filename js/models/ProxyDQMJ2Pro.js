import dqmj2_pro_db from "./fetchers/DQMJ2_PRO/db.js";
import monsterToID from "./fetchers/DQMJ2_PRO/monsterToID.js";
import uti from "./Utils.js";


class DB_DQMJ2_PRO {
    constructor(){
        this.load();
    }
    async load(){
        this.db_dqmj2 = dqmj2_pro_db;
    }
    searchFor(name){
        let id = monsterToID[name];
        let test = this.db_dqmj2[id];
        if (test == undefined){
            return []
        }
        else{
            return test.sort(uti.compareSynthProp);
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

export {DB_DQMJ2_PRO};