import uti from "./Utils.js";

class SynthTree{
    static fromJson(json){
        return this.rec_fromJson(json);
    }
    static rec_fromJson(obj){
        let node = new SynthTree(obj.id, obj.name, obj.level, obj.depth, undefined);
        if (obj.parentNumber > 0){
            for (let i = 0; i < obj.parentNumber; i++){
                node.addChildren(SynthTree.rec_fromJson(obj.parent[i], undefined));
            }
        }
        return node;
    }
    constructor(id,name,level, depth, idToMonster){
        this.id = id;
        this.name = name;
        this.level = level;
        this.parent = [];
        this.parentNumber = 0;
        this.depth = depth;
        this.idToMonster = idToMonster;
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
        let lv = this.level == null ? "" : ` lv.${this.level}`;
        let text = document.createTextNode(this.name+lv);
        let toAppend = li;
        if (this.parentNumber > 0){
            let span = document.createElement("span");
            span.className = "caret";
            li.appendChild(span);
            span.addEventListener("click", () => {
                span.parentElement.querySelector(".nested").classList.toggle("active");
                span.classList.toggle("caret-down");
            });
            toAppend = span;
        }
        toAppend.appendChild(img);
        // toAppend.appendChild(document.createElement("br"));
        toAppend.appendChild(text);
        if (this.parentNumber > 0){
            let ul = document.createElement("ul");
            ul.className = "nested";
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
function rec_createTree(nodeNumber, model, name, level, depth){
    // let tmp = extractLevel(name);
    let node = new SynthTree(nodeNumber, name, level,depth);
    if (depth == 0){
        return node;
    }
    else{
        let synthesis = model.getDB().searchFirst(name);
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
                node.addChildren(rec_createTree(nodeNumber + i + 1, model, model.getIDCorrespondance()[`${parents[i]['i']}`], lv, depth - 1));
            }
        }
        return node;
    }
}
export { createTree, SynthTree };