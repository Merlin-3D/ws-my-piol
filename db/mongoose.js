const mongoose = require('mongoose');
const init = require("../utils/initial.role");

mongoose.connect("mongodb+srv://ws-my-piol:merlin3d@cluster0.v8qsv.mongodb.net/my-piol-db-prod?retryWrites=true&w=majority", {
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

