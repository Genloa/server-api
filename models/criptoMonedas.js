export default (sequelize, DataTypes) => {
  const CriptoMonedas = sequelize.define("CriptoMonedas", {
    nombre: { type: DataTypes.STRING, allowNull: false },
    codigo: { type: DataTypes.STRING, allowNull: false, unique: true },

    precio: { type: DataTypes.FLOAT, allowNull: false },
    monedaId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Monedas",
        key: "id",
      },
      allowNull: false,
    },
    fechaActualizacion: { type: DataTypes.DATE, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
  return CriptoMonedas;
};
