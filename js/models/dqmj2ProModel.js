import monstList from "./fetchers/DQMJ2_PRO/monstList.js";
import IDToMonster from "./fetchers/DQMJ2_PRO/IDToMonster.js";
import { DB_DQMJ2_PRO } from "./ProxyDQMJ2Pro.js";
import { Model } from "./Model.js";

class dqmj2ProModel extends Model{
    constructor(){
        super();
        this.monstList = monstList;
        this.db = new DB_DQMJ2_PRO();
        this.idCorrespondance = IDToMonster;
    }
    static getInstance(){
        if (this.instance == undefined){
            this.instance = new dqmj2ProModel();
        }
        return this.instance;
    }
    getMonstList(){
        return dqmj2ProModel.getInstance().monstList;
    }
    getDB(){
        return dqmj2ProModel.getInstance().db;
    }
    getIDCorrespondance(){
        return dqmj2ProModel.getInstance().idCorrespondance;
    }
}

export {dqmj2ProModel};