const express = require('express');

const ProjectModel = require('../models/Project');

const router  = express.Router();

router.post('/projects', async (req, res) => {
    const project = await ProjectModel.create(req.body);

    return res.status(201).json({
        error: false,
        message: 'Project created with success!',
        project: project,
    });
});

router.get('/projects', async (req, res) => {
    const projects = await ProjectModel.find();

    return res.json({
        projects: projects,
    });
});

router.get('/projects/:id', async (req, res) => {
    const project = await ProjectModel.findById(req.params.id);

    if (!project) {
        return res.status(404).json({
            error: true,
            message: 'Project not found'
        });
    }

    return res.json({
        error:false,
        project: project,
    })
});

router.put('/projects/:id', async (req, res) => {
    const project = await ProjectModel.findById(req.params.id);

    if (!project) {
        return res.status(404).json({
            error: true,
            message: 'Project not found'
        });
    }

    Object.assign(project, req.body);

    const updatedProject = await project.save();

    return res.json({
        error:false,
        message: 'Project updated with success!',
        project: updatedProject,
    });
});

router.delete('/projects/:id', async (req, res) => {
    const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
        return res.status(404).json({
            error: true,
            message: 'Project not found'
        });
    }

    return res.json({
        error: false,
        message: 'Project deleted with success!',
        project: deletedProject,
    });
});

module.exports = router;