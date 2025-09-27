export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("OperacionesCripto", {
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
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Usuarios",
        key: "id",
      },
      allowNull: false,
    },
    criptoMonedaId: {
      type: DataTypes.INTEGER,
      references: {
        model: "CriptoMonedas",
        key: "id",
      },
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "completada", "cancelada"),
      defaultValue: "pendiente",
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
}
