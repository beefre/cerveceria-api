const bcrypt = require("bcrypt-nodejs");
("use strict");
const { Model } = require("sequelize");
const { options } = require("../../app");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeValidate: (user, options) => {
          user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10)
          );
        }
      },
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: false,
    }
  );

  User.prototype.validPassword = function (password) {
     return bcrypt.compareSync(password, this.password);
   };

  return User;
};
