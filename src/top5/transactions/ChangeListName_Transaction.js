import jsTPS_Transaction from "../../common/jsTPS.js"

/**
 * ChangeListName_Transaction
 * 
 * This class represents a transaction that updates the text
 * for a given item. It will be managed by the transaction stack.
 * 
 */
export default class ChangeListName_Transaction extends jsTPS_Transaction {
    constructor(initModel, initId, initOldListName, initNewListName) {
        super();
        this.model = initModel;
        this.id = initId;
        this.oldText = initOldListName;
        this.newText = initNewListName;
    }

    doTransaction() {
        this.model.changeListName(this.id, this.newText);
    }
    
    undoTransaction() {
        this.model.changeListName(this.id, this.oldText);
    }
}