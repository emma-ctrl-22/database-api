const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ServiceRecord extends Model {}

  ServiceRecord.init({
    amountpaid: DataTypes.DECIMAL(10, 2),
    date: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ServiceRecord'
  });

  ServiceRecord.associate = (models) => {
    ServiceRecord.belongsTo(models.Guest, { foreignKey: 'guestid' });
    ServiceRecord.belongsTo(models.Staff, { foreignKey: 'staffid' });
    ServiceRecord.belongsTo(models.Payment, { foreignKey: 'paymentid' });
  };

  return ServiceRecord;
};
