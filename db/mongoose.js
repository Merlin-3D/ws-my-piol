const mongoose = require('mongoose');
const init = require("../utils/initial.role");
const uri = require("../utils/db.config");

mongoose.connect(uri.ONLINE_DEV, {

   useNewUrlParser: true, 
   useUnifiedTopology: true 
})
.then(()=>{
    console.log('Connexion à MongoDB réussie !')
    init()
})
.catch((err) => console.log(`${err}`));

