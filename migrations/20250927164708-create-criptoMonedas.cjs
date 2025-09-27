module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CriptoMonedas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      codigo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      precio: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      monedaId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Monedas",
          key: "id",
        },
        allowNull: false,
      },
      fechaActualizacion: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("CriptoMonedas");
  },
};
