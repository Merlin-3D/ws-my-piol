const mongoose = require('mongoose');
const init = require("../utils/initial.role");
const uri = require("../utils/db.config");

mongoose.connect(uri.LOCALE, {
//useCreatendex: true, 
   //useFindAndModify: false, 
   useNewUrlParser: true, 
   useUnifiedTopology: true 
})
.then(()=>{
    console.log('Connexion à MongoDB réussie !')
    init()
})
.catch((err) => console.log(`${err}`));

