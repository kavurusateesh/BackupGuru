//var encryption = require("../helpers/Encryption");
module.exports = (sequelize, Sequelize) => {
  const tbl_user_subscription = sequelize.define(
    "user_subscription",
    {
        user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      subscription_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
     
    },
    {
    //   getterMethods: {
		// email: function () { return encryption.decryptData(this.getDataValue("email")); },
		// mobile_number: function () { return encryption.decryptData(this.getDataValue("mobile_number")); },
		// password: function () { return encryption.decryptData(this.getDataValue("password")); },
		// user_type: function () { return encryption.decryptData(this.getDataValue("user_type")); },
	  // },
    //   setterMethods: {
    //     email: function (value) { this.setDataValue("email", encryption.encryptData(value)); },
    //     mobile_number: function (value) { this.setDataValue("mobile_number", encryption.encryptData(value)); },
    //     password: function (value) { this.setDataValue("password", encryption.encryptData(value)); },
    //     user_type: function (value) { this.setDataValue("user_type", encryption.encryptData(value)); },
    //   },
    }
  );
  return tbl_user_subscription;
};
