// Funções de criação
function createPharagraphOperation() {
    let parent = document.getElementById("funcionamento");
    let child = document.createElement("p");
    child.innerHTML = "<br>Clique duas vezes em um item para marcá-lo como completo";
    child.style.textAlign = "center";
    parent.appendChild(child);
}
createPharagraphOperation();
function createInputTask() {
    let parent = document.getElementById("insertTask");
    let child = document.createElement("input");
    child.id = "texto-tarefa";
    child.placeholder = "Item à adicionar";
    child.style.width = "350px";
    child.style.marginLeft = "30px"
    child.style.float = "left";
    child.style.display = "inline";
    parent.appendChild(child);
}
createInputTask();
function createList() {
    let parent = document.getElementById("taskList");
    let child = document.createElement("ol");
    child.id = "lista-tarefas";
    parent.appendChild(child);
}
createList();
function createBtnTask() {
    let parent = document.getElementById("insertTask");
    let child = document.createElement("button");
    child.id = "criar-tarefa";
    child.innerText = "Adicionar tarefa";
    child.style.width = "350px";
    child.style.marginRight = "30px"
    child.style.float = "right";
    child.style.display = "inline-block";
    parent.appendChild(child);
}
createBtnTask();
function createBtnEraseAll() {
    let parent = document.getElementById("btns");
    let child = document.createElement("button");
    child.id = "apaga-tudo";
    child.innerText = "Apagar lista";
    child.style.display = "inline"
    child.style.marginLeft = "30px";
    parent.appendChild(child);
}
createBtnEraseAll();
function createBtnEraseCompletedItems() {
    let parent = document.getElementById("btns");
    let child = document.createElement("button");
    child.id = "remover-finalizados";
    child.style.display = "inline"
    child.innerText = "Apagar finalizados";
    child.style.marginLeft = "30px";
    parent.appendChild(child);
}
createBtnEraseCompletedItems();
function createBtnSaveItems() {
    let parent = document.getElementById("btns");
    let child = document.createElement("button");
    child.id = "salvar-tarefas";
    child.style.display = "inline";
    child.innerText = "Salvar lista";
    child.style.marginLeft = "30px";
    parent.appendChild(child);
}
createBtnSaveItems();
function createBtnMoveUp() {
    let parent = document.getElementById("btns");
    let child = document.createElement("button");
    child.id = "mover-cima";
    child.style.display = "inline";
    child.innerText = "Mover para cima";
    child.style.marginLeft = "30px";
    parent.appendChild(child);
}
createBtnMoveUp();
function createBtnMoveDown() {
    let parent = document.getElementById("btns");
    let child = document.createElement("button");
    child.id = "mover-baixo";
    child.style.display = "inline";
    child.innerText = "Mover para baixo";
    child.style.marginLeft = "30px";
    parent.appendChild(child)
}
createBtnMoveDown();
function createBtnRemoveSelectedItem() {
    let parent = document.getElementById("btns");
    let child = document.createElement("button");
    child.id = "remover-selecionado";
    child.style.display = "inline";
    child.innerText = "Remover item selecionado";
    child.style.marginLeft = "30px";
    parent.appendChild(child)
}
createBtnRemoveSelectedItem();
// Variáveis
let btnAddTask = document.getElementById("criar-tarefa");
let inputTask = document.getElementById("texto-tarefa");
let btnEraseAll = document.getElementById("apaga-tudo");
let btnEraseCompletedItems = document.getElementById("remover-finalizados");
let btnSaveList = document.getElementById("salvar-tarefas");
let btnChildUp = document.getElementById("mover-cima");
let btnChildDown = document.getElementById("mover-baixo");
let btnRmvSelectedItem = document.getElementById("remover-selecionado");
// Funções de evento
btnAddTask.addEventListener("click", addTask);
btnEraseAll.addEventListener("click", eraseAllItems);
btnEraseCompletedItems.addEventListener("click", eraseCompletedItems);
btnSaveList.addEventListener("click", saveListInLocalStorage);
btnChildUp.addEventListener("click", moveUp);
btnChildDown.addEventListener("click", moveDown);
btnRmvSelectedItem.addEventListener("click", removeSelectedItem)
function addTask() {
    let parent = document.getElementById("lista-tarefas");
    let newItem = document.createElement("li");
    newItem.innerText = inputTask.value;
    parent.appendChild(newItem);
    inputTask.value = "";
    newItem.addEventListener("click", alterBackgroundColorListItem);
    newItem.addEventListener("dblclick", riskListItem);
}
function alterBackgroundColorListItem(event) {
    let listItems = document.getElementsByTagName("li");
    if (event.target.style.backgroundColor === "gray") {
        event.target.style.backgroundColor = "transparent";
    }
    else {
        event.target.style.backgroundColor = "gray";
        for (let i = 0; i < listItems.length; i += 1) {
            if (listItems[i] === event.target) {
            }
            else {
                // Referência da próxima linha: https://stackoverflow.com/questions/8739665/is-background-colornone-valid-css
                listItems[i].style.backgroundColor = "transparent";
            }
        }
    }
}
function riskListItem(event) {
    let evento = event.target;
    if (evento.className === "completed") {
        evento.classList.remove("completed");
    }
    else {
        evento.className = "completed";
    }
}
function eraseAllItems() {
    let items = document.querySelectorAll("ol li");
    for (let i = 0; i < items.length; i += 1) {
        items[i].parentNode.removeChild(items[i]);
    }
}
function eraseCompletedItems() {
    let completedItems = document.querySelectorAll(".completed");
    for (let i = 0; i < completedItems.length; i += 1) {
        completedItems[i].parentNode.removeChild(completedItems[i]);
    }
}
function saveListInLocalStorage() {
    let items = document.querySelectorAll("li");
    localStorage.clear();
    for (let i = 0; i < items.length; i += 1) {
        let value = items[i].innerText;
        localStorage.setItem(`${i + 1}ºItem`, value);
    }
    for (let i = 0; i < items.length; i += 1) {
        let value = items[i].className;
        localStorage.setItem(`${i + 1}ºItemClass`, value);
    }
    for (let i = 0; i < items.length; i += 1) {
        let value = items[i].style.backgroundColor;
        localStorage.setItem(`${i + 1}ºItemBackgroundColor`, value);
    }
}
function moveUp() {
    let childs = document.querySelectorAll("li");
    for (let i = 0; i < childs.length; i += 1) {
        if (childs[i].style.backgroundColor === "gray") {
            if (childs[i].previousElementSibling === null) {
            }
            else {
                // Referência da próxima linha: https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
                childs[i].parentNode.insertBefore(childs[i].previousElementSibling, childs[i].nextElementSibling);
            }
        }
    }
}
function moveDown() {
    let childs = document.querySelectorAll("li");
    for (let i = 0; i < childs.length; i += 1) {
        if (childs[i].style.backgroundColor === "gray") {
            if (childs[i].nextElementSibling === null) {
            }
            else {
                // Referência da próxima linha: https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
                childs[i].parentNode.insertBefore(childs[i].nextElementSibling, childs[i]);
            }
        }
    }
}
function removeSelectedItem() {
    let items = document.querySelectorAll("li");
    for(let i = 0; i < items.length; i += 1){
        if(items[i].style.backgroundColor === "gray"){
            items[i].parentNode.removeChild(items[i]);
        }
    }
}
// Onload
window.onload = function () {
    let classeItem = [];
    let bgColor = [];
    let name = [];
    if (localStorage.length > 1) {
        for (let i = 0; i < localStorage.length; i += 1) {
            let itemName = localStorage.getItem(`${i + 1}ºItem`);
            name.push(itemName);
            if (localStorage.getItem(`${i + 2}ºItem`) === null) {
                i = localStorage.length + 1;
            }
        }
        for (let i = 0; i < localStorage.length; i += 1) {
            let itemClass = localStorage.getItem(`${i + 1}ºItemClass`);
            classeItem.push(itemClass);
            if (localStorage.getItem(`${i + 2}ºItemClass`) === null) {
                i = localStorage.length + 1;
            }
        }
        for (let i = 0; i < localStorage.length; i += 1) {
            let itemBgColor = localStorage.getItem(`${i + 1}ºItemBackgroundColor`);
            bgColor.push(itemBgColor);
            if (localStorage.getItem(`${i + 2}ºItemBackgroundColor`) === null) {
                i = localStorage.length + 1;
            }
        }
        for (let i = 0; i < name.length; i += 1) {
            let parent = document.getElementById("lista-tarefas");
            let child = document.createElement("li");
            child.innerText = name[i];
            child.className = classeItem[i];
            child.style.backgroundColor = bgColor[i];
            parent.appendChild(child);
            child.addEventListener("click", alterBackgroundColorListItem);
            child.addEventListener("dblclick", riskListItem);
        }
    }
}