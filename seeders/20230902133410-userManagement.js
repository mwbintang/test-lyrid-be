const { hashPass } = require("../helpers/bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user_managements", [
      {
        username: "admin",
        email: "admin@email.com",
        password: hashPass("Admin1234"),
        address: "adminaddress",
        phone_number: "12345678",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Add code to remove seeded data (if needed)
  },
};
