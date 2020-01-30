const foldersService = {
    getAllFolders(knex) {
        return knex.select('*').from('folders');
    },
    getFolderById(knex, id) {
        return knex
            .select('*')
            .from('folders')
            .where({ 'id': id })
    },
    createFolder(knex, folderName) {
        return knex
            .insert(folderName)
            .into('folders')
            .returning('*')
            .then(rows => {
              return rows[0]
            })
    }
}

module.exports = foldersService;