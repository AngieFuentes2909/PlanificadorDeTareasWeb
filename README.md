# Planificador de Tareas 💜

Aplicación web del Bootcamp de Generation (Cierre del Sprint 2).

---

## 📋 Descripción del Proyecto

El **Planificador de Tareas** es una aplicación web con diseño minimalista en tonos lila que permite gestionar actividades diarias de principio a fin:
- **Crear tareas** mediante un formulario validado (`validFormFieldInput(data)`) indicando título, descripción, fecha de entrega y nivel de prioridad (**Alta**, **Media** o **Baja**).
- **Visualizar y filtrar tareas** por estado (**Todas**, **Pendientes** y **Completadas**) con contadores dinámicos en el menú lateral.
- **Alternar estado (*Toggle*)** entre **Pendiente** y **Completada** dinámicamente.
- **Eliminar tareas** individualmente mediante `deleteTask(taskId)` y el botón **Eliminar** (`delete-button`).
- **Persistencia de datos** en el navegador utilizando `localStorage` (`save()` y `load()`).

---

## 🔗 Enlaces del Proyecto

- 📌 **Tablero de Trello (Gestión de Sprints 1 y 2):** [Ver Tablero en Trello](https://trello.com/invite/b/6ae256a45e5ec7d73396df92/ATTIabfda39e80d0df4987ba9aa9a47873ff5E96DD84/planificador-de-tareas-by-angie-fuentes)
- 🎨 **Wireframe y Diseño en Figma:** [Ver Diseño en Figma](https://www.figma.com/design/0wb9738ocME9GR0ul2ezDy/Planificador-de-tareas-Angie?node-id=0-1&p=f&t=3EjWR5z2QbAowjXv-0)
- 🚀 **Demostración en vivo (GitHub Pages):** [https://angiefuentes2909.github.io/PlanificadorDeTareasWeb/](https://angiefuentes2909.github.io/PlanificadorDeTareasWeb/)

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** (Estructura semántica y atributos `data-task-id`)
- **CSS3** (Estilos personalizados en paleta lila pastel)
- **Bootstrap 5.3** (Sistema de grillas, tarjetas, insignias, botones, formularios y alertas)
- **JavaScript (ES6, POO y LocalStorage)** (Clase `TaskManager`, métodos `addTask()`, `getTaskById()`, `deleteTask()`, `render()`, `save()` y `load()`)
- **Git & GitHub** (Control de versiones y despliegue continuo en GitHub Pages)

---

## 📂 Arquitectura y Estructura de Archivos

```text
Planificador-Tareas/
├── css/
│   └── style.css          # Estilos personalizados, portada y botones de acción
├── img/
│   └── planer2.jpg        # Imagen de portada principal del planificador
├── js/
│   ├── taskManager.js     # Función createTaskHtml y clase TaskManager (addTask, deleteTask, save, load, render)
│   └── index.js           # Validación del formulario y EventListeners para agregar, completar, filtrar y eliminar
├── index.html             # Estructura principal de la aplicación
└── README.md              # Documentación del proyecto
```

---

## 👩‍💻 Autora

Desarrollado por **Angie Fuentes** 💜
