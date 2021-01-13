var encryption = require("../helpers/Encryption");
module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define(
    "users",
    {
      user_name: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
	  mobile_no: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      current_subscription: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      gender: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue:1
      },
      registration_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      device_registration_id: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      mac_id: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      otp :{
        allowNull:true,
        type: Sequelize.STRING(4)
      },
      otp_expiry: {
        allowNull:true,
        type: Sequelize.DATE
      },
      otp_verified: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      }
    },
    {
      getterMethods: {
        email: function () { return encryption.decryptData(this.getDataValue("email")); },
        mobile_no: function () { return encryption.decryptData(this.getDataValue("mobile_no")); },
        password: function () { return encryption.decryptData(this.getDataValue("password")); },
        user_type: function () { return encryption.decryptData(this.getDataValue("user_type")); },
        device_registration_id: function () { return encryption.decryptData(this.getDataValue("device_registration_id")); },
        mac_id: function () { return encryption.decryptData(this.getDataValue("mac_id")); },
        registration_type: function () { return encryption.decryptData(this.getDataValue("registration_type")); },
        gender: function () { return encryption.decryptData(this.getDataValue("gender")); },
      },
      setterMethods: {
        email: function (value) { this.setDataValue("email", encryption.encryptData(value)); },
        mobile_no: function (value) { this.setDataValue("mobile_no", encryption.encryptData(value)); },
        password: function (value) { this.setDataValue("password", encryption.encryptData(value)); },
        user_type: function (value) { this.setDataValue("user_type", encryption.encryptData(value)); },
        device_registration_id: function (value) { this.setDataValue("device_registration_id", encryption.encryptData(value)); },
        mac_id: function (value) { this.setDataValue("mac_id", encryption.encryptData(value)); },
        registration_type: function (value) { this.setDataValue("registration_type", encryption.encryptData(value)); },
        gender: function (value) { this.setDataValue("gender", encryption.encryptData(value)); },
      },
    }
  );

  return users;
};
