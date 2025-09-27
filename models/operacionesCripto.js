export default (sequelize, DataTypes) => {
  const OperacionesCripto = sequelize.define("OperacionesCripto", {
    operacion: {
      type: DataTypes.ENUM("compra", "venta"),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false,
    },
    precioUnitario: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "completada", "cancelada"),
      defaultValue: "pendiente",
    },
  });
  OperacionesCripto.associate = (db) => {
    OperacionesCripto.belongsTo(db.Usuario, {
      foreignKey: "usuarioId",
      as: "usuario",
    });

    OperacionesCripto.belongsTo(db.CriptoMoneda, {
      foreignKey: "criptoMonedaId",
      as: "criptoMoneda",
    });
  };

  return OperacionesCripto;
};
