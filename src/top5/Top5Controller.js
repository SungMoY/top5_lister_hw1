/**
 * Top5ListController.js
 * 
 * This file provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class Top5Controller {
    constructor() {

    }

    setModel(initModel) {
        this.model = initModel;
        this.initHandlers();
    }

    initHandlers() {
        // SETUP THE TOOLBAR BUTTON HANDLERS
        document.getElementById("add-list-button").onmousedown = (event) => {
            let newList = this.model.addNewList("Untitled", ["?","?","?","?","?"]);            
            this.model.loadList(newList.id);
            this.model.saveLists();
        }
        document.getElementById("undo-button").onmousedown = (event) => {
            this.model.undo();
        }

        // SETUP THE ITEM HANDLERS
        for (let i = 1; i <= 5; i++) {
            let item = document.getElementById("item-" + i);

            // AND FOR TEXT EDITING
            item.ondblclick = (ev) => {
                if (this.model.hasCurrentList()) {
                    // CLEAR THE TEXT
                    item.innerHTML = "";

                    // ADD A TEXT FIELD
                    let textInput = document.createElement("input");
                    textInput.setAttribute("type", "text");
                    textInput.setAttribute("id", "item-text-input-" + i);
                    textInput.setAttribute("value", this.model.currentList.getItemAt(i-1));

                    item.appendChild(textInput);

                    textInput.ondblclick = (event) => {
                        this.ignoreParentClick(event);
                    }

                    //After opening and editing text box of an item, hitting 'enter' finishes the edit
                    textInput.onkeydown = (event) => {
                        if (event.key === 'Enter') {
                            this.model.addChangeItemTransaction(i-1, event.target.value);
                        }
                    }

                    //After opening and editing text box of an item, clicking away finishes the edit
                    textInput.onblur = (event) => {
                        this.model.addChangeItemTransaction(i-1, event.target.value);
                        //this.model.restoreList();
                    }
                }
            }
        }
    }

    registerListSelectHandlers(id) {
        // FOR SELECTING THE LIST
        document.getElementById("top5-list-" + id).onmousedown = (event) => {
            this.model.unselectAll();
            // GET THE SELECTED LIST
            this.model.loadList(id);
        }
        // FOR DELETING THE LIST
        document.getElementById("delete-list-" + id).onmousedown = (event) => {
            this.ignoreParentClick(event);
            // VERIFY THAT THE USER REALLY WANTS TO DELETE THE LIST
            let modal = document.getElementById("delete-modal");
            this.listToDeleteIndex = id;
            console.log(this.listToDeleteIndex);
            let listName = this.model.getList(id).getName();
            let deleteSpan = document.getElementById("delete-list-span");
            deleteSpan.innerHTML = "";
            deleteSpan.appendChild(document.createTextNode(listName));
            modal.classList.add("is-visible");

            // confirming or cancelling/losing focus delete
            document.getElementById("dialog-confirm-button").onmousedown = (event) => {
                this.model.deleteList(this.listToDeleteIndex);
                modal.classList.remove("is-visible");
            }
            document.getElementById("dialog-cancel-button").onmousedown = (event) => {
                modal.classList.remove("is-visible");
            }
        }

        document.getElementById("top5-list-" + id).ondblclick = (event) => {

            let textInput = document.createElement("input");
            textInput.setAttribute("type", "text");
            textInput.setAttribute("id", "item-text-input-" + id);
            textInput.setAttribute("value", this.model.currentList.getName());

            let item  = document.getElementById("top5-list-"+id);
            item.innerHTML="";
            item.appendChild(textInput);

            textInput.ondblclick = (event) => {
                this.ignoreParentClick(event);
            }
            //After opening and editing text box of an item, hitting 'enter' finishes the edit
            textInput.onkeydown = (event) => {
                if (event.key === 'Enter') {
                    this.model.addChangeListNameTransaction(id, event.target.value);
                }
            }
            //After opening and editing text box of an item, clicking away finishes the edit
            textInput.onblur = (event) => {
                this.model.addChangeListNameTransaction(id, event.target.value);
                //this.model.restoreList();
            }
        }

        document.getElementById("top5-list-" + id).onmouseover = (event) => {
            this.model.HoverHighlight("top5-list-" + id);
        }
        document.getElementById("top5-list-" + id).onmouseout = (event) => {
            this.model.offHoverHighlight("top5-list-" + id);
        }

    }
    ignoreParentClick(event) {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
    }

}