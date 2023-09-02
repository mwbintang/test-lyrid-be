const { hashPass } = require("../helpers/bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("employee_managements", [
      {
        username: "user",
        email: "user@email.com",
        password: hashPass("User1234"),
        address: "useraddress",
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
