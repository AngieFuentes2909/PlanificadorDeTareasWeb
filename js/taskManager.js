// Clase TaskManager para gestionar las tareas de la aplicación
class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    // Método para agregar una nueva tarea de manera programada (Sprint 2 - Tarea 5)
    addTask(name, description, dueDate, status = 'PORHACER') {
        this.currentId++;

        const task = {
            id: this.currentId,
            name: name,
            description: description,
            dueDate: dueDate,
            status: 'PORHACER'
        };

        this.tasks.push(task);
    }
}
