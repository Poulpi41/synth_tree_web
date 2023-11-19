import { DefaultPage } from "../views/defaultPage.js";
import { MonstSelect } from "../views/monsterSelector.js";
import { dqmj2Model } from "../models/dqmj2Model.js";
import { createTree } from "../models/Tree.js";
import { SynthList } from "../views/synthList.js";

class PageChanger{
    constructor(){
        this.currentBody = document.querySelector("body");
        this.loadDefaultPage();
    }
    loadDefaultPage(){
        let defaultPage = new DefaultPage();
        this.currentBody.innerHTML = "";
        this.currentBody.appendChild(defaultPage.getPage());
        let btnGo = document.querySelector("#goButton");
        btnGo.addEventListener("click", () => {
            let gameVersion = document.querySelector("#gameVersionSelector").value;
            this.loadMonstSelect(gameVersion);
        });
    }
    loadMonstSelect(gameVersion){
        switch (gameVersion) {
            case "DQMJ2":
                this.loadDQMJ2Session();
                break;
        
            default:
                throw new Error(`game version : ${gameVersion} unimplemented`);
        }
    }
    loadDQMJ2Session(){
        let nonPro = dqmj2Model.getInstance();
        let sel  = new MonstSelect(nonPro.getMonstList(), 32, "non_pro2");
        this.currentBody.innerHTML = "";
        this.currentBody.appendChild(sel.getElement());
        this.#gameSelectionBtn();
        let btnFamilyTree = document.querySelector("#familyTreeBtn");
        btnFamilyTree.addEventListener("click", () => {
            let depth = document.querySelector("#depthSelect").value;
            let monst = document.querySelector("#monstSelect").value;
            this.loadDQMJ2FamilyTree(nonPro.getDB(),monst,depth);
        });
        let btnSynthList = document.querySelector("#synthListBtn");
        btnSynthList.addEventListener("click", () => {
            let monst = document.querySelector("#monstSelect").value;
            this.loadDQMJ2SynthList(nonPro.getDB(),monst);
        });
    }
    loadDQMJ2FamilyTree(model,name,depth){
        let tree = createTree(model,name,depth);
        this.currentBody.innerHTML = "";
        this.currentBody.appendChild(tree.toHtml());
        let btnGoBack = document.createElement("button");
        btnGoBack.id = "goBackDQMJ2Select";
        btnGoBack.innerHTML = "go back to monster selection";
        btnGoBack.addEventListener("click", () => {
            this.loadDQMJ2Session();
        });
        this.currentBody.appendChild(btnGoBack);
    }
    loadDQMJ2SynthList(db,name){
        let synths = db.searchFor(name);
        let sl = new SynthList(name,synths);
        this.currentBody.innerHTML = "";
        this.currentBody.appendChild(sl.getTable());
        let btnGoBack = document.createElement("button");
        btnGoBack.id = "goBackDQMJ2Select";
        btnGoBack.innerHTML = "go back to monster selection";
        btnGoBack.addEventListener("click", () => {
            this.loadDQMJ2Session();
        });
        this.currentBody.appendChild(btnGoBack);
    }
    #gameSelectionBtn(){
        let btn = document.createElement("button");
        btn.id = "gameSelectionBtn";
        btn.innerHTML = "go to game version selection";
        btn.addEventListener("click", () => {
            this.loadDefaultPage();
        });
        this.currentBody.appendChild(btn);
    }
}

export {PageChanger};