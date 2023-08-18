
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require('cors')({ origin: true });
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

const admin = initializeApp({ projectId: 'geeks-final-project' });
const auth = getAuth(admin);
const firestore = getFirestore(admin);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((req, res) => {
  cors(req, res, () => {
    logger.info("Hello logs!", { structuredData: true });
    res.send("Hello from Firebase!");
  })
});

exports.getUsers = onRequest((req, res) => {
  cors(req, res, async () => {

    const users = await auth.listUsers();
    console.log(users);

    res.send(users);
  })
})

exports.signUpOrSigninUser = onRequest((req, res) => {
  cors(req, res, async () => {

    const { email } = req.body;

    console.log(email);

    const response = {
      msg: '',
      data: {},
      status: 200
    };

    if (!email) {

      response.msg = 'No email passed';
      response.status = 500;
    }

    if (email) {
      try {
        const documentSnapshot = await firestore.collection("user").doc(email).get();

        const data = documentSnapshot.data();

        // if user signing up they don't exist in database yet
        if (!data) {

          console.log('registering user...')
          const user = {
            email,
            created_at: new Date().toISOString()
          }

          await firestore.collection("user").doc(email).set(user);

          response.data = user;
          response.msg = 'Successfully signed up user';
        }
        else {
          response.data = data;
          response.msg = 'Successfully signed in user'
        }

      }
      catch (e) {

        response.msg = "Error";
        response.status = 500;
      }
    }


    res.status(response.status).send(response);
  });
});

exports.addTodo = onRequest((req, res) => {
  cors(req, res, async () => {

    const { todo } = req.body;


    const response = {
      msg: '',
      data: {},
      status: 200
    };

    if (!todo) {

      response.msg = 'No todo passed';
      response.status = 500;
    }

    if (response.status === 200) {
      try {

        const id = firestore.collection('todos').doc().id;
        const firestoreTodo = { ...todo, id };
        await firestore.collection('todos').add(firestoreTodo);

        response.data = firestoreTodo;

      }
      catch (e) {

        response.msg = "Error";
        response.status = 500;
      }
    }


    res.status(response.status).send(response);
  });
});

exports.getTodos = onRequest((req, res) => {
  cors(req, res, async () => {

    const response = {
      msg: '',
      data: {},
      status: 200
    };

    try {

      const snapshot = await firestore.collection('todos').get();
      response.data = snapshot.docs.map((todo) => todo.data());

    }
    catch (e) {

      response.msg = e.message;
      response.status = 500;
    }


    res.status(response.status).send(response);
  });
});