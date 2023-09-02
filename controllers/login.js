const { user_management, employee_management } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { signJWT } = require("../helpers/jwt");
class controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "wrong email/password" };
      }
      let role = "user_management"
      let emailSearch = await user_management.findOne({ where: { email } });
      if (!emailSearch){
        emailSearch = await employee_management.findOne({ where: { email } });
        role = "employee_management"
      }
      if (!emailSearch) {
        throw { name: "email/password not valid" };
      }
      let comaparePass = compare(password, emailSearch.password);
      if (!comaparePass) {
        throw { name: "wrong email/password" };
      }
      let access_token = signJWT({
        id: emailSearch.id,
        role
      });
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = controller;
