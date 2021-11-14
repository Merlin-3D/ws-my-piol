const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const firebase = require('../firebase/firebase.storage');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
})
let uuid = uuidv4();



const uplaodSingle = (req, res, next) =>
  new Promise((resolve, reject) => {
    let name = `user_${Date.now()}_` + req.userId
    const blob = firebase.bucket.file(`my-piol/profil/${req.userId}/` + name)
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })

    blobWriter.on('error', (err) => reject(err)); // <==== REJECT so you can catch the error later
    blobWriter.on('finish', () => {
      const publicUrl = "https://firebasestorage.googleapis.com/v0/b/gallery-a789e.appspot.com/o/" + 'my-piol%2Fprofil%2F' + req.userId + '%2F' + name + "?alt=media&token=" + uuid;
      resolve(`{${publicUrl} }`) // <== RESOLVE so you can await for it or use .then
    });

    blobWriter.write(req.file.buffer);
    blobWriter.end();
  });

const uploadMultiple = (req, res, next) => 
new Promise((resolve, reject) => {
  let array = [];
  let i = 0
  req.files.forEach((fil) => {
    let name = `user_${Date.now()}_` + req.userId
    const blob = firebase.bucket.file(`my-piol/propertys/${req.userId}/` + name)
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: fil.mimetype
      }
    })
    blobWriter.on('error', (err) => reject(err)); 
    blobWriter.on('finish', () => {
      const publicUrl = "https://firebasestorage.googleapis.com/v0/b/gallery-a789e.appspot.com/o/" + 'my-piol%2Fpropertys%2F' + req.userId + '%2F' + name + "?alt=media&token=" + uuid;
      array.push(publicUrl)
      i++
      if(i==req.files.length){
        resolve(array)
      }

    });
  
    blobWriter.write(fil.buffer);
    blobWriter.end();
  });
  
});


module.exports = {
  upload,
  uplaodSingle,
  uploadMultiple
};