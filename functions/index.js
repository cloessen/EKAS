// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');


// Add CORS to your index.js
const cors = require('cors')({origin: true});


// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.createUserAccout = functions.auth.user().onCreate((user, context) => {

  const uid = user.uid;
  const email = user.email;
  const data = {
    email: email,
    uid: uid,
    isAdmin: false
  };

  const usersRef = db.collection('Users');
  return usersRef.doc(uid).set(data)
    .then(() => {
      console.log(`User with email: ${email} created.`);
    })
    .catch(err => {
      console.log(`Something went wrong! Error ${err.message}`)
    })
});

exports.toggle = functions.https.onRequest((req, res) => {

  // Automatically allow cross-origin requests
  return cors(req, res, () => {
    let rfid = req.query.rfid;
    const kameradenRef = db.collection('Kameraden');
    const kameradDoc = kameradenRef.doc(rfid).get();
    return kameradDoc.then((doc) => {
      const toggle = doc.data().anwesend;
      return doc.ref.set({anwesend: !toggle}, {merge: true});
    })
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(404));
  });
});
