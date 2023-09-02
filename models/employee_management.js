"use strict";
const { Model } = require("sequelize");
const { hashPass } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class employee_management extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee_management.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Your username has been used",
        },
        validate: {
          notNull: {
            msg: "Please enter your username",
          },
          notEmpty: {
            msg: "Please enter your username",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your password",
          },
          notEmpty: {
            msg: "Please enter your password",
          },
          len: {
            args: [5],
            msg: "Minimum 5 digit",
          },
        },
      },
      url_photo: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Your email has been used",
        },
        validate: {
          notNull: {
            msg: "Please enter your email",
          },
          notEmpty: {
            msg: "Please enter your email",
          },
          isEmail: {
            msg: "Must be a valid email",
          },
        },
      },
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (data) => {
          data.password = hashPass(data.password);
        },
      },
      sequelize,
      modelName: "employee_management",
    }
  );
  return employee_management;
};
