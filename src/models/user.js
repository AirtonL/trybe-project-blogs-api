const { DataTypes } = require('sequelize');

const Attributes = {
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = (sequelize, _DataTypes) => {
  const User = sequelize.define('User', 
  Attributes,
  { timestamps: false });
  
  User.associate = (models) => {
    User.hasMany(models.BlogPosts,
      { foreignKey: 'userId', as: 'BlogPosts' });
    };
  return User;
};
