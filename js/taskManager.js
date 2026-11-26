// Funcion para crear el HTML de cada tarjeta (recibe id como primer parametro - Tarea 7)
const createTaskHtml = (id, name, description, dueDate, status, priority = 'Media') => {
    const isCompleted = status === 'DONE' || status === 'COMPLETADA';

    let priorityClass = 'prioridad-media';
    if (priority === 'Alta') priorityClass = 'prioridad-alta';
    if (priority === 'Baja') priorityClass = 'prioridad-baja';

    const statusBadgeClass = isCompleted ? 'estado-completada' : 'estado-pendiente';
    const statusText = isCompleted ? 'DONE' : status;
    const doneBtnVisibility = isCompleted ? 'd-none' : '';

    return `
        <article class="card card-custom task-card ${isCompleted ? 'task-completed' : ''}" data-task-id="${id}">
            <div class="card-body p-3">
                <div class="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-3">
                    <div class="d-flex gap-3 align-items-start">
                        <input class="form-check-input mt-1 done-checkbox" type="checkbox" ${isCompleted ? 'checked' : ''} aria-label="Marcar tarea">
                        <div>
                            <div class="d-flex align-items-center gap-2 mb-1">
                                <h3 class="card-title mb-0 ${isCompleted ? 'text-decoration-line-through' : ''}">
                                    ${name}
                                </h3>
                                <span class="badge ${priorityClass}">${priority}</span>
                                <span class="badge ${statusBadgeClass} status-badge">${statusText}</span>
                            </div>
                            <p class="card-text mb-2">
                                ${description}
                            </p>
                            <span class="task-date">Entrega: ${dueDate}</span>
                        </div>
                    </div>
                    <div class="d-flex align-items-center gap-2 ms-sm-auto" data-task-id="${id}">
                        <button type="button" class="done-button btn btn-sm btn-toggle-status btn-status-pending ${doneBtnVisibility}">
                            Completar
                        </button>
                        <button type="button" class="delete-button btn btn-sm btn-delete-task">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </article>
    `;
};

// Clase TaskManager
class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    // Agregar tarea (Tarea 5)
    addTask(name, description, dueDate, priority = 'Media', status = 'PORHACER') {
        this.currentId++;

        const task = {
            id: this.currentId,
            name: name,
            description: description,
            dueDate: dueDate,
            priority: priority,
            status: status
        };

        this.tasks.push(task);
    }

    // Buscar tarea por id (Tarea 7)
    getTaskById(taskId) {
        let foundTask;

        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.id === taskId) {
                foundTask = task;
            }
        }

        return foundTask;
    }

    // Eliminar tarea por id (Tarea 6)
    deleteTask(taskId) {
        const newTasks = [];

        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.id !== taskId) {
                newTasks.push(task);
            }
        }

        this.tasks = newTasks;
    }

    // Renderizar lista de tareas pasando task.id a createTaskHtml
    render(activeFilter = 'Todas') {
        const tasksHtmlList = [];

        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            const isTaskDone = task.status === 'DONE' || task.status === 'COMPLETADA';

            if (activeFilter.includes('Pendientes') && isTaskDone) {
                continue;
            }
            if (activeFilter.includes('Completadas') && !isTaskDone) {
                continue;
            }

            let formattedDate = task.dueDate;
            if (task.dueDate && task.dueDate.includes('-')) {
                const parts = task.dueDate.split('-');
                formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
            }

            const taskHtml = createTaskHtml(
                task.id,
                task.name,
                task.description,
                formattedDate,
                task.status,
                task.priority || 'Media'
            );

            tasksHtmlList.push(taskHtml);
        }

        const tasksHtml = tasksHtmlList.join('\n');
        const tasksList = document.querySelector('#tasks-container');
        if (tasksList) {
            tasksList.innerHTML = tasksHtml;
        }

        // Actualizar contadores
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.status === 'DONE' || t.status === 'COMPLETADA').length;
        const pending = total - completed;

        const countAllBadge = document.querySelector('#count-all');
        const countPendingBadge = document.querySelector('#count-pending');
        const countCompletedBadge = document.querySelector('#count-completed');
        const totalTasksBadge = document.querySelector('#total-tasks-badge');

        if (countAllBadge) countAllBadge.textContent = total;
        if (countPendingBadge) countPendingBadge.textContent = pending;
        if (countCompletedBadge) countCompletedBadge.textContent = completed;
        if (totalTasksBadge) totalTasksBadge.textContent = `${total} tareas registradas`;
    }

    // Guardar en localStorage
    save() {
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);

        const currentId = String(this.currentId);
        localStorage.setItem('currentId', currentId);
    }

    // Cargar desde localStorage
    load() {
        if (localStorage.getItem('tasks')) {
            const tasksJson = localStorage.getItem('tasks');
            this.tasks = JSON.parse(tasksJson);
        } else {
            this.addTask('Diseño de tarjetas', 'hacer tarjeta utilizando clases card badges y utilidades flex.', '05/11/2026', 'Alta', 'PORHACER');
            this.addTask('Definir paleta de colores', 'mantener una interfaz suave, limpia y accesible.', '07/11/2026', 'Media', 'PORHACER');
            this.addTask('Preparar presentación del Sprint 1', 'explicar la estructura HTML5.', '10/11/2026', 'Alta', 'PORHACER');
            this.addTask('Revisar adaptabilidad', 'Verificar que tenga adaptabilidad.', '12/11/2026', 'Baja', 'PORHACER');
            this.addTask('Configurar repositorio en GitHub', 'Inicializar el proyecto local con Git, crear la estructura de carpetas y subir el primer commit.', '28/10/2026', 'Media', 'DONE');
            this.save();
        }

        if (localStorage.getItem('currentId')) {
            const currentId = localStorage.getItem('currentId');
            this.currentId = Number(currentId);
        }
    }
}
