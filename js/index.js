// clase TaskManager
const taskManager = new TaskManager();
console.log(taskManager.tasks);

// Selectores del DOM
const taskForm = document.querySelector('#task-form');
const taskTitleInput = document.querySelector('#task-title');
const taskDescInput = document.querySelector('#task-desc');
const taskDateInput = document.querySelector('#task-date');
const formAlert = document.querySelector('#form-alert');
const filterLinks = document.querySelectorAll('.nav-pills-lila .nav-link');
const taskCards = document.querySelectorAll('#tasks-container .task-card');
const countAllBadge = document.querySelector('#count-all');
const countPendingBadge = document.querySelector('#count-pending');
const countCompletedBadge = document.querySelector('#count-completed');

/**
 * funcion obligatoria opara validar
 * @param {Object} data 
 * @returns {Object} 
 */
function validFormFieldInput(data) {
    // comprobar en consola los datos recibidos 
    console.log('Validando datos en validFormFieldInput(data):', data);

    const errors = [];

    // nombre: No puede estar vacío
    if (!data.title || data.title.trim() === '') {
        errors.push('El título de la tarea no puede estar vacío.');
    }

    // descripción: No puede estar vacía
    if (!data.description || data.description.trim() === '') {
        errors.push('La descripción no puede estar vacía.');
    }

    // Fecha de entrega: Debe contener una fecha válida
    const parsedDate = Date.parse(data.date);
    if (!data.date || data.date.trim() === '' || isNaN(parsedDate)) {
        errors.push('Debes seleccionar una fecha de entrega válida.');
    }

    // estado/Prioridad: Debe tener una opción seleccionada
    if (!data.priority || data.priority.trim() === '') {
        errors.push('Debes seleccionar una prioridad (Alta, Media o Baja).');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// envio del formulario
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // prioridad seleccionada
    const selectedPriority = document.querySelector('input[name="priority"]:checked');


    const formData = {
        title: taskTitleInput.value,
        description: taskDescInput.value,
        date: taskDateInput.value,
        priority: selectedPriority ? selectedPriority.value : ''
    };


    console.log('Datos capturados del formulario:', formData);

    //  función de validacion
    const validationResult = validFormFieldInput(formData);

    if (!validationResult.isValid) {

        formAlert.classList.remove('d-none', 'alert-success');
        formAlert.classList.add('alert-danger');
        formAlert.innerHTML = `
            <strong>⚠️ Por favor corrige los siguientes campos:</strong>
            <ul class="mb-0 mt-1 ps-3">
                ${validationResult.errors.map(err => `<li>${err}</li>`).join('')}
            </ul>
        `;
        console.log('Errores de validación:', validationResult.errors);
    } else {

        formAlert.classList.add('d-none');
        formAlert.innerHTML = '';

        console.log(' Tarea validada y procesada correctamente:', formData);
        taskForm.reset();
    }
});

/**
 * Actualizacion de los contadores 
 */
function updateTaskCounters() {
    const total = taskCards.length;
    const completed = document.querySelectorAll('#tasks-container .task-card.task-completed').length;
    const pending = total - completed;

    if (countAllBadge) countAllBadge.textContent = total;
    if (countPendingBadge) countPendingBadge.textContent = pending;
    if (countCompletedBadge) countCompletedBadge.textContent = completed;
}

/**
 * funcion para actualizar la tarjeta entre Pendiente y Completada
 * @param {HTMLElement} card 
 */
function toggleTaskStatus(card) {
    const title = card.querySelector('.card-title');
    const statusBadge = card.querySelector('.status-badge');
    const toggleBtn = card.querySelector('.btn-toggle-status');
    const checkbox = card.querySelector('.form-check-input');

    // Verificar si la tarjeta está actualmente completada
    const isCompleted = card.classList.contains('task-completed');

    if (isCompleted) {
        // Cambiar a estado Pendiente
        card.classList.remove('task-completed');
        title.classList.remove('text-decoration-line-through');

        if (statusBadge) {
            statusBadge.textContent = 'Pendiente';
            statusBadge.classList.remove('estado-completada');
            statusBadge.classList.add('estado-pendiente');
        }

        if (toggleBtn) {
            toggleBtn.textContent = '✓ Completar';
            toggleBtn.classList.remove('btn-status-completed');
            toggleBtn.classList.add('btn-status-pending');
        }

        if (checkbox) {
            checkbox.checked = false;
        }

        console.log(`🔄 Tarea marcada como Pendiente: "${title.textContent.trim()}"`);
    } else {
        // Cambiar a estado Completada
        card.classList.add('task-completed');
        title.classList.add('text-decoration-line-through');

        if (statusBadge) {
            statusBadge.textContent = 'Completada';
            statusBadge.classList.remove('estado-pendiente');
            statusBadge.classList.add('estado-completada');
        }

        if (toggleBtn) {
            toggleBtn.textContent = '↩ Reabrir';
            toggleBtn.classList.remove('btn-status-pending');
            toggleBtn.classList.add('btn-status-completed');
        }

        if (checkbox) {
            checkbox.checked = true;
        }

        console.log(`✅ Tarea marcada como Completada: "${title.textContent.trim()}"`);
    }


    updateTaskCounters();
}

taskCards.forEach(function (card) {
    const toggleBtn = card.querySelector('.btn-toggle-status');
    const checkbox = card.querySelector('.form-check-input');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            toggleTaskStatus(card);
        });
    }

    if (checkbox) {
        checkbox.addEventListener('change', function () {
            toggleTaskStatus(card);
        });
    }
});

// funcionalidad del filtro
filterLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        //  estado activo de los botones del menú
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

        // identificar cual filtro se undio
        const filterText = link.textContent.trim();
        console.log('Filtro seleccionado:', filterText);

        // mostrar y ocultar tarjetas según su estado
        taskCards.forEach(function (card) {
            if (filterText.includes('Todas')) {
                card.classList.remove('d-none');
            } else if (filterText.includes('Pendientes')) {
                const isPendiente = card.querySelector('.estado-pendiente') !== null;
                card.classList.toggle('d-none', !isPendiente);
            } else if (filterText.includes('Completadas')) {
                const isCompletada = card.querySelector('.estado-completada') !== null;
                card.classList.toggle('d-none', !isCompletada);
            }
        });
    });
});
