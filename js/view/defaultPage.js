class defaultPage{
    constructor(){
        this.defaultPage = document.createElement("p");
        this.defaultPage.id = "defaultPage";
        this.defaultPage.appendChild(this.#gameVersionSelector());
        let buton = document.createElement("button");
        buton.innerHTML = "Go";
        buton.id = "goButton";
    }
    #gameVersionSelector(){
        gameVersions = [
            "DQMJ2",
            //"DQMJ2_Pro"
        ];
        let select = document.createElement("select");
        select.id = "gameVersionSelector";
        for (let i = 0; i < gameVersions.length; i++){
            let option = document.createElement("option");
            option.value = gameVersions[i];
            option.innerHTML = gameVersions[i];
            select.appendChild(option);
        }
        return select;
    }
}