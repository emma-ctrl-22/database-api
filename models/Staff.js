const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Staff extends Model {}

  Staff.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    position: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StaffId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Staff',
  });

  return Staff;
};
