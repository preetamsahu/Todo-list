var add = document.getElementById("add-button");
var added_task = document.getElementsByClassName("added-tasks")[0];
var newtask = document.getElementById("task-name");
var taskcontainer = document.getElementById("task-container");
var taskstorage=JSON.parse(localStorage.getItem("task"))
const allTask = document.querySelector("added-task");
// localStorage.removeItem("task")
//adding task that are stored in localstorage
if(localStorage.getItem("task")!==null){
    let pending_task=JSON.parse(localStorage.getItem("task"))
    for(t in pending_task){
        const taskHTML = `<div class="added-task">
              <div class="your-task ">
                  <output>${pending_task[t]}</output>
              </div>
              <div class="remove-button">
                  <button class="remove-btn">Remove</button>
              </div>
          </div>`;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = taskHTML;
        taskcontainer.appendChild(tempDiv.firstChild);

    }
}


// adding task
add.addEventListener("click", addTask)
function addTask() {
    console.log(newtask.value, newtask.value.length);
    if (newtask.value.length == 0) {
        return;
    }
    const taskHTML = `<div class="added-task">
          <div class="your-task ">
              <output>${newtask.value}</output>
          </div>
          <div class="remove-button">
              <button class="remove-btn">Remove</button>
          </div>
      </div>`;

    // Create a temporary div element to hold the task HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = taskHTML;

    // Append the first child of the temporary div to the task container
    taskcontainer.appendChild(tempDiv.firstChild);
    //Storing the value in local storage
    taskstorage.push(newtask.value);
    // localStorage.setItem("task",taskstorage)
    localStorage.setItem("task", JSON.stringify(taskstorage));
    newtask.value = ""
}


//removing task
const container = document.querySelector(".container");
container.addEventListener("click", function (event) {
    // Check if the clicked element is a "Remove" button
    if (event.target.classList.contains("remove-btn")) {
        // Find the parent element of the clicked "Remove" button with the class "added-task"
        const taskToRemove = event.target.closest(".added-task");

        // Remove the parent element from the DOM
        const outputValue = taskToRemove.querySelector('.your-task output').textContent;
        removeElementfromLocalStorage(taskstorage ,outputValue)
        if (taskToRemove) {
            taskToRemove.remove();
        }
    }
});

//Remove function 
function removeElementfromLocalStorage(arr, value) {
    const index = arr.indexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
    }
    localStorage.setItem("task",JSON.stringify(arr))
}

document.addEventListener("keydown",function(event){
    if(event.key=="Enter"){
        addTask()
    }
})
