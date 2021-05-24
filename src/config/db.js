const assert = require('assert');
const mongoose = require('mongoose');
const config = require('./config');


module.exports.initDb=()=>{

    mongoose.connect(`mongodb+srv://${config.db.user}:${config.db.password}@cluster0.gpr3e.mongodb.net/${config.db.dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
).then(()=> console.log('DB initialized and connected'))
.catch(e=>console.warn('Trying to init DB agin!'));

}

/*const getDb=()=>{
    if (!_db){
        console.log('Db has not been initialized. Please called init first.')
    };
    return _db;
}*/

