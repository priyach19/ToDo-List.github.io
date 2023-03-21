let tasks=[];
const tasksList=document.getElementById('list');
const addTask=document.getElementById('input');
const taskCounter=document.getElementById('task-counter');
const addButton=document.getElementById('add-button');



//adding list item li to the ul list
function addTaskToDom(task){
    const li=document.createElement('li');
  li.innerHTML=`<input type="checkbox" id="${task.id}" ${task.done ? checked:" "} class="custom-checkbox" data='hello'></input>  
    <label for="${task.id}" class='label'> ${task.text} </label>
    <i class="fa-solid fa-circle-xmark" id=${task.id} class="delete" onmouseover='appearIcon(this)'></i>`;

// li.addEventListener("mouseover", ()=>{
//     // alert("mouse over")
//       li.style.backgroundColor='green'
//      li.lastElementChild.style.display="block";
//     // console.log("li.lastchild", li.lastElementChild)
    
//  })

//  li.addEventListener("mouseout", ()=>{
//      // alert("mouse over")
//     // li.style.backgroundColor=''
    

//  })
tasksList.append(li);
}

function appearIcon(obj){
    //const icon=document.querySelector(".delete");
    obj.style.display='block';
}
//render list after manipulation
function renderList(){
    tasksList.innerHTML="";
    for(let i=0;i<tasks.length;i++){
        addTaskToDom(tasks[i]);
    }
    taskCounter.innerHTML=tasks.length; 


}
//change the status of task 
function markTaskAsComplete(taskId){
    const task=tasks.filter(function(task){
        return task.id===taskId
    })
    if(task.length>0){
        const currentTask=tasks[0];
        currentTask.done=!currentTask;
        renderList();
        return;
    }

}

//notify that something is happened
function showNotification(text){
    alert(text);
  }

//To delete the task
function deleteTask(taskId){
    //console.log("taski id",taskId);
    const newTasks=tasks.filter(function(task){
    return task.id!==taskId;
 })
 
 // new array after filtering
    tasks=newTasks;
    renderList();
    showNotification("task deleted succeessfully");
    return;
}

//adding task to the array
function addTasks(task){
  if(task){
    tasks.push(task);
    renderList();
    //showNotification("Task added successfully");
    return;
  }
  
  showNotification(" Your empty task cannot be added");
}

//handle input through key press 'Enter' 
function handleInputByEnter(e){

    if(e.key=='Enter'){
    const text=e.target.value;
    if(!text){
            alert("Please enter something!!!");
            return;
        }
    const task= {
            text:text,
            id:Date.now().toString(),
            done:false
         }
    e.target.value="";
    addTasks(task);
        
    }
}


//handle all click events: delete , add, check the item  using document object
function handleClickEvent(e){
 const target=e.target;
// console.log(target);
 if(target.className==='fa-solid fa-circle-xmark'){
    const taskId=target.id;
    console.log(taskId);
    deleteTask(taskId);
    return;

 }
 if(target.className==='addButton'){
    const target=document.getElementById('input');
    const text=target.value;
    //console.log(text);
    if(!text){
        showNotification(" Empty task cannot be added");
        return;
    }
    const task= {
        text:text,
        id:Date.now().toString(),
        done:false
     }
    target.value="";
    addTasks(task);
    renderList(task);
    return;
    
 }
 else 
 if(target.className==='custom-checkbox'){
    const taskId=target.dataset.id;
    //console.log(taskId);
    markTaskAsComplete(taskId);
    return;

 }
}

addTask.addEventListener('keyup',handleInputByEnter);
document.addEventListener('click',handleClickEvent);
