// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.createUserAccout = functions.auth.user().onCreate(event => {
  const uid = event.data.uid;
  const email = event.data.email;
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
  let rfid = req.query.rfid;
  const kameradenRef = db.collection('Kameraden');
  const kameradDoc = kameradenRef.doc(rfid).get();
  return kameradDoc.then((doc) => {
    const toggle = doc.data().anwesend;
    return doc.ref.set({anwesend: !toggle}, {merge: true});
  })
    .then(() => res.sendStatus(200))
    .catch(() => res.send(`No Entry found with rfid: ${rfid}`));
});
