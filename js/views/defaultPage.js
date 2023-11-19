import uti from "../models/Utils.js";

class DefaultPage{
    constructor(){
        this.defaultPage = document.createElement("p");
        this.defaultPage.id = "defaultPage";
        this.defaultPage.appendChild(this.#gameVersionSelector());
        let buton = document.createElement("button");
        buton.innerHTML = "Go";
        buton.id = "goButton";
        this.defaultPage.appendChild(buton);
    }
    #gameVersionSelector(){
        let select = document.createElement("select");
        select.id = "gameVersionSelector";
        for (let i = 0; i < uti.gameVersions.length; i++){
            let option = document.createElement("option");
            option.value = uti.gameVersions[i];
            option.innerHTML = uti.gameVersions[i];
            select.appendChild(option);
        }
        return select;
    }
    getPage(){
        return this.defaultPage;
    }
}

export {DefaultPage};