const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Guest extends Model {}

  Guest.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Guest'
  });

  return Guest;
};
