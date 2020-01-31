const notesService = {

    getAllNotes(knex) {
        return knex.select('*').from('notes')
    },
    createNote(knex, note) {
        return knex
            .insert(note)
            .into('notes')
            .returning('*')
            .then(rows => {
                return rows[0]
              })
    },
    getNoteById(knex, id) {
        return knex
            .select('*')
            .from('notes')
            .where({ 'id': id})
    },
    deleteNote(knex, id) {
        return knex('notes')
        .where({ id })
        .delete()
            
    }
}

module.exports = notesService;