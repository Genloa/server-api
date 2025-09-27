export default (sequelize, DataTypes) => {
  const CriptoMoneda = sequelize.define("CriptoMoneda", {
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    codigo: { type: DataTypes.STRING, allowNull: false, unique: true },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    monedaId: { type: DataTypes.INTEGER, allowNull: false },
    fechaActualizacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  CriptoMoneda.associate = (db) => {
    CriptoMoneda.belongsTo(db.Moneda, {
      foreignKey: "monedaId",
      as: "moneda",
    });
  };

  return CriptoMoneda;
};
