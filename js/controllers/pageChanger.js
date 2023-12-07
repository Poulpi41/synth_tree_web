import { DefaultPage } from "../views/defaultPage.js";
import { MonstSelect } from "../views/monsterSelector.js";
import { dqmj2Model } from "../models/dqmj2Model.js";
import { dqmj2ProModel } from "../models/dqmj2ProModel.js";
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
            case "DQMJ2Pro":
                this.loadDQMJ2_PROSession();
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
        let btnFamilyTree = document.querySelector("#familyTreeBtn");
        btnFamilyTree.addEventListener("click", () => {
            let depth = document.querySelector("#depthSelect").value;
            let monst = document.querySelector("#monstSelect").value;
            this.loadDQMJ2FamilyTree(nonPro,monst,depth);
        });
        let btnSynthList = document.querySelector("#synthListBtn");
        btnSynthList.addEventListener("click", () => {
            let monst = document.querySelector("#monstSelect").value;
            this.loadDQMJ2SynthList(nonPro.getDB(),monst);
        });
        this.#gameSelectionBtn();
    }
    loadDQMJ2FamilyTree(model,name,depth){
        let tree = createTree(model,name,depth);
        this.currentBody.innerHTML = "";
        this.currentBody.appendChild(tree.toHtml());
        let btnGoBack = document.createElement("button");
        this.#buttonGoBackToMonsterChoice();
    }
    loadDQMJ2SynthList(db,name){
        let synths = db.searchFor(name);
        let sl = new SynthList(name,synths);
        this.currentBody.innerHTML = "";
        this.currentBody.appendChild(sl.getTable());
        this.#buttonGoBackToMonsterChoice();
    }

    loadDQMJ2_PROSession(){
        let pro = dqmj2ProModel.getInstance();
        let sel  = new MonstSelect(pro.getMonstList(), 32, "pro2");
        this.currentBody.innerHTML = "";
        this.currentBody.appendChild(sel.getElement());

        let btnFamilyTree = document.querySelector("#familyTreeBtn");
        btnFamilyTree.addEventListener("click", () => {
            let depth = document.querySelector("#depthSelect").value;
            let monst = document.querySelector("#monstSelect").value;
            this.loadDQMJ2_PROFamilyTree(pro,monst,depth);
        });
        let btnSynthList = document.querySelector("#synthListBtn");
        btnSynthList.addEventListener("click", () => {
            let monst = document.querySelector("#monstSelect").value;
            this.loadDQMJ2_PROSynthList(pro.getDB(),monst);
        });
        this.#gameSelectionBtn();
    }
    loadDQMJ2_PROFamilyTree(model,name,depth){
        let tree = createTree(model,name,depth);
        this.currentBody.innerHTML = "";
        this.currentBody.appendChild(tree.toHtml());
        this.#buttonGoBackToMonsterChoice();
    }
    loadDQMJ2_PROSynthList(db,name){
        let synths = db.searchFor(name);
        let sl = new SynthList(name,synths);
        this.currentBody.innerHTML = "";
        this.currentBody.appendChild(sl.getTable());
        this.#buttonGoBackToMonsterChoice();
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
    #buttonGoBackToMonsterChoice(){
        let btnGoBack = document.createElement("button");
        btnGoBack.id = "goBackDQMJ2Select";
        btnGoBack.innerHTML = "go back to monster selection";
        btnGoBack.addEventListener("click", () => {
            this.loadDQMJ2Session();
        });
        this.currentBody.appendChild(btnGoBack);
    }
}

export {PageChanger};