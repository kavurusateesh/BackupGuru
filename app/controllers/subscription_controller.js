const db = require("../models");
const Sequelize = require("sequelize");
var fs = require("fs");
const Subscription = db.subscription;

var dbConfig = require("../config/db.config");
//var encryption = require("../helpers/Encryption");

exports.create = (req, res) => {
  // return
  console.log("--------------------------------")
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
  } else {
    var randomNumber = Math.floor(1000 + Math.random() * 9000);
    var dts = new Date(req.body.start_date);
    var start_date = dts.setMinutes(dts.getMinutes() + 10);
    // Create a User
    var dte = new Date(req.body.end_date);
    var end_date = dte.setMinutes(dte.getMinutes() + 10);

    const SubscriptionVal = {
      packname : req.body.packname,
      formdate: start_date,
      todate: end_date,
      data_size: req.body.data_size,
      is_main: req.body.is_main, 
      status: 1,
    };
 
        Subscription.create(SubscriptionVal)
          .then((data) => {
            // Create a Patient
       
                  // SEND MAIL
                  res.status(200).send({
                    status: 200,
                    error: false,
                    message: "Subscription created successfully.",
                    // data: {
                    //   id: data.id,
                    //   otp: randomNumber,
                    //   otp_expiry: newTime,
                    // },
                  });
                
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Users.",
            });
            console.log("------",err.message);
          });
  
 
  }
};

// Retrieve all Users
exports.findAll = (req, res, next) => {
  // const id = req.query.id;
  // var condition = id ? { id: { [Op.eq]: `${id}` } } : null;

  // if (req.query.user_type !== undefined) {
  //   var user_type = req.query.user_type;
  //   const user_type_val = encryption.encryptData(user_type);
  //   var condition = user_type
  //     ? { user_type: { [Op.eq]: `${user_type_val}` } }
  //     : null;
  // }

  // Users.hasOne(Patient, { foreignKey: "user_id" });
  // Patient.belongsTo(Users, { foreignKey: "user_id" });

  // var sortType = ["first_name", "ASC"];
  // var incVal = { where: condition };

  // if (user_type == "patient") {
  //   incVal = {
  //     where: condition,
  //     include: [{ model: Patient, order: [sortType] }],
  //   };
  // }

  Subscription.findAll({})
    .then((data) => {
      //console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Patient List.",
      });
    });
};

// Find a single users with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
console.log("--------------------")
  Subscription.findOne({where:{id:id}})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};
// Update a users by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
console.log("----------------------")
  console.log(req.body)
  var dts = new Date(req.body.start_date);
  var start_date = dts.setMinutes(dts.getMinutes() + 10);
  // Create a User
  var dte = new Date(req.body.end_date);
  var end_date = dte.setMinutes(dte.getMinutes() + 10);
  const SubscriptionVal = {
    packname : req.body.packname,
    formdate: start_date,
    todate: end_date,
    data_size: req.body.data_size,
    is_main: req.body.is_main, 
    status: 1,
  };
  Subscription.update(SubscriptionVal, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Subscription updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Subscription with id=${id}. Maybe Subscription was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(200).send({
        message: "Error updating Users with id=" + id,
      });
    });
};

// Delete a users with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Subscription.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Subscription was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Subscription with id=${id}. Maybe Subscription was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(200).send({
        message: "Could not delete Subscription with id=" + id,
      });
    });
};

