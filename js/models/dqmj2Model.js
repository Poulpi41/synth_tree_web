import monstList from "./fetchers/DQMJ2/monstList.js";
import { DB_DQMJ2 } from "./ProxyDQMJ2.js";

class dqmj2Model{
    constructor(monstList,db){
        this.monstList = monstList;
        this.db = db;
    }
    static getInstance(){
        if (this.instance == undefined){
            this.instance = new dqmj2Model(monstList,new DB_DQMJ2());
        }
        return this.instance;
    }
    getMonstList(){
        return dqmj2Model.getInstance().monstList;
    }
    getDB(){
        return dqmj2Model.getInstance().db;
    }
}

export {dqmj2Model};