const { employee_management } = require("../models");

class controller {
  static async getData(req, res, next) {
    try {
      let { page } = req.query;
      if (!page) page = 1;
      const limit = 10;
      const offset = (page - 1) * limit;
      const data = await employee_management.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      });
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  static async dataById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await employee_management.findOne({
        where: { id },
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      });
      if (!data) {
        throw { name: "Data Not Found" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { username, address, phone_number, password, email } = req.body;
      const data = await employee_management.create({
        username,
        address,
        phone_number,
        password,
        email,
      });
      delete data.dataValues.password
      delete data.dataValues.createdAt
      delete data.dataValues.updatedAt
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async edit(req, res, next) {
    try {
      const { idUser, role } = req.userFind;
      const { id } = req.params;
      if (role != "employee_management" || idUser != id) {
        throw { name: "Unauthorized" };
      }
      const { username, address, phone_number, password, email } = req.body;
      const employee_management_data = await employee_management.findByPk(id);
      if (!employee_management_data) {
        throw { name: "Data Not Found" };
      }

      const dataUpdated = await employee_management_data.update({
        username,
        address,
        phone_number,
        password,
        email,
      });
      delete dataUpdated.dataValues.password
      delete dataUpdated.dataValues.createdAt
      delete dataUpdated.dataValues.updatedAt
      res.status(200).json(dataUpdated);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { idUser, role } = req.userFind;
      const { id } = req.params;
      if (role != "employee_management" || idUser != id) {
        throw { name: "Unauthorized" };
      }
      const data = await employee_management.findByPk(id);
      if (!data) {
        throw { name: "Data Not Found" };
      }
      await data.destroy();
      res.status(200).json({ msg: "Success Delete" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = controller;
