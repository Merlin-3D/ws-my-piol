const admin = require('firebase-admin')

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert("./gallery-a789e-firebase-adminsdk-mwkzy-0edae927c0.json"),
  storageBucket:"gs://gallery-a789e.appspot.com"
})

// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  bucket
}