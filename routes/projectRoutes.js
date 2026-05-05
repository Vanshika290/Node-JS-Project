const express = require('express');
const router = express.Router();
const Project = require('../models/project');


const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
};


router.get('/projects', isLoggedIn, async (req, res) => {
    const projects = await Project.find({}).populate('author');
    res.render('projects/index', { projects });
});


router.get('/project/new', isLoggedIn, (req, res) => {
    res.render('projects/new');
});


router.post('/project', isLoggedIn, async (req, res) => {
    try {
        const project = new Project(req.body);
        project.author = req.user._id;
        await project.save();
        res.redirect(`/projects/${project._id}`);
    } catch (e) {
        console.log(e);
        res.redirect('/project/new');
    }
});


router.get('/projects/:id', isLoggedIn, async (req, res) => {
    const project = await Project.findById(req.params.id).populate('author');
    res.render('projects/show', { project });
});


router.get('/projects/:id/edit', isLoggedIn, async (req, res) => {
    const project = await Project.findById(req.params.id);
    res.render('projects/edit', { project });
});


router.put('/projects/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        await Project.findByIdAndUpdate(id, { ...req.body });
        res.redirect(`/projects/${id}`);
    } catch (e) {
        console.log(e);
        res.redirect(`/projects/${req.params.id}/edit`);
    }
});

// DELETE /projects/:id - Delete a project
router.delete('/projects/:id', isLoggedIn, async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/projects');
});

module.exports = router;
