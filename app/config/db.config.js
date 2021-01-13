module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "med_backup_guru",
    //HOST: "medb2cdev.cohbsf0y9n0z.ap-south-1.rds.amazonaws.com",
    //USER: "medb2cd",
    //PASSWORD: "JXw#95!p",
    //DB: "cloud9_test",
    dialect: "mysql",
    SECRET: "CL0UD#9II",
	timezone: 'Asia/Kolkata',
  	timeOffset: 330,
    pool: {
      max: 15,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    encryptionKey:
      "NT9N9OuItINx6v8HTgBcuICZxoIpQQCUCHsjdrOAZerRLwrkDDAC1sGne6DBezv",
  };
  