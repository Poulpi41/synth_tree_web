import monstList from "./fetchers/DQMJ2/monstList.js";
import IDToMonster from "./fetchers/DQMJ2/IDToMonster.js";
import { DB_DQMJ2 } from "./ProxyDQMJ2.js";
import { Model } from "./Model.js";

class dqmj2Model extends Model{
    constructor(){
        super();
        this.monstList = monstList;
        this.db = new DB_DQMJ2();
        this.idCorrespondance = IDToMonster;
    }
    static getInstance(){
        if (this.instance == undefined){
            this.instance = new dqmj2Model();
        }
        return this.instance;
    }
    getMonstList(){
        return dqmj2Model.getInstance().monstList;
    }
    getDB(){
        return dqmj2Model.getInstance().db;
    }
    getIDCorrespondance(){
        return dqmj2Model.getInstance().idCorrespondance;
    }
}

export {dqmj2Model};