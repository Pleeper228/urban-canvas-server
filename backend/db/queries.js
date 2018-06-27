const knex = require('./knex');

module.exports = {
    getAll() {
        return knex('art_card');
    },
    create(art_card) {
        return knex('art_card').insert(art_card, '*');
    },
    update(id, art_card) {
        return knex('art_card').where('id', id).update(art_card, '*');
    },
    delete(id) {
        return knex('art_card').where('id', id).del()
    }
}