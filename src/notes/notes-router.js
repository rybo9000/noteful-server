const express = require('express');

const notesRouter = express.Router();
const bodyParser = express.json();
const notesService = require('./notes-service');

notesRouter
    .route('/api/notes')
    .get((req, res, next) => {
        
        const knexInstance = req.app.get('db');
        
        notesService.getAllNotes(knexInstance)
            .then(results => {
                res.json(results)
            })
            .catch(next)
    })
    .post(bodyParser, (req, res, next) => {
        
        const knexInstance = req.app.get('db');
        
        const { note_name, content, folder_id } = req.body;

        if (!note_name || !content || !folder_id) {
            res.status(400).json({
                error: `note_name, content, and folder_id are required`
            })
        }

        const newNote = { note_name, content, folder_id };

        notesService.createNote(knexInstance, newNote)
            .then(result => {
                res.status(201).location(`/api/notes/${result.id}`).json(result)
            })
            .catch(next)
    })

    notesRouter
        .route('/api/notes/:id')
        .get((req, res, next) => {

            const knexInstance = req.app.get('db');
            
            const id = req.params.id;

            notesService.getNoteById(knexInstance, id)
                .then(result => {
                    res.json(result)
                })

        })

module.exports = notesRouter;