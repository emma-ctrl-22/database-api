const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Staff extends Model {}

  Staff.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    position: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Staff'
  });

  return Staff;
};
