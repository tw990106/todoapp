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
let taskList = [];

addBtn.addEventListener("click", addTask);

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
    let resultHTML = '';
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
            </div>
        </div>`
        }else{
            resultHTML += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
            <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
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

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}