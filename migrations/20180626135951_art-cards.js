
exports.up = function(knex, Promise) {
  return knex.schema.createTable('art_card', (table) => {
    table.increments()
    table.text('imgUrl')
    table.text('description')
    table.text('location')
    table.float('lat')
    table.float('lng')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('art_card')
};
