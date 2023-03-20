"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
admin.initializeApp();
const authMiddleware_1 = require("./authMiddleware");
const app = express();
app.use(cors({ origin: true }));
app.use(authMiddleware_1.validateFirebaseIdToken);
// eslint-disable-next-line new-cap
const apiRouter = express.Router();
app.use("/api", apiRouter);
apiRouter.get("/", async (req, res) => {
    // const snapshot = await admin.firestore().collection("users").get()
    // const users: Array<IUsers> = []
    // snapshot.forEach((doc) => {
    //   const id = doc.id
    //   const data = doc.data()
    //   users.push({ id, ...data })
    // })
    const users = [{ id: "1", data: { name: "molina" } }];
    res.status(200).send(JSON.stringify(users));
});
apiRouter.get("/:id", async (req, res) => {
    // const snapshot = await admin
    //   .firestore()
    //   .collection("users")
    //   .doc(req.params.id)
    //   .get()
    // const userId = snapshot.id
    // const userData = snapshot.data()
    const userId = 22222;
    const userData = { name: "edelcio" };
    res.status(200).send(JSON.stringify(Object.assign({ id: userId }, userData)));
});
apiRouter.post("/", async (req, res) => {
    const user = req.body;
    //  await admin.firestore().collection("users").add(user)
    res.status(201).send();
});
apiRouter.put("/:id", async (req, res) => {
    const body = req.body;
    // await admin.firestore().collection("users").doc(req.params.id).update(body)
    res.status(200).send();
});
apiRouter.delete("/:id", async (req, res) => {
    // await admin.firestore().collection("users").doc(req.params.id).delete()
    res.status(200).send();
});
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
exports.app = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map