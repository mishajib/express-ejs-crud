const express         = require('express');
const router          = express.Router();
const indexController = require('../controllers/index.controller');
const tasksController = require("../controllers/tasks.controller");
const {validateTask}  = require('../requests/task.request');

const routes = (app) => {
    // GET - /
    router.get('/', indexController.home);

    router.get('/tasks', tasksController.index);
    router.get('/tasks/create', tasksController.create);
    router.post('/tasks', validateTask, tasksController.store);
    router.get('/tasks/:id', tasksController.show);
    router.get('/tasks/:id/edit', tasksController.edit);
    router.put('/tasks/:id', validateTask, tasksController.update);
    router.delete('/tasks/:id', tasksController.destroy);

    app.use(router);
};

module.exports = routes;