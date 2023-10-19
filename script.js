
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        li.appendChild(checkbox);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        li.appendChild(document.createTextNode(inputBox.value));
        listContainer.appendChild(li);
        
    }
    inputBox.value = ""; // Set the input value to an empty string
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI" || e.target.tagName === "INPUT") {
        const li = e.target.tagName === "INPUT" ? e.target.parentElement : e.target;
        li.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);


function saveData() {
    const tasks = Array.from(listContainer.children).map(li => ({
        task: li.innerText,
        checked: li.classList.contains("checked")
    }));
    localStorage.clear(); // Clear local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showList() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);

        // Create a new ul element
        const newUl = document.createElement("ul");

        tasks.forEach(task => {
            let li = document.createElement("li");
            li.innerText = task.task;
            if (task.checked) {
                li.classList.add("checked");
            }
            newUl.appendChild(li);
        });

        // Replace the existing ul with the new one
        listContainer.innerHTML = newUl.innerHTML;
    }
}





