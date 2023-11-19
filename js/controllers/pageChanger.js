// import { MonstSelect } from "../view/monsterSelector.js";
// import monstList from "../models/fetchers/DQMJ2/monstList.js";
import dqmj2_db from "../models/fetchers/DQMJ2/db.js";
import monsterToID from "../models/fetchers/DQMJ2/monsterToID.js";
import { SynthList } from "../view/synthList.js";

class PageChanger{
    constructor(){
        // let defaultPage = new MonstSelect(monstList,10,"DQMJ2_monstSelect");
        // document.querySelector("body").appendChild(defaultPage.getElement());
        let name = "marquis de leon";
        let sl = new SynthList(name, dqmj2_db[monsterToID[name]]);
        document.querySelector("body").appendChild(sl.getTable());
    }
}

export {PageChanger};