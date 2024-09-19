const createBtn = document.querySelector('#createBtn');
const secondContainer = document.querySelector('.second-container');

const createButton = (id, value) => {
    let text = document.createElement("p");
    let imge = document.createElement("img");

    imge.src = "./img/delete.png";
    text.className = "text";
    text.setAttribute("contenteditable", "true");

    if (id && value) {
        text.id = id;
        text.innerHTML = value;
    } else {
        let uniqueId = Math.floor(Math.random() * 10000000);
        text.id = uniqueId;
    }

    text.addEventListener("input", () => updateContent(text));
    imge.addEventListener("click", deleteNote);
    secondContainer.appendChild(text).appendChild(imge);

    if (!id && !value) {
        updateContent(text);
    }
};

const updateContent = (text) => {
    let saveInputField = updateLocalStore();
    const index = saveInputField.findIndex(item => item.uniqueId === parseInt(text.id));
    if (index !== -1) {
        saveInputField[index].content = text.innerHTML;
    } else {
        saveInputField.push({ uniqueId: parseInt(text.id), content: text.innerHTML });
    }
    localStorage.setItem("keys", JSON.stringify(saveInputField));
};

const deleteNote = (e) => {
    let parent = e.target.parentNode;
    secondContainer.removeChild(parent);

    let saveInputField = updateLocalStore();
    saveInputField = saveInputField.filter((item) => item.uniqueId !== parseInt(parent.id));

    localStorage.setItem("keys", JSON.stringify(saveInputField));
};

const loadData = () => {
    let saveInputField = updateLocalStore();
    saveInputField.forEach(item => {
        createButton(item.uniqueId, item.content);
    });
};

const updateLocalStore = () => {
    return JSON.parse(localStorage.getItem("keys")) || [];
};

createBtn.addEventListener("click", () => createButton());
window.addEventListener("DOMContentLoaded", loadData);
