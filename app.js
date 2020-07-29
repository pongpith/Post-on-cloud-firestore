const admin = require("firebase-admin");
const express = require("express");
const app = express();

app.use(express.json());

const PORT = 5004;

const serviceAccount = require("./podx-test-firebase-adminsdk-ric0y-5ab307b4b6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://podx-test.firebaseio.com",
});
const db = admin.firestore();

app.post("/", (request, response) => {
  let res = {};
  if (request.query.id === `auto`) {
    res = db.collection(request.query.collection).doc().set(request.body);
  } else {
    res = db
      .collection(request.query.collection)
      .doc(request.query.id)
      .set(request.body);
  }
  return response.send(res);
});

app.listen(PORT, () => {
  console.log(`Listening on port: `, PORT);
});
