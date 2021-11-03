const mongoose = require('mongoose');
const init = require("../utils/initial.role");

mongoose.connect("mongodb://localhost:27017/ws-mypiol", {
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

