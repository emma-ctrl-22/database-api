const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Guest extends Model {}

  Guest.init({
    GuestId:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
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
