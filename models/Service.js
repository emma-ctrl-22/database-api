const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Service extends Model {}

  Service.init({
    ServiceName: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Service'
  });

  Service.associate = (models) => {
    Service.belongsTo(models.Staff, { foreignKey: 'staffId' });
  };

  return Service;
};
