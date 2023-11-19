import uti from "./Utils.js";
import IDToMonster from "./fetchers/DQMJ2/IDToMonster.js";

class SynthTree{
    constructor(id,name,level, depth){
        this.id = id;
        this.name = name;
        this.level = level;
        this.parent = [];
        this.parentNumber = 0;
    }
    addChildren(child){
        this.parent.push(child);
        this.parentNumber++;
    }
    toHtml(){
        let li = document.createElement("li");
        li.id = `node${this.id}`;
        let img = document.createElement("img");
        img.src = uti.getStringImage(this.name);
        img.alt = `${this.name} image`;
        li.appendChild(img);
        li.appendChild(document.createElement("br"));
        let lv = this.level == null ? "" : ` lv.${this.level}`;
        let text = document.createTextNode(this.name+lv);
        li.appendChild(text);
        if (this.parentNumber > 0){
            let ul = document.createElement("ul");
            for (let i = 0; i < this.parentNumber; i++){
                ul.appendChild(this.parent[i].toHtml());
            }
            li.appendChild(ul);
        }
        if (this.id == 0){
            let ul = document.createElement("ul");
            ul.appendChild(li);
            return ul;
        }
        return li;
    }
}
function createTree(proxy, name, depth){
    return rec_createTree(0, proxy, name, null, depth);
}
// function extractLevel(str){
//     let test = str.indexOf(" lv.");
//     if (test == -1){
//         return {name: str, level: null};
//     }
//     else{
//         let name = str.slice(0, test);
//         let level = str.slice(test);
//         return {name: name, level: level};
//     }
// }
function rec_createTree(nodeNumber, proxy, name, level, depth){
    // let tmp = extractLevel(name);
    let node = new SynthTree(nodeNumber, name, level,depth);
    if (depth == 0){
        return node;
    }
    else{
        let synthesis = proxy.searchFirst(name);
        if (synthesis == null){
            return node;
        }
        else{
            let parents = synthesis['p'];
            if (parents == undefined){
                return node;
            }
            for (let i = 0; i < parents.length; i++){
                let lv = parents[i]['l']==undefined ? null : parents[i]['l'];
                node.addChildren(rec_createTree(nodeNumber + i + 1, proxy, IDToMonster[`${parents[i]['i']}`], lv, depth - 1));
            }
        }
        return node;
    }
}
export {createTree};