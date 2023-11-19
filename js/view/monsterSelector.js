class MonstSelect{
    constructor(monstList,maxDepth,id){
        this.ml = monstList;
        this.maxDepth = maxDepth;
        this.id = id;
    }
    #getMonstSelect(){
        let select = document.createElement('select');
        select.setAttribute('id','monstSelect');
        for (let i = 0; i < this.ml.length; i++) {
            let opt = document.createElement('option');
            opt.appendChild(document.createTextNode(this.ml[i]));
            opt.value = this.ml[i];
            select.appendChild(opt);
        }
        return select;
    }
    #getDepthSelect(){
        let select = document.createElement('select');
        select.setAttribute('id','depthSelect');
        for (let i = 1; i <= this.maxDepth; i++) {
            let opt = document.createElement('option');
            opt.appendChild(document.createTextNode(i));
            opt.value = i;
            select.appendChild(opt);
        }
        return select;
    }
    #getButtonTree(){
        let btn = document.createElement('button');
        btn.setAttribute('id','familyTreeBtn');
        btn.appendChild(document.createTextNode('Start family tree printing'));
        return btn;
    }
    #getButtonList(){
        let btn = document.createElement('button');
        btn.setAttribute('id','synthListBtn');
        btn.appendChild(document.createTextNode('Start synth list printing'));
        return btn;
    }
    getElement(){
        let p = document.createElement('p');
        p.setAttribute('id',this.id);
        p.appendChild(this.#getMonstSelect());
        p.appendChild(this.#getDepthSelect());
        p.appendChild(this.#getButtonTree());
        p.appendChild(this.#getButtonList());
        return p;
    }
}

export {MonstSelect};