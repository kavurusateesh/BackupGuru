const db = require("../models");
const Sequelize = require("sequelize");

var fs = require("fs");
const User = db.users;
const Op = Sequelize.Op;
var dbConfig = require("../config/db.config");
var encryption = require("../helpers/Encryption");

const sgMail = require('@sendgrid/mail');
var base64Img = require('base64-img');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var request = require("request");
let nodeGeocoder = require("node-geocoder");

var dbConfig = require("../config/db.config");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../config/passport")(passport);
var encryption = require("../helpers/Encryption");
const path = require("path");
const multer = require("multer");
var fs = require("fs");
const { session } = require("passport");

let geooptions = {
  provider: "google",
  //fetch: customFetchImplementation,
  //apiKey: "AIzaSyDIgLLptmlpfjhWSrXtwQW57AxI3aeWDes",
  apiKey: "AIzaSyArnvEDe6utnPoBvG1HJrD-vxrXk6kSQj8",
  formatter: null, // 'gpx', 'string', ...
};

// Create and Save a new Userss
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.mobile_no || !req.body.password || !req.body.user_name || !req.body.gender || req.body.email == '' || req.body.mobile_no == '' || req.body.password == '' || req.body.user_name == '' || req.body.gender == '') {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  var otp =  Math.floor(1000 + Math.random() * 9000);
  var dt = new Date();
  var otp_expiry =  dt.setMinutes( dt.getMinutes() + 10 );

  // Create a Userss
  const userVal = {
    mobile_no: req.body.mobile_no,
    email: req.body.email,
    password: req.body.password,
    status: req.body.status,
	  current_subscription: req.body.current_subscription,
	  otp: otp,
	  otp_expiry: otp_expiry,
	  otp_verified: (req.body.otp_verified && req.body.otp_verified !== undefined && req.body.otp_verified != null && req.body.otp_verified != '') ? req.body.otp_verified : false,
    registration_type: req.body.registration_type ? req.body.registration_type : "Web",
    device_registration_id: req.body.device_registration_id ? req.body.device_registration_id : "",
    mac_id: req.ip ? req.ip : "",
  };

  // Save users in the database
  User.create(userVal)
    .then((data) => {
		return res.status(200).send({
		  message: "User created successfully",
		});
	}).catch((err) => {
	  return res.status(200).send({
		message:
		  //err.errors[0]["message"] ||
		  "Some error occurred while creating the " + data.user_type,
	  });
	});
};


