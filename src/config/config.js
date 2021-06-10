require('dotenv').config();

const config = {
    app: {
        port: process.env.PORT
    },
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dbname: process.env.DB_NAME
    },
    mail:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    }
    
};
module.exports=config;

