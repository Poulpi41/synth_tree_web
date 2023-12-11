import { DefaultPage } from "../views/defaultPage.js";
import { MonstSelect } from "../views/monsterSelector.js";
import { dqmj2Model } from "../models/dqmj2Model.js";
import { dqmj2ProModel } from "../models/dqmj2ProModel.js";
import { createTree ,SynthTree} from "../models/Tree.js";
import { SynthList } from "../views/synthList.js";


class PageChanger {
  constructor() {
    this.currentBody = document.querySelector("body");
    this.loadDefaultPage();
  }
  loadDefaultPage() {
    let defaultPage = new DefaultPage();
    this.currentBody.innerHTML = "";
    this.currentBody.appendChild(defaultPage.getPage());
    let btnGo = document.querySelector("#goButton");
    btnGo.addEventListener("click", () => {
      let gameVersion = document.querySelector("#gameVersionSelector").value;
      this.loadMonstSelect(gameVersion);
    });
    this.#addButtonTreeStroed();
  }
  loadMonstSelect(gameVersion) {
    switch (gameVersion) {
      case "DQMJ2":
        this.#loadSession(dqmj2Model.getInstance(), "DQMJ2");
        break;
      case "DQMJ2Pro":
        this.#loadSession(dqmj2ProModel.getInstance(), "DQMJ2Pro");
        break;
      default:
        throw new Error(`game version : ${gameVersion} unimplemented`);
    }
  }
  #loadFamilyTree(model, name, depth) {
    let tree = createTree(model, name, depth);
    this.currentBody.innerHTML = "";
    this.currentBody.appendChild(tree.toHtml());
    this.#exportTree(tree, name);
    this.#buttonGoBackToMonsterChoice();
  }
  #exportTree(tree, name) {
    let btn = document.createElement("button");
    btn.id = "exportTree";
    btn.innerHTML = "export tree";
    btn.addEventListener("click", () => {
      let text = JSON.stringify(tree);
      localStorage.setItem(`${this.gameVersion}_${name}`, text);
    });
    this.currentBody.appendChild(btn);
  }
  #loadSynthList(model, name) {
    let sl = new SynthList(name, model);
    this.currentBody.innerHTML = "";
    this.currentBody.appendChild(sl.getTable());
    this.#buttonGoBackToMonsterChoice();
  }
  #loadSession(model, gameVersion) {
    let sel = new MonstSelect(model.getMonstList(), 32, gameVersion);
    this.currentBody.innerHTML = "";
    this.currentBody.appendChild(sel.getElement());
    let btnFamilyTree = document.querySelector("#familyTreeBtn");
    btnFamilyTree.addEventListener("click", () => {
      let depth = document.querySelector("#depthSelect").value;
      let monst = document.querySelector("#monstSelect").value;
      this.#loadFamilyTree(model, monst, depth);
    });
    let btnSynthList = document.querySelector("#synthListBtn");
    btnSynthList.addEventListener("click", () => {
      let monst = document.querySelector("#monstSelect").value;
      this.#loadSynthList(model, monst);
    });
    this.#gameSelectionBtn();
    this.gameVersion = gameVersion;
  }

  #gameSelectionBtn() {
    let btn = document.createElement("button");
    btn.id = "gameSelectionBtn";
    btn.innerHTML = "go to game version selection";
    btn.addEventListener("click", () => {
      this.loadDefaultPage();
    });
    this.currentBody.appendChild(btn);
  }
  #buttonGoBackToMonsterChoice() {
    let btnGoBack = document.createElement("button");
    btnGoBack.id = "goBackDQMJ2Select";
    btnGoBack.innerHTML = "go back to monster selection";
    btnGoBack.addEventListener("click", () => {
      this.loadMonstSelect(this.gameVersion);
    });
    this.currentBody.appendChild(btnGoBack);
  }
  #addButtonTreeStroed() {
    let btnTreeStrored = document.createElement("button");
    btnTreeStrored.id = "btnTreeStored";
    btnTreeStrored.innerHTML = "load stored tree";
    btnTreeStrored.addEventListener("click", () => {
      this.#listTree();
    });
    this.currentBody.appendChild(btnTreeStrored);
  }
  #listTree() {
    let list = document.createElement("ul");
    let keys = Object.keys(localStorage);
    keys.forEach((key) => {
        let li = document.createElement("li");
        li.innerHTML = key;
        let btn_load = document.createElement("button");
        btn_load.innerHTML = "load";
        btn_load.addEventListener("click", () => {
            let infos = key.split("_");
            let gameVersion = infos[0];
            let name = infos[1];
            let text = localStorage.getItem(key);
            let tree = JSON.parse(text);
            this.#loadStoredTree(tree, gameVersion, name);
        });
        let btn_delete = document.createElement("button");
        btn_delete.innerHTML = "delete";
        btn_delete.addEventListener("click", () => {
            localStorage.removeItem(key);
            li.remove();
        });
        li.appendChild(btn_load);
        li.append(btn_delete)
        list.appendChild(li);
    });
    this.currentBody.innerHTML = "";
    this.currentBody.appendChild(list);
    this.#gameSelectionBtn();
  }
  #loadStoredTree(tree, gameVersion, name) {
    let gvToITM = {
      'DQMJ2': dqmj2Model.getInstance().getIDCorrespondance(),
      'DQMJ2Pro': dqmj2ProModel.getInstance().getIDCorrespondance(),
    };
    let idToMonst = gvToITM[gameVersion];
    let synthTree = SynthTree.fromJson(tree, idToMonst);
    this.currentBody.innerHTML = "";
    this.currentBody.appendChild(synthTree.toHtml());
    this.#addButtonTreeStroed();
  }
}

export {PageChanger};