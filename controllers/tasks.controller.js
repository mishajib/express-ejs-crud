const {locals} = require("express/lib/application");
const Task     = require('../models/task');
const index    = async (req, res) => {
    console.log(res.locals.successMsg);
    const page     = parseInt(req.query.page) || 1; // Get the page parameter from the request query, default to page 1
    const pageSize = 10; // Set the number of tasks per page
    const offset   = (page - 1) * pageSize; // Calculate the offset based on the current page

    const tasks = await Task.findAll({
        limit : pageSize,
        offset: offset,
    });

    // Get the total number of tasks
    const totalTasks = await Task.count();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalTasks / pageSize);

    console.log(totalPages)

    const pagination = {
        currentPage: page,
        pageSize   : pageSize,
        totalTasks : totalTasks,
        totalPages : totalPages,
        offset     : offset,
    };

    return res.render('tasks/index', {title: 'Tasks', 'tasks': tasks, 'pagination': pagination});
};

const create = async (req, res) => {
    console.log(res.locals.errorMsg);
    console.log(res.locals.inputValues);
    console.log(res.locals.validationErrors);
    console.log(res.locals.successMsg);
    return res.render('tasks/create', {title: 'Add new task'});
};

const store = async (req, res) => {
    try {
        console.log(req.body);
        await Task.create(req.body);

        req.flash('successMsg', 'Task created successfully.');

        return res.redirect('/tasks');
    } catch (e) {
        console.log(e);
        req.flash('errorMsg', 'Something went wrong, Please try again!');

        return res.redirect('back');
    }
};

const show = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        return res.render('tasks/show', {title: 'Show task details', task: task});
    } catch (e) {
        console.log(e);
        req.flash('errorMsg', 'Something went wrong, Please try again!');

        return res.redirect('back');
    }
};

const edit = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        return res.render('tasks/edit', {title: 'Edit task', task: task});
    } catch (e) {
        console.log(e);
        req.flash('errorMsg', 'Something went wrong, Please try again!');

        return res.redirect('back');
    }
};

const update = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        await task.update(req.body);

        req.flash('successMsg', 'Task updated successfully.');

        return res.redirect('/tasks');
    } catch (e) {
        console.log(e);
        req.flash('errorMsg', 'Something went wrong, Please try again!');

        return res.redirect('back');
    }
};

const destroy = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        await task.destroy();

        req.flash('successMsg', 'Task deleted successfully.');

        return res.redirect('/tasks');
    } catch (e) {
        console.log(e);
        req.flash('errorMsg', 'Something went wrong, Please try again!');

        return res.redirect('back');
    }
};

module.exports = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy
};