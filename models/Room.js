const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Room extends Model {}

  Room.init({
    roomNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    type: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('available', 'occupied'),
      defaultValue: 'available'
    }
  }, {
    sequelize,
    modelName: 'Room'
  });

  return Room;
};
