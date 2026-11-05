// Selectores del DOM
const taskForm = document.querySelector('#task-form');
const taskTitleInput = document.querySelector('#task-title');
const taskDescInput = document.querySelector('#task-desc');
const taskDateInput = document.querySelector('#task-date');
const formAlert = document.querySelector('#form-alert');
const filterLinks = document.querySelectorAll('.nav-pills-lila .nav-link');
const taskCards = document.querySelectorAll('#tasks-container .task-card');

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

// Evento de envío del formulario
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Capturar la opción de prioridad seleccionada
    const selectedPriority = document.querySelector('input[name="priority"]:checked');

    // Construir el objeto con los valores capturados del DOM
    const formData = {
        title: taskTitleInput.value,
        description: taskDescInput.value,
        date: taskDateInput.value,
        priority: selectedPriority ? selectedPriority.value : ''
    };

    // Comprobar en consola la captura de los valores antes de lanzar las alertas
    console.log('Datos capturados del formulario:', formData);

    // Ejecutar la función de validación
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
        // Ocultar la alerta de error si todos los datos son válidos y procesar el envío
        formAlert.classList.add('d-none');
        formAlert.innerHTML = '';

        console.log('✅ Tarea validada y procesada correctamente:', formData);
        taskForm.reset();
    }
});

// Funcionalidad del filtro
filterLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        // Actualizar estado activo de los botones del menú
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
            } else if (filterText.includes('En progreso')) {
                const isProgreso = card.querySelector('.estado-progreso') !== null;
                card.classList.toggle('d-none', !isProgreso);
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
