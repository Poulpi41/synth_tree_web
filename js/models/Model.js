class Model{
    static instance;
    constructor(){
        if (this.constructor == Model){
            throw new Error("Model is an abstract class and cannot be instantiated");
        }

        if (this.getMonstList == undefined){
            throw new Error("method getMonstList() must be implemented");
        }

        if (this.getDB == undefined){
            throw new Error("method getDB() must be implemented");
        }

        if (this.getIDCorrespondance == undefined){
            throw new Error("method getIDCorrespondance() must be implemented");
        }
    }
}
export {Model};