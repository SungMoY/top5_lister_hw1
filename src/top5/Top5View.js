/**
 * Top5ListView.js
 * 
 * This class deals with the view of our Web application providing services
 * for loading data into our controls and building other UI controls.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class Top5View {
    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("sidebar-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendListToView(list);
        }
    }

    setController(initController) {
        this.controller = initController;
    }

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendListToView(newList) {
        // MAKE AND ADD THE NODE
        let listId = "top5-list-" + newList.id;

        // MAKE THE CARD DIV
        let card = document.createElement("div");
        card.setAttribute("id", listId);
        card.setAttribute("class", "list-card");
        card.setAttribute("class", "unselected-list-card");

        // MAKE THE TEXT SPAN
        let textSpan = document.createElement("span");
        textSpan.setAttribute("id", "list-card-text-" + newList.id);
        textSpan.setAttribute("class", "list-card-text");
        textSpan.appendChild(document.createTextNode(newList.name));

        // MAKE THE DELETE LIST BUTTON
        let deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("id", "delete-list-" + newList.id);
        deleteButton.setAttribute("class", "list-card-button");
        deleteButton.setAttribute("value", "\u2715");

        // PUT EVERYTHING IN THE MOST OUTER DIV
        card.appendChild(textSpan);
        card.appendChild(deleteButton);

        // AND PUT THE NEW CARD INTO THE LISTS DIV
        let listsElement = document.getElementById("sidebar-list");
        listsElement.appendChild(card);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        this.controller.registerListSelectHandlers(newList.id);
    }

    update(list) {
        for (let i = 0; i < 5; i++) {
            let item = document.getElementById("item-" + (i+1));
            item.innerHTML = "";
            item.appendChild(document.createTextNode(list.getItemAt(i)));
        }
    }

    updateListName(top5list, id) {
        let item = document.getElementById("top5-list-"+id);
        item.innerHTML = "";
        let newListName = top5list[id].getName();
        item.appendChild(document.createTextNode(newListName));
    }

    clearWorkspace() {
        // REMOVE THE ITEMS
        for (let i = 0; i < 5; i++) {
            let item = document.getElementById("item-" + (i+1));
            item.innerHTML = "";
        }
    }

    updateStatusBar(list) {
        let item = document.getElementById("top5-statusbar");
        item.innerHTML = list.getName();
    }

    removeStatusBar() {
        let item = document.getElementById("top5-statusbar");
        item.innerHTML = "";
    }

    disableButton(id) {
        let button = document.getElementById(id);
        button.classList.add("disabled");
    }

    enableButton(id) {
        let button = document.getElementById(id);
        button.classList.remove("disabled");
    }

    highlightList(listId) {
        // HIGHLIGHT THE LIST
        let listCard = document.getElementById("top5-list-" + listId);
        listCard.classList.remove("unselected-list-card");
        listCard.classList.add("selected-list-card");
        listCard.style.backgroundColor = "rgb(102, 153, 102)";
    }

    unhighlightList(listId) {
        // HIGHLIGHT THE LIST
        let listCard = document.getElementById("top5-list-" + listId);
        listCard.classList.add("unselected-list-card");
        listCard.classList.remove("selected-list-card");
        listCard.style.backgroundColor = "rgb(225, 228, 203)";
        listCard.style.color = "black";
    }

    HighlightBlackWhite(listId) {
        let listCard = document.getElementById(listId);
        if (!(listCard.style.backgroundColor == "rgb(102, 153, 102)")) {
            listCard.style.backgroundColor = "black";
            listCard.style.color = "white";
        }
    }

    offHighlightBlackWhite(listId) {
        let listCard = document.getElementById(listId);
        if (!(listCard.style.backgroundColor == "rgb(102, 153, 102)")) {
            listCard.style.backgroundColor = "rgb(225, 228, 203)";
            listCard.style.color = "black";
        }
    }

    updateToolbarButtons(model) {
        let tps = model.tps;
        if (tps.hasTransactionToUndo()) {
            this.enableButton("undo-button");
        }
        else {
            this.disableButton("undo-button");
        }
        if (tps.hasTransactionToRedo()) {
            this.enableButton("redo-button");
        } else {
            this.disableButton("redo-button");
        }
        if (model.hasCurrentList()) {
            this.enableButton("close-button");
        } else {
            this.disableButton("close-button");
        }
    }
    viewDisableAddList(model) {
        this.disableButton("add-list-button")
    }
    viewEnableAddList(model) {
        this.enableButton("add-list-button")
    }
}