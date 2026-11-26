// Instancia de TaskManager
const taskManager = new TaskManager(0);

taskManager.load();
taskManager.render();
console.log(taskManager.tasks);

// Selectores del DOM
const taskForm = document.querySelector('#task-form');
const taskTitleInput = document.querySelector('#task-title');
const taskDescInput = document.querySelector('#task-desc');
const taskDateInput = document.querySelector('#task-date');
const formAlert = document.querySelector('#form-alert');
const tasksContainer = document.querySelector('#tasks-container');
const filterLinks = document.querySelectorAll('.nav-pills-lila .nav-link');

let currentFilter = 'Todas';

// Funcion obligatoria para validar campos del formulario
function validFormFieldInput(data) {
    console.log('Validando datos:', data);

    const errors = [];

    if (!data.title || data.title.trim() === '') {
        errors.push('El título de la tarea no puede estar vacío.');
    }

    if (!data.description || data.description.trim() === '') {
        errors.push('La descripción no puede estar vacía.');
    }

    const parsedDate = Date.parse(data.date);
    if (!data.date || data.date.trim() === '' || isNaN(parsedDate)) {
        errors.push('Debes seleccionar una fecha de entrega válida.');
    }

    if (!data.priority || data.priority.trim() === '') {
        errors.push('Debes seleccionar una prioridad (Alta, Media o Baja).');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Envio del formulario
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = taskTitleInput.value.trim();
    const description = taskDescInput.value.trim();
    const dueDate = taskDateInput.value;
    const selectedPriority = document.querySelector('input[name="priority"]:checked');
    const priority = selectedPriority ? selectedPriority.value : '';

    const formData = {
        title: name,
        description: description,
        date: dueDate,
        priority: priority
    };

    console.log('Datos capturados:', formData);

    const validationResult = validFormFieldInput(formData);

    if (!validationResult.isValid) {
        formAlert.classList.remove('d-none', 'alert-success');
        formAlert.classList.add('alert-danger');
        formAlert.innerHTML = `
            <strong>Por favor revisa los siguientes campos:</strong>
            <ul class="mb-0 mt-1 ps-3">
                ${validationResult.errors.map(err => `<li>${err}</li>`).join('')}
            </ul>
        `;
    } else {
        formAlert.classList.add('d-none');
        formAlert.innerHTML = '';

        taskManager.addTask(name, description, dueDate, priority);
        taskManager.save();
        taskManager.render(currentFilter);

        console.log(taskManager.tasks);
        taskForm.reset();
    }
});

// Eventos para completar y eliminar tareas
tasksContainer.addEventListener('click', function (event) {
    if (
        event.target.classList.contains('done-button') ||
        event.target.classList.contains('btn-toggle-status') ||
        event.target.classList.contains('done-checkbox')
    ) {
        const parentTask = event.target.closest('[data-task-id]');
        const taskId = Number(parentTask.dataset.taskId);
        const task = taskManager.getTaskById(taskId);

        if (task) {
            task.status = task.status === 'COMPLETADA' ? 'PORHACER' : 'COMPLETADA';
            taskManager.save();
            taskManager.render(currentFilter);
        }
    }

    if (event.target.classList.contains('delete-button')) {
        const parentTask = event.target.closest('[data-task-id]');
        const taskId = Number(parentTask.dataset.taskId);

        taskManager.deleteTask(taskId);
        taskManager.save();
        taskManager.render(currentFilter);
    }
});

// Filtro del menu lateral
filterLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        filterLinks.forEach(function (item) {
            item.classList.remove('active');
            const badge = item.querySelector('.badge');
            if (badge) {
                badge.classList.remove('bg-white', 'text-lila');
                badge.classList.add('badge-count');
            }
        });

        link.classList.add('active');
        const activeBadge = link.querySelector('.badge');
        if (activeBadge) {
            activeBadge.classList.remove('badge-count');
            activeBadge.classList.add('bg-white', 'text-lila');
        }

        currentFilter = link.textContent.trim();
        taskManager.render(currentFilter);
    });
});
