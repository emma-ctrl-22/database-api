const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Payment extends Model {}

  Payment.init({
    amount: DataTypes.DECIMAL(10, 2),
    paymentmethod: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment'
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Guest, { foreignKey: 'guestId' });
    Payment.belongsTo(models.Booking, { foreignKey: 'Bookingid' });
  };

  return Payment;
};
