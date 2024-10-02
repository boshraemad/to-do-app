// setting varibles
let input=document.querySelector(".input");
let submit=document.querySelector(".add");
let tasksdiv=document.querySelector(".tasks");
let del=document.querySelector(".delete-all");
// create empty array to push tasks into it
let tasksarray=[];
// check if there is tasks in the local storage
if(window.localStorage.getItem("tasks")){
    tasksarray=JSON.parse(window.localStorage.getItem("tasks"));
}
//trigger the get tasks from local storage function
getdatafromlocalstorage();
// the onclick action
submit.onclick=function(){
    if (input.value!=="") {
        addtasktoarray(input.value);
        input.value="";
    }
}
//click on task element
tasksdiv.addEventListener("click",(e)=>{
    if(e.target.classList.contains("del")){
        //remove element from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //remove element from the page
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // toggle done
        e.target.classList.toggle("done");

    }
});
//add task to array function
function addtasktoarray(tasktext){
    let task={
        id:Date.now(),
        title:tasktext,
        completed:false,//default
    };
    tasksarray.push(task);//add task to the empty array
    //add task to the page
    addelementtopagefromarray(tasksarray);
    //add task to local storage
    addelementtolocalstorage(tasksarray);
}
//add task to page
function addelementtopagefromarray(tasksarray){
    //empty tasks div
    tasksdiv.innerHTML="";
    //looping on the tasks of the array
    tasksarray.forEach((task)=>{
        let taskdiv=document.createElement("div");
        taskdiv.className="task";
        //check if task is done
        if(task.completed){
            taskdiv.className="task done";
        }
        taskdiv.setAttribute("data-id",task.id);
        taskdiv.appendChild(document.createTextNode(task.title));
        //create delete button
        let span=document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("delete"));
        taskdiv.appendChild(span);
        //add task to the main tasks div
        tasksdiv.appendChild(taskdiv);
    });
}
// add task to local storage function
function addelementtolocalstorage(tasksarray){
    window.localStorage.setItem("tasks",JSON.stringify(tasksarray));
}
//get data from local storage
function getdatafromlocalstorage(){
    let data=window.localStorage.getItem("tasks");
    if(data){
        let tasks=JSON.parse(data);
        addelementtopagefromarray(tasks);
    }
}
//delete element from local storage using higher order function(filter)
function deleteTaskWith(taskId) {
    tasksarray = tasksarray.filter((task) => task.id != taskId);
    addelementtolocalstorage(tasksarray);
}
//toggle function and update the local storage
function toggleStatusTaskWith(taskId) {
for (let i = 0; i < tasksarray.length; i++) {
    if (tasksarray[i].id == taskId) {
        tasksarray[i].completed == false ? (tasksarray[i].completed = true) : (tasksarray[i].completed = false);
    }
}
addelementtolocalstorage(tasksarray);
}
//delete all onclick action
del.onclick=deleteAll;
function deleteAll(){
    window.localStorage.removeItem("tasks");
    tasksdiv.innerHTML="";
    tasksarray.length=0;
    addelementtolocalstorage(tasksarray);
}