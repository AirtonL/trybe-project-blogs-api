module.exports = (sequelize, DataTypes) => sequelize.define('Category', {
  name: DataTypes.STRING,
},
{
  timestamps: false,
});
