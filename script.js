// Função de arrastar e soltar (Drag and Drop)
const tasks = document.querySelectorAll('.task');
tasks.forEach(task => {
    task.setAttribute('draggable', 'true');
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);
});

const columns = document.querySelectorAll('.column');
columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.innerHTML);
    e.target.classList.add('dragging');
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault(); // Permite o elemento ser solto
}

function drop(e) {
    e.preventDefault();
    const taskElement = document.querySelector('.dragging'); // Identifica o elemento arrastado
    const newParent = e.target.closest('.column'); // Garante o destino correto

    if (newParent && taskElement) {
        newParent.appendChild(taskElement); // Move o elemento
        taskElement.classList.remove('dragging');
    }
}

// Lógica para abrir e usar o formulário para adicionar tarefas
const addTaskButtons = document.querySelectorAll('.add-task-button');
const formContainer = document.getElementById('form-container');
const closeButton = document.querySelector('.form-container .close-button');
const taskForm = document.getElementById('task-form');

// Armazena a coluna onde a tarefa será adicionada
let currentColumn = null;

// Exibir o formulário ao clicar no botão "+"
addTaskButtons.forEach(button => {
    button.addEventListener('click', function () {
        formContainer.style.display = 'flex';
        currentColumn = button.closest('.column'); // Coluna correspondente
    });
});

// Fechar o formulário ao clicar no botão "X"
closeButton.addEventListener('click', function () {
    formContainer.style.display = 'none';
});

// Fechar o formulário ao clicar fora dele
window.addEventListener('click', function (event) {
    if (event.target === formContainer) {
        formContainer.style.display = 'none';
    }
});

// Adicionar nova tarefa ao enviar o formulário
taskForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão

    // Captura os dados do formulário
    const taskName = document.getElementById('task-name').value;
    const taskDetails = document.getElementById('task-details').value;

    // Cria o elemento de nova tarefa
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.setAttribute('draggable', 'true');
    newTask.textContent = taskName;

    // Adiciona eventos de arrastar
    newTask.addEventListener('dragstart', dragStart);
    newTask.addEventListener('dragend', dragEnd);

    // Adiciona a tarefa à coluna atual
    currentColumn.appendChild(newTask);

    // Fecha o formulário e reseta os campos
    formContainer.style.display = 'none';
    taskForm.reset();
});