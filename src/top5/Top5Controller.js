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
        this.dragItem;
        this.dragDestination;
    }

    setModel(initModel) {
        this.model = initModel;
        this.initHandlers();
    }

    initHandlers() {

        // SETUP THE TOOLBAR BUTTON HANDLERS
        document.getElementById("add-list-button").onmousedown = (event) => {
            let newList = this.model.addNewList("Untitled", ["?","?","?","?","?"]);
            if (newList != undefined) {
                this.model.loadList(newList.id);
                this.model.saveLists();
            }
        }
        document.getElementById("undo-button").onmousedown = (event) => {
            this.model.undo();
        }
        document.getElementById("redo-button").onmousedown = (event) => {
            this.model.redo();
        }
        this.model.buttonControl(this.model);

        // SETUP THE ITEM HANDLERS
        for (let i = 1; i <= 5; i++) {
            let item = document.getElementById("item-" + i);

            {
            item.addEventListener("dragstart", dragStart);
            item.addEventListener("dragover", dragOver);
            item.addEventListener("drop", drop);
            let _this = this;
            function dragStart(e) {
                _this.dragItem = i;
            }
            function dragOver(e) {
                e.preventDefault();
            }
            function drop(e) {
                e.preventDefault();
                _this.dragDestination = i;
                _this.model.addMoveItemTransaction(_this.dragItem, _this.dragDestination);
                _this.model.buttonControl(_this.model);
            }
            }
            

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
                            this.model.buttonControl(this.model);
                        }
                    }

                    //After opening and editing text box of an item, clicking away finishes the edit
                    textInput.onblur = (event) => {
                        this.model.addChangeItemTransaction(i-1, event.target.value);
                        this.model.buttonControl(this.model);
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

            document.getElementById("close-button").onmousedown = (event) => {
                this.model.closeList();
                this.model.buttonControl(this.model);
            }
        }
        // FOR DELETING THE LIST
        document.getElementById("delete-list-" + id).onmousedown = (event) => {
            this.ignoreParentClick(event);
            // VERIFY THAT THE USER REALLY WANTS TO DELETE THE LIST
            let modal = document.getElementById("delete-modal");
            this.listToDeleteIndex = id;
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
            this.model.disableAddList();
            let textInput = document.createElement("input");
            textInput.setAttribute("type", "text");
            textInput.setAttribute("id", "item-text-input-" + id);
            textInput.setAttribute("value", this.model.currentList.getName());

            let item = document.getElementById("top5-list-"+id);
            item.innerHTML="";
            item.appendChild(textInput);

            textInput.ondblclick = (event) => {
                this.ignoreParentClick(event);
            }
            //After opening and editing text box of an item, hitting 'enter' finishes the edit
            textInput.onkeydown = (event) => {
                if (event.key === 'Enter') {
                    this.model.changeListName(id, event.target.value);
                    this.model.enableAddList();
                }
            }
            //After opening and editing text box of an item, clicking away finishes the edit
            textInput.onblur = (event) => {
                this.model.changeListName(id, event.target.value);
                this.model.enableAddList();
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