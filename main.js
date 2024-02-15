// 유저가 값을 입력
// + 버튼을 클릭하면 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다

// 체크 버튼을 누르면 할 일이 끝나면서 밑줄이 생김
// 1. check 버튼을 클릭하는 순간 true > false 변경
// 2. true면 끝난 걸로 간주하고 밑줄 보여주기
// 3. false면 안 끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면 언더라인이 이동
// 끝남 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만.
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴.


let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let tabs = document.querySelectorAll(".taskTabs p")
let taskList = [];
let mode = 'all';
let filterList = [];

addBtn.addEventListener("click", addTask);

for(let i=0; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)});
}

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }

    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    // 1. 내가 선택한 탭에 따라서
    // 2. 리스트를 달리 보여준다
    // all taskList 
    // going, done flterList

    let list = [];
    if(mode === "all"){
        list = taskList;
    }else{
        list = filterList;
    }

    let resultHTML = '';
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`
        }else{
            resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`;
        }

        
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    
    for(let i=0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }

    render();
    console.log(taskList);
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    console.log(taskList);
    render();
}

function filter(event){
    mode = event.target.id;
    filterList = [];

    if(mode === "all"){
        // 전체리스트를 보여준다
        render();
    }else if(mode === "going"){
        // 진행중인 리스트를 보여준다 (task.isComplete: false >> 진행중)
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중", filterList)
    }else if(mode === "done"){
        // 끝나는 케이스를 보여준다 (task.isComplete: true)
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}