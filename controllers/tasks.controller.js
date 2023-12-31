const XLSX        = require('xlsx');
const csv         = require('csv-parser');
const fs          = require('fs-extra');
const Task        = require('../models/task');
const {uploadCSV} = require("../helpers/csvUploade.helper");

const index = async (req, res) => {
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
    return res.render('tasks/create', {title: 'Add new task'});
};

const store = async (req, res) => {
    try {
        await Task.create(req.body);

        req.flash('successMsg', 'Task created successfully.');

        return res.redirect('back');
    } catch (e) {
        req.flash('errorMsg', 'Something went wrong, Please try again!');

        return res.redirect('back');
    }
};

const show = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        return res.render('tasks/show', {title: 'Show task details', task: task});
    } catch (e) {
        req.flash('errorMsg', 'Something went wrong, Please try again!');

        return res.redirect('back');
    }
};

const edit = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        return res.render('tasks/edit', {title: 'Edit task', task: task});
    } catch (e) {
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
        req.flash('errorMsg', 'Something went wrong, Please try again!');

        return res.redirect('back');
    }
};

const importTasksPage = async (req, res) => {
    return res.render('tasks/import', {title: 'Import tasks'});
};

const importTasks = async (req, res) => {
    try {
        const filePath      = req.file.path;
        const fileExtension = filePath.split('.').pop().toLowerCase();

        if (fileExtension === 'xlsx') {
            const workbook  = XLSX.readFile(filePath);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData  = XLSX.utils.sheet_to_json(worksheet);

            // Process jsonData and save it to the database using Sequelize
            await Task.bulkCreate(jsonData);
        } else if (fileExtension === 'csv') {
            const csvData = await uploadCSV(filePath);

            // Process csvData and save it to the database using Sequelize
            await Task.bulkCreate(csvData);
        } else {
            req.flash('errorMsg', 'Unsupported file format, Please upload a CSV or XLSX file!');
            return res.redirect('back');
        }

        // Clean up the uploaded file after importing
        fs.unlinkSync(filePath);

        req.flash('successMsg', 'Tasks imported successfully.');

        return res.redirect('/tasks');
    } catch (e) {
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
    destroy,
    importTasksPage,
    importTasks
};