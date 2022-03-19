const apikey = '97c2a0a2-a3ee-4f4f-87d6-ee0a5edc0a3b';
const apihost = 'https://todo-api.coderslab.pl';


function apiListTasks() {
    return fetch(
        apihost + '/api/tasks',
        {
            headers: {Authorization: apikey}
        }
    ).then(
        function (resp) {
            if (!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return resp.json();
        }
    )
}

function apiListOperationsForTask(id) {
    return fetch(
        apihost + `/api/tasks/${id}/operations`,
        {
            headers: {Authorization: apikey}
        }
    ).then(
        function (resp) {
            if (!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return resp.json();
        }
    )
}

function apiCreateTask(title, description) {
    return fetch(
        apihost + '/api/tasks',
        {
            headers: { Authorization: apikey, 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, description: description, status: 'open' }),
            method: 'POST'
        }
    ).then(
        function(resp) {
            if(!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return resp.json();
        }
    )
}

function apiDeleteTask(id) {
    return fetch(
        apihost + `/api/tasks/${id}`,
        {
            headers: {Authorization: apikey},
            method: 'DELETE'
        }
    ).then(
        function (resp) {
            if (!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return resp.json();
        }
    )
}

function apiAddOperationForTask(id,description) {
    return fetch(
        apihost + `/api/tasks/${id}/operations`,
        {
            headers: {Authorization: apikey,'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({ description: description, timeSpent: '0' })
        }
    ).then(
        function (resp) {
            if (!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return resp.json();
        }
    )
}




function renderOpertationsForTask(ul, status, operationId, operationDescription, timeSpent){

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    ul.appendChild(li);

        const divOperationDesc = document.createElement("div");
        divOperationDesc.innerText = operationDescription;
        li.appendChild(divOperationDesc);
            const operationTime = document.createElement("span");
            operationTime.className = "badge badge-success badge-pill ml-2"
            operationTime.innerText = calculateTime(Number(timeSpent));
            divOperationDesc.appendChild(operationTime);
    if(status === 'open') {
        const divOperationButtons = document.createElement("div");
        li.appendChild(divOperationButtons);
            const button15min = document.createElement("button");
            button15min.className = "btn btn-outline-success btn-sm mr-2";
            button15min.innerText = "+15m";
            divOperationButtons.appendChild(button15min);

            const button1h = document.createElement("button");
            button1h.className = "btn btn-outline-success btn-sm mr-2";
            button1h.innerText = "+1h";
            divOperationButtons.appendChild(button1h);

            const buttonDel = document.createElement("button");
            buttonDel.className = "btn btn-outline-danger btn-sm";
            buttonDel.innerText = "delete";
            divOperationButtons.appendChild(buttonDel);
    }
}

function calculateTime (minTime){
   let hours = Math.floor(minTime/60);
   let minutes = minTime%60;

   return `${hours}h ${minutes}m `
}


function renderTask(taskId, title, description, status) {

    console.log(apiListOperationsForTask(taskId));

    const section = document.createElement("section");
    section.className = 'card mt-5 shadow-sm';

    const divHeader = document.createElement("dev");
    divHeader.classList.add("card-header", "d-flex", "justify-content-between", "align-items-center");
    section.appendChild(divHeader);

        const divTask = document.createElement("dev");
        divHeader.appendChild(divTask);

            const taskHeaderTitle = document.createElement("h5");
            taskHeaderTitle.innerText = title;
            divTask.appendChild(taskHeaderTitle);

            const taskHeaderDesc = document.createElement("h6");
            taskHeaderDesc.classList.add("card-subtitle","text-muted");
            taskHeaderDesc.innerText = description;
            divTask.appendChild(taskHeaderDesc);

        const divButtons = document.createElement("dev");
        divHeader.appendChild(divButtons);

            if(status === 'open') {
            const buttonFinish = document.createElement("button");
            buttonFinish.className = "btn btn-dark btn-sm";
            buttonFinish.innerText = "Finish";
            divButtons.appendChild(buttonFinish);
            }
            const buttonDelete = document.createElement("button");
            buttonDelete.className = "btn btn-outline-danger btn-sm ml-2";
            buttonDelete.innerText = "Delete";
            buttonDelete.addEventListener("click", (e)=>{
                apiDeleteTask(taskId);
                section.remove();
            })
            divButtons.appendChild(buttonDelete);


    const unsortedList = document.createElement("ul");
    unsortedList.className = "list-group list-group-flush";
    section.appendChild(unsortedList);

    apiListOperationsForTask(taskId).then(response => {
        response.data.forEach(op => {
            renderOpertationsForTask(unsortedList,status,op.id,op.description,op.timeSpent);
        })
    })

    const divForm = document.createElement("div");
    divForm.classList.add("card-body");
    section.appendChild(divForm);

        const addOperationForm = document.createElement("form");
        addOperationForm.addEventListener("submit", (e)=>{
            e.preventDefault();
            let desc = inputOperation.value;
            console.log(desc);
            apiAddOperationForTask(taskId,desc)
                .then(response => {
                    renderOpertationsForTask(unsortedList,status,response.data.id,response.data.description,response.data.timeSpent);
            });
        });
        divForm.appendChild(addOperationForm);

            const divInputs = document.createElement("div");
            divInputs.className = "input-group";
            addOperationForm.appendChild(divInputs);

                const inputOperation = document.createElement("input");
                inputOperation.className = "form-control";
                inputOperation.setAttribute("type", "text");
                inputOperation.setAttribute("placeholder", "Operation description");
                inputOperation.setAttribute("minlength", "5");
                divInputs.appendChild(inputOperation);

                const divInputAppend = document.createElement("div");
                divInputAppend.className = "input-group-append";
                divInputs.appendChild(divInputAppend);

                    const buttonAdd = document.createElement("button");
                    buttonAdd.className = "btn btn-info";
                    buttonAdd.innerText = "Add";

                    divInputAppend.appendChild(buttonAdd);



    const mainElement = document.querySelector('#app');
    mainElement.appendChild(section);

}

document.addEventListener('DOMContentLoaded', function () {

    printFullTasks();

    //add Task Lisener
    const addTaskForm = document.querySelector("form.js-task-adding-form");
    addTaskForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        let title = e.currentTarget.title.value;
        console.log(e.currentTarget);
        let description = e.currentTarget.description.value;
        apiCreateTask(title, description)
        .then(response => {
            renderTask(response.data.id, response.data.title, response.data.description, response.data.status);
        });
    });






});

function printFullTasks(){
    apiListTasks().then(
        function (response) {
            // "response" zawiera obiekt z kluczami "error" i "data" (zob. wyżej)
            // "data" to tablica obiektów-zadań
            // uruchamiamy funkcję renderTask dla każdego zadania jakie dał nam backend
            response.data.forEach(
                function (task) {
                    renderTask(task.id, task.title, task.description, task.status);
                }
            );
        });
}


