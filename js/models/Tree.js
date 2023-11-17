class SynthTree{
    constructor(id,name,level){
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
        let html = "";
        if (this.id == 0){
            html+="<ul>";
        }
        html+= "<li id='node" + this.id + "'>" + this.name;
        if (this.level != null){
            html += this.level;
        }
        if (this.parentNumber > 0){
            html += "<ul>";
            for (let i = 0; i < this.parentNumber; i++){
                html += this.parent[i].toHtml();
            }
            html += "</ul>";
        }
        html += "</li>";
        if (this.id == 0){
            html+="</ul>";
        }
        return html;
    }
}
function createTree(proxy, name, depth){
    return rec_createTree(0, proxy, name, depth);
}
function extractLevel(str){
    let test = str.indexOf(" lv.");
    if (test == -1){
        return {name: str, level: null};
    }
    else{
        let name = str.slice(0, test);
        let level = str.slice(test);
        return {name: name, level: level};
    }
}
function rec_createTree(nodeNumber, proxy, name, depth){
    let tmp = extractLevel(name);
    let node = new SynthTree(nodeNumber, tmp['name'], tmp['level']);
    if (depth == 0){
        return node;
    }
    else{
        let synthesis = proxy.searchFirst(name);
        if (synthesis == null){
            return node;
        }
        else{
            let parents = synthesis['parents'];
            if (parents == undefined){
                return node;
            }
            for (let i = 0; i < parents.length; i++){
                node.addChildren(rec_createTree(nodeNumber + i + 1, proxy, parents[i], depth - 1));
            }
        }
        return node;
    }

}
export {createTree};