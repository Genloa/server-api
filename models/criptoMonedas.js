export default (sequelize, DataTypes) => {
  const CriptoMoneda = sequelize.define("CriptoMoneda", {
    nombre: DataTypes.STRING,
    codigo: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    monedaId: DataTypes.INTEGER,
    fechaActualizacion: DataTypes.DATE,
  });

  CriptoMoneda.associate = (db) => {
    CriptoMoneda.belongsTo(db.Moneda, {
      foreignKey: "monedaId",
      as: "moneda",
    });
  };

  return CriptoMoneda;
};
