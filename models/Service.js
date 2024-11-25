const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Service extends Model {}

  Service.init({
    serviceId: {type:DataTypes.STRING,unique: true},
    ServiceName: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Service'
  });

  Service.associate = (models) => {
    Service.belongsTo(models.Staff, { foreignKey: 'StaffId' });
  };

  return Service;
};
