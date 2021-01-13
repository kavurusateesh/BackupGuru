var encryption = require("../helpers/Encryption");
const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const masterSubModuleClinicPage = db.master_sub_module_clinic_pages_tbl;

var createPageOrder = function (encryptedPageName,DecryptedPageName) {


  let pageOrderArray = [];
  masterSubModuleClinicPage
    .findAll({
      where: {
        page_name: {
          [Op.notIn]: [encryptedPageName],
        },
        status: 1,
      },
      order: [["sequence_id", "ASC"]],
      attributes: ["page_name", "clinic_id", "sequence_id", "id"],
      raw: true,
    })
    .then((items) => {
      let prevArray = [];
      let nextArray = [];

      items.forEach(function (arrayItem, index) {
        arrayItem["sequenceIndex"] = index + 1;
        arrayItem["page_name"] = encryption.decryptData(arrayItem.page_name);
      });
      
      let previousPage = "";
      let nextPage = "";
      
      items.forEach(function (arrayItem, index) {
        if (arrayItem.page_name === DecryptedPageName ) {
          let sequenceIndex = arrayItem.sequenceIndex;
          let getPreviousSequenceId = sequenceIndex - 1;
          let getNextSequenceId = sequenceIndex + 1;

          console.log("sequenceIndex " + arrayItem.sequenceIndex);
          console.log("getPreviousSequenceId " + getPreviousSequenceId);
          console.log("getNextSequenceId " + getNextSequenceId);

          if (getPreviousSequenceId) {
            console.log('Inside getPreviousSequenceId');
            previousPage = items.filter(function (obj) {
              if (obj.sequenceIndex == getPreviousSequenceId) {
                return obj;
              }
            })[0];
          }

          if (getNextSequenceId) {
            console.log('Inside getNextSequenceId');
            nextPage = items.filter(function (obj) {
              if (obj.sequenceIndex == getNextSequenceId) {
                return obj;
              }
            })[0];
          }
          pageOrderArray.push(previousPage); 
          pageOrderArray.push(nextPage); 
        }
      });
    });
};

module.exports.createPageOrder = createPageOrder;
