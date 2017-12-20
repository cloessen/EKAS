// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.toggle = functions.https.onRequest((req, res) => {
  let rfid = req.query.rfid;
  const db = admin.firestore();
  const kameradenRef = db.collection('Kameraden');
  const docRef = kameradenRef.doc(rfid).get();
    return docRef.then((doc) => {
      const toggle = doc.data().anwesend;
      return doc.ref.set({anwesend: !toggle}, {merge: true});
    })
      .then(() => res.sendStatus(200))
      .catch((err) => res.send(`No Entry found with rfid: ${rfid}`));
});
