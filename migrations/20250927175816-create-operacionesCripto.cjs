module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OperacionesCripto", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      operacion: {
        type: Sequelize.ENUM("compra", "venta"),
        allowNull: false,
      },
      cantidad: {
        type: Sequelize.DECIMAL(18, 8),
        allowNull: false,
      },
      precioUnitario: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fecha: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      usuarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Usuarios",
          key: "id",
        },
        allowNull: false,
      },
      criptoMonedaId: {
        type: Sequelize.INTEGER,
        references: {
          model: "CriptoMonedas",
          key: "id",
        },
        allowNull: false,
      },
      estado: {
        type: Sequelize.ENUM("pendiente", "completada", "cancelada"),
        defaultValue: "pendiente",
      },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("OperacionesCripto");
  },
};
