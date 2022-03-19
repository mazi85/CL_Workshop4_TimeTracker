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

function renderTask(taskId, title, description, status) {
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
            divButtons.appendChild(buttonDelete);


    const unsortedList = document.createElement("ul");
    unsortedList.className = "list-group list-group-flush";
    section.appendChild(unsortedList);

    const divForm = document.createElement("div");
    divForm.classList.add("card-body");
    section.appendChild(divForm);

        const addOperationForm = document.createElement("form");
        divForm.appendChild(addOperationForm);

            const divInputs = document.createElement("div");
            divInputs.className = "input-group";
            divForm.appendChild(divInputs);

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


console.log(apiListTasks());




document.addEventListener('DOMContentLoaded', function () {
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

        }
    );
});


