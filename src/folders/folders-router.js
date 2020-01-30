const express = require('express');
const foldersRouter = express.Router();
const bodyParser = express.json();
const foldersService = require('./folders-service');



foldersRouter
    .route('/api/folders')
    .get((req, res, next) => {
        
        const knexInstance = req.app.get('db');
        
        foldersService.getAllFolders(knexInstance)
            .then(results => {
                res.json(results);
            })
            .catch(next)
    })
    .post(bodyParser, (req, res, next) => {
        
        const knexInstance = req.app.get('db');
         
        const { folder_name } = req.body;
        
        if(!folder_name) {
             
            res.status(400).json({
                 error: `The 'folder_name' value is missing from your body`      
               })
        }
        
        const folder = { folder_name };
        
        foldersService.createFolder(knexInstance, folder)
            .then(result => {
                res.status(201).location(`/api/folders/${result.id}`).json(result)
            })
            .catch(next)

    })

foldersRouter
    .route('/api/folders/:id')
    .get((req, res, next) => {
        
        const knexInstance = req.app.get('db');
        
        const id = req.params.id;
        
        foldersService.getFolderById(knexInstance, id)
            .then(result => {
                if (!result) {
                    return res.status(404).json({
                        error: `Folder ID Does Not Exist`
                    })
                }

                res.json(result);
            })
            .catch(next)

    })

module.exports = foldersRouter;