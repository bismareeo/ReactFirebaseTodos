const functions = require('firebase-functions');
const admin = require('firebase-admin');
// admin.initializeApp();
var serviceAccount = require("./dev_credentials.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://myfirstproject-13415.firebaseio.com/"
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addMessage = functions.https.onRequest(async (req, res) => {
  //   // const original = req.query.text;
  //   const result = [];
  const snapshot = await admin.database().ref('/comments');
  //   // res.redirect(303, snapshot.ref.toString() );
  res.send('Hello from FIrebase')
})


exports.getUsers = functions.https.onRequest(async (req, res) => {
  console.log('hola');
  const listusers = [];
  return admin.database().ref('comments').once("value", snapshot => {
    console.log('jaja')
    snapshot.forEach(element => {
      element.forEach(value => {
        listusers.push(value)
      })
    });
    res.status(200).send(listusers)
  });
});

exports.listenTodos = functions.database.ref('todos').onWrite((snapshot, context) => {
  const email = context.auth.token.email;
  const result = snapshot.after.val();
  let lastValue = {};
  for (const prop in result) {
    lastValue = {id: prop, value: result[prop]}
  }
  admin.database().ref('replicateTodos').child(lastValue.id).set({description: lastValue.value.description , status: lastValue.value.status , title: lastValue.value.title, email: email })
})

exports.updatingTodos = functions.database.ref('todos').onUpdate((snapshot, context) => {
  console.log('snapshot', snapshot)
  console.log('context', context)

   
})

exports.deletingTodos = functions.database.ref('todos').onDelete((snapshot, context) => {
  console.log('deleting', snapshot)
  console.log('deleting', context)

  const email = context.auth.token.email;
  const result = snapshot.after.val();
  let lastValue = {};
  for (const prop in result) {
    lastValue = {id: prop, value: result[prop]}
  }
  admin.database().ref('replicateTodos').child(lastValue.id).set({description: lastValue.value.description , status: lastValue.value.status , title: lastValue.value.title, email: email })
})
// exports.myFunction = functions.firestore.document('comments').onWrite((change, context) => {
//   console.log('calling me')
// })