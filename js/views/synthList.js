import uti from "../models/Utils.js";
import IDToMonster from "../models/fetchers/DQMJ2/IDToMonster.js";
import synthProp from "../models/fetchers/DQMJ2/synthProp.js";

class SynthList{
    constructor(son,synths){
        this.son = son;
        this.synths = synths;
    }
    #elemTable(name,lv){
        let td = document.createElement("td");
        let img = document.createElement("img");
        img.src = uti.getStringImage(name);
        td.appendChild(img);
        let br = document.createElement("br");
        td.appendChild(br);
        let level = lv == undefined ? "" : ` lv.${lv}`; 
        td.appendChild(document.createTextNode(name+level));
        return td;
    }
    getTable(){
        let headers = [
            "Son",
            "parent1",
            "parent2",
            "parent3",
            "parent4",
            "synth type",
            "rank type"
        ]
        let table = document.createElement("table");
        table.id = "synthList";
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");
        for (let i = 0; i < headers.length; i++){
            let th = document.createElement("th");
            th.innerHTML = headers[i];
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        table.appendChild(thead);
        for (let k = 0; k < this.synths.length; k++){
            let element = this.synths[k];
            let tr2 = document.createElement("tr");
            let td_son = this.#elemTable(this.son);
            tr2.appendChild(td_son);
            let parentList = element["p"];
            for (let i = 0; i < parentList.length; i++){
                let name = IDToMonster[parentList[i]["i"]];
                let lv = parentList[i]["l"];
                let td = this.#elemTable(name,lv);
                tr2.appendChild(td);
            }
            for (let i = 0; i < 4 - parentList.length; i++){
                let td = document.createElement("td");
                tr2.appendChild(td);
            }
            let td_st = document.createElement("td");
            td_st.innerHTML = synthProp[element["st"]];
            tr2.appendChild(td_st);
            let td_rt = document.createElement("td");
            td_rt.innerHTML =synthProp[element["rt"]];
            tr2.appendChild(td_rt);
            table.appendChild(tr2);
        };
        return table;
    }
}

export {SynthList};