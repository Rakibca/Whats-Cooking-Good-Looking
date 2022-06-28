const User = require('./User');
const Recipe = require('./Recipe');

User.hasMany(Recipe, {
    foreignKey: 'creator_id',
    onDelete: 'CASCADE'
});

Recipe.belongsTo(User, {
    foreignKey: 'creator_id'
});

module.exports = { User, Recipe };