// Update a users by the id in the request
exports.resendCode = (req, res) => {
  const id = req.params.id;
  var otp =  Math.floor(1000 + Math.random() * 9000);
  var dt = new Date();
  var otp_expiry =  dt.setMinutes( dt.getMinutes() + 10 );
  let jsonObject = {
	  otp: otp,
	  otp_expiry: otp_expiry
  };

  User.findOne({
    where: { id: id },
  })
    .then((data) => {
  User.update(jsonObject, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
	// SEND MAIL
	let msg = {
		to: data.email,
		from: 'developer@cloud9telehealth.com',
		subject: 'BackupGuru Notification: OTP Resent',
		html: 'Dear User,<br /><br /> Please find the new OTP requested. Verify your account using OTP - <strong>'+otp+'</strong>.<br /><br />Note: The OTP will be expired in 10 minutes.<br /><br /> Regards,<br />Team BackupGuru',
	};

		sgMail
          .send(msg)
          .then(() => {
                res.send({'message': 'Mail Sent'})
        }).catch((error) => {
                console.log(error.response.body.errors);
                res.send({'message': 'Mail Error !!'});
        });
	// SEND MAIL
        return res.send({
          message: "New OTP code sent",
	  data: jsonObject
        });
      } else {
        return res.send({
          message: `Cannot update users with id=${id}. Maybe Users was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      return res.status(200).send({
        message: "User not found",
      });
    });
    })
    .catch((err) => {
      return res.status(200).send({
        message: "User not found",
      });
    });
};

// Retrieve all users from the Userss.
exports.findAll = (req, res, next) => {

  User.findAll({})
    .then((data) => {
      res.status(200).send({
		data: data,
        message: "User details fetched successfully.",
      });
    })
    .catch((err) => {
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving user.",
      });
    });
};

// Retrieve all Users Count
exports.getUserCount = (req, res) => {

  User.count()
    .then(function (count) {
      res.send({ data: count });
    })
    .catch((err) => {
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving " + user_type,
      });
    });
};

// Find a single users with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(200).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a users by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update users with id=${id}. Maybe Users was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(200).send({
        message: "Error updating Users with id=" + id,
      });
    });
};

// Update a users by the id in the request
exports.updatePassword = (req, res) => {
  const id = req.params.id;
  const pwd = encryption.encryptData(req.body.password);
  let pwdVal = {
	  password: req.body.newpassword,
  };

  User.findAll({
    where: { id: id, password: pwd }
  })
    .then((data) => {
		if(data.length) {
		  User.update(pwdVal, {
			where: { id: id },
		  })
			.then((num) => {
			  if (num == 1) {
				res.send({
				  message: "Password updated successfully",
				});
			  } else {
				res.send({
				  message: `Cannot update password with id=${id}. Maybe User was not found or req.body is empty!`,
				});
			  }
			})
			.catch((err) => {
			  res.status(200).send({
				message: "Error updating Password with id=" + id,
			  });
			});
		} else {
			res.send({
			  message: `Incorrect current password`,
			});
		}
    })
    .catch((err) => {
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving Patients.",
      });
    });
};

// Delete a users with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(200).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Create a Login
exports.login = (req, res) => {
  // Create a Doctor
  const loginVal = {
    email: encryption.encryptData(req.body.email),
    password: encryption.encryptData(req.body.password),
    user_type: encryption.encryptData(req.body.role),
  };

  passport.authenticate("local", function (err, user, info) {
    if (err) {
      loginOutput = {
        notification: {
          message: info,
          code: "404",
          type: "Failure",
          is_auth: false,
          hint: "User record not found",
        },
        data: {},
      };
      // return next(err);
      return res.send(loginOutput);
    }
    req.logIn(user, function (err) {

      if (err) {
        loginOutput = {
          notification: {
            message: info,
            code: "404",
            type: "Failure",
            is_auth: false,
            hint: "User record not found",
          },
          data: {},
        };
        // return next(err);
        return res.send(loginOutput);
      } else {
        var userobj = {};
        userobj.email = user.email;
        userobj.id = user.id;
        userobj.mobile_no = user.mobile_no;
        
        var token = jwt.sign(userobj, dbConfig.SECRET);

        var condition = null;

        User.findAll({ where: { id: user.id } }).then((userData) => {
          loginOutput = {
            notification: {
              message: "Success",
              code: "200",
              type: "Success",
              is_auth: true,
              hint: "Response Sent",
            },
            data: {
<<<<<<< .mine
              first_name: user.first_name !== "" && user.first_name != null ? user.first_name : "", 
			        last_name: user.last_name !== "" && user.last_name != null ? user.last_name : "",
||||||| .r14
              first_name: user.first_name !== "" && user.first_name != null ? user.first_name : "", 
			  last_name: user.last_name !== "" && user.last_name != null ? user.last_name : "",
=======
              user_name: user.user_name !== "" && user.user_name != null ? user.user_name : "",
>>>>>>> .r15
              mobile_no: user.mobile_no !== "" && user.mobile_no != null ? user.mobile_no : "",
              mainId: user.id,
              user_name: user.user_name,
              email: user.email,
              userID: user.id,
              accessToken: token,
              userType : user.user_type
            },
          };
        
          if (user.user_type == "doctor") {
            Doctor.update({is_available: true}, {
            where: { id: user.id }
            })
            .then(num => {
              if (num == 1) {
              // SUCCESS - NO ACTION
              }
            })
          } 
              session.user_id = user.id;
              session.user_type = user.user_type;
              if (user.user_type == "admin") {
                session.user_name = "Admin";
              } else {
                session.user_name = user.user_name.charAt(0).toUpperCase() + user.user_name.slice(1);
              }

				if(req.body.fcm_token != "") {
					User.update({fcm_token: req.body.fcm_token}, {
						where: { id: user.id }
					})
					.then(num => {
						  return res.send(loginOutput);
					})
				}

            });
          }
        });
      })(req, res);
};

// Logging Out
exports.logout = (req, res) => {

	if (req.body.user_type == "doctor") {
		  Doctor.update({is_available: false}, {
			where: { id: req.body.doctor_id }
		  })
		  .then(num => {
			if (num == 1) {
			  res.send({"message": "Logout successful"});
			}
		  })
    }
    
  
    res.send({"message": "Logout successful"});

};

// Forget Password
exports.forgetPassword = (req, res) => {
  // Create a Doctor
  const loginVal = {
    email: encryption.encryptData(req.body.email),
  };
  var randonmnumber =  Math.floor(1000 + Math.random() * 9000);
  var dt = new Date();
  var newtime =  dt.setMinutes( dt.getMinutes() + 10 );
  User.findAll({ where: loginVal })
    .then((userData) => {
      if (userData.length) {
      var updateotp = {
         otp: randonmnumber,
         otp_expiry :newtime
      }
      User.update(updateotp, {
        where: {id: userData[0].dataValues.id},
       }).then((num) => {
          if(num == 1) {
             User.findAll({ where: {id: userData[0].dataValues.id} }) .then((userData1) => {
            if (userData1.length) {
              // SEND MAIL
              const msg = {
                to: req.body.email,
                from: 'developer@cloud9telehealth.com',
                subject: 'BackupGuru Notification: Password reset mail',
                html: 'Dear User,<br /><br />Please reset the password using OTP - <strong>'+userData1[0].dataValues.otp+'</strong><br /><br /> Regards,<br />Team BackupGuru',
              };
        sgMail
          .send(msg)
          .then(() => {
                res.send({'message': 'Mail Sent'})
        }).catch((error) => {
                console.log(error.response.body.errors);
                res.send({'message': 'Mail Error !!'});
        });
	     // SEND MAIL
             loginOutput = {
                notification: {
                  message: "Success",
                  code: "200",
                  type: "Success",
                  is_auth: true,
                  hint: "Response Sent",
                },
                data: {
                  email: userData1[0].email,
                  userID: userData1[0].id,
                  otp: userData1[0].dataValues.otp,
                  otpexpiry: new Date(userData1[0].dataValues.otp_expiry).toString('YYYY-MM-dd'),
                },
              };
              res.send(loginOutput);
            } else {
              loginOutput = {
                notification: {
                  message: "Failure",
                  code: "404",
                  type: "Failure",
                  is_auth: false,
                  hint: "User record not found",
                },
                data: {},
              };
              res.send(loginOutput);
            }
          })
          }
        }) .catch((err) => {
          console.log(err)
          res.status(200).send({
            message:
              err.message ||
              "Some error occurred while retrieving user information.",
          });
        });
      }  
    })
    .catch((err) => {
      res.status(200).send({
        message:
          err.message ||
          "Some error occurred while retrieving user information.",
      });
    });
};

// Update a users and doctor data by the id in the request
updateuserotp = (req, res) => {

  const id = req.params.id;

  var userData = {
    email: req.body.data.email_id,
    mobile_no: req.body.data.phone,
    password: req.body.data.password_main,
  };

  User.update(userData, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update users with id=${id}. Maybe Users was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log(err.errors[0]["message"]);
      res.status(200).send({
        message: "Error updating Users with id=" + id,
      });
    });
};
// Forget Password
exports.forgetUsername = (req, res) => {
  // Create a Doctor
  const loginVal = {
    mobile_no: encryption.encryptData(req.body.mobile_no),
  };

  User.findAll({ where: loginVal })
    .then((userData) => {
      if (userData.length) {
        loginOutput = {
          notification: {
            message: "Success",
            code: "200",
            type: "Success",
            is_auth: true,
            hint: "Response Sent",
          },
          data: {
            email: userData[0].email,
            userID: userData[0].id,
            otp: "5555",
          },
        };

        res.send(loginOutput);
      } else {
        loginOutput = {
          notification: {
            message: "Failure",
            code: "404",
            type: "Failure",
            is_auth: false,
            hint: "User record not found",
          },
          data: {},
        };
        res.send(loginOutput);
      }
    })
    .catch((err) => {
      res.status(200).send({
        message:
          err.message ||
          "Some error occurred while retrieving user information.",
      });
    });
};

exports.uploadimage = (req,res) =>{
  console.log("69")
  base64Img.img(req.body.base64,'./public/images', Date.now(),function(err,filepath){
  const pathArr = filepath.split('/');
  const fileName = pathArr[pathArr.length -1];
  console.log(pathArr+"------"+fileName)
 })
};

exports.updatestatus = (req,res) =>{
  const id = req.params.id;
  const status = req.params.status;
  if(status == 'true') {
    var updatedvalue = false;
  } else {
    var updatedvalue = true;
  }
  var statusdata = { status: updatedvalue };
  var options = { where: { id: id } };

  User.update(statusdata, options).then((data) => {
    res.send({'message': 'Status updated successfully'});
  })
}

exports.updateUserPassword = (req,res) =>{
  const id = req.params.id;

  var statusdata = { password: req.body.password };
  var options = { where: { id: id } };
  
  User.update(statusdata, options).then((data) => {
    res.send({message: 'Password updated successfully'});
  })
}

exports.uploadImages = (req, res) => {
  const id = req.params.id;
  const type = req.params.type;
  const FILE_PATH = "./public/uploads/" + type;

  if(req.body.base64 !='' && req.body.base64 !== undefined) {
   base64Img.img(req.body.base64, FILE_PATH, Date.now(), function(err,filepath){
	const pathArr = filepath.split('/');
	const fileName = pathArr[pathArr.length -1];
	var filename =   fileName.replace(/[^\d,]/g, '');
	var newfile = filename+'.jpeg';
	var pathext =filepath.split('.')
 
    var oldfile = filename+'.'+pathext[1];
    
    fs.renameSync("./public/uploads/"+type+"/"+oldfile, "./public/uploads/"+type+"/"+newfile); 
    var imageData =  "/uploads/" + type+"/"+filename+'.jpeg';    
    
    if (req.params.type == "patient") {
      var imgobjData = { profile_pic: imageData };
      userTypeController = Patient;
      var options = { where: { id: id } };
    }
    if (req.params.type == "doctor") {
      var imgobjData = { profile_pic: imageData };
      userTypeController = Doctor;
      var options = { where: { id: id } };
    }
    if (req.params.type == "responder") {
      var imgobjData = { profile_pic: imageData };
      userTypeController = Responder;
      var options = { where: { id: id } };
    }
    if (req.params.type == "facility") {
      var imgobjData = { profile_pic: imageData };
      userTypeController = Facility;
      var options = { where: { id: id } };
    }

    if (req.params.type == "pharmacy") {
      var imgobjData = { profile_pic: imageData };
      userTypeController = Pharmacy;
      var options = { where: { id: id } };
    }

    userTypeController.update(imgobjData, options).then((data) => {
      const auditTrailVal = {
        'user_id' : (session.user_id) ? session.user_id : 0,
        'trail_type' : req.params.type+" Image Update",
        'trail_message' : ((session.user_name) ? session.user_name : 'Someone') +' has updated ' + req.params.type + ' image with '+session.user_name+' id = '+data.id,
        'status': 1
      }
      AuditTrail.create(auditTrailVal,(err,data)=>{
           if(err){
             console.log(err)
           }else{
             console.log("created")
           }
       })

     return res.status(200).send({'message': "Image uploaded successfully"});
    });
   })
} else {
  const upload = multer({
    dest: `${FILE_PATH}/`,
    limits: {
      fileSize: 10 * 1024 * 1024
	},
   // limits: { fileSize: 1000000 },
   }).single("myImage");

  upload(req, res, (err) => {

    if (req.file != undefined) {
		var imageData =  "/uploads/" + type+"/"+req.file.filename+'.jpeg';               //fs.readFileSync(req.file.path);
		if (req.file.mimetype == "image/jpg" || req.file.mimetype == "image/png" || req.file.mimetype == "image/jpeg" || req.file.mimetype == "image/gif") {
			var newfile = req.file.filename+'.jpeg';
		}
	  var oldfile = req.file.filename;
	  fs.renameSync("./public/uploads/"+type+"/"+oldfile, "./public/uploads/"+type+"/"+newfile); 
    } else {
      imageData = "";
    }
    if (req.params.type == "patient") {
      var imgobjData = { profile_pic: imageData };
      userTypeController = Patient;
      var options = { where: { user_id: id } };
    }
    if (req.params.type == "Genderimages") {
      var imgobjData = { category_image: imageData };
      userTypeController = Category;
      var options = { where: { id: id } };
    }
    if (req.params.type == "doctor") {
      var imgobjData = { profile_pic: imageData };
      userTypeController = Doctor;
      var options = { where: { user_id: id } };
    }
    if (req.params.type == "responder") {
      var imgobjData = { profile_pic: imageData };
      userTypeController = Responder;
      var options = { where: { user_id: id } };
    }
    if (req.params.type == "facility") {
      var imgobjData = { profile_pic: imageData };
      userTypeController = Facility;
      var options = { where: { id: id } };
    }
    if (req.params.type == "pharmacy") {
      var imgobjData = { profile_pic: imageData };
      userTypeController = Pharmacy;
      var options = { where: { id: id } };
      console.log(id)
    }
    
    
    userTypeController.update(imgobjData, options).then((data) => {
      //users_image.create(data)

      return res.send(200).end();
    });
    // 	/*Now do where ever you want to do*/
  });

}

};

exports.uploadFiles = (req, res) => {
  const id = req.params.id;
  const type = req.params.type;
 // console.log(type)
  if(type == "PatientConsent" || type == "PatientToc")
  {
    var file_upload_type = "patient"
  }
  if(type == "DoctorToc")
  {
    var file_upload_type = "doctor"
  }
  if(type == "ResponderToc")
  {
    var file_upload_type = "responder"
  }


  const FILE_PATH = "./public/uploads/" + file_upload_type;

  var storage = multer.diskStorage({
            destination: function (req, file, callback) {
              callback(null, FILE_PATH);
            },
            filename: function (req, file, callback) {
              callback(null, file.fieldname + '-' + Date.now());
            }
          });
          

  const upload = multer({
    dest: `${FILE_PATH}/`,
    storage : storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "application/pdf") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .pdf format allowed!'));
      }
  } ,
    limits: {
      fileSize: 10 * 1024 * 1024
	},
   // limits: { fileSize: 1000000 },
   }).single("myImage");

  upload(req, res, (err) => {

    if(err) {
       return res.status(201).send("Error uploading file."+err);
    } else {
        var mimetype = path.extname(req.file.originalname);              //fs.readFileSync(req.file.path);
      //if(mimetype == '.pdf') {
      var newfile = (type == "PatientConsent")?"2.pdf":"1.pdf";
      var oldfile = req.file.filename;
      fs.renameSync("./public/uploads/"+file_upload_type+"/"+oldfile, "./public/uploads/"+file_upload_type+"/"+newfile); 
      return res.status(200).send({'message': "file uploaded successfully"});      
  }
    // 	/*Now do where ever you want to do*/
  });


};

exports.checkOTP = (req, res) =>{
  let user_id = req.params.id;
  let otp = req.body.otp
  User.findAll({ where: { id: user_id ,otp:otp } ,attributes:['otp_expiry'] }).then((userDataresp) => {
      var dt = new Date();
     if(userDataresp.length > 0){
        var dt1 = userDataresp[0].otp_expiry;
        if(dt1.getTime() > dt.getTime()){
		  User.update({otp_verified: 1}, { where: { id: user_id } });
          res.send({"message": "OTP Verified"})
        } else {
          res.send({"message": "OTP Expired"})
        }
      } else {
        res.status(200).send({"message": 'OTP Mismatch'})
      }
  })
}
