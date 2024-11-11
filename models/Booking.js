const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Booking extends Model {}

  Booking.init({
    checkout_date: DataTypes.DATE,
    checkin_date: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM('confirmed', 'pending', 'cancelled'),
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Booking'
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.Guest, { foreignKey: 'guestid' });
    Booking.belongsTo(models.Staff, { foreignKey: 'staffid' });
    Booking.belongsTo(models.Room, { foreignKey: 'roomid' });
    Booking.belongsTo(models.Payment, { foreignKey: 'paymentid' });
  };

  return Booking;
};
