export default (sequelize, DataTypes) => {
  const Moneda = sequelize.define("Moneda", {
    nombre: { type: DataTypes.STRING, allowNull: false },
    codigo: { type: DataTypes.STRING, allowNull: false, unique: true },
    simbolo: { type: DataTypes.STRING, allowNull: false, unique: true },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
  return Moneda;
};
