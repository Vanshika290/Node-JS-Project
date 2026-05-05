const express = require('express');
const Project = require('../models/project');


const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
};

router.get('/project/new', isLoggedIn, (req, res) => {
    res.render('projects/new');
});

router.get('/projects/:id/edit', isLoggedIn, async (req, res) => {
    
    res.render('projects/edit', { project });
});

module.exports = router;
