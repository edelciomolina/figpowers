import * as dotenv from "dotenv"
dotenv.config({ path: __dirname + "/../credentials.env" })

import * as functions from "firebase-functions"
import * as express from "express"
import * as cors from "cors"
import * as admin from "firebase-admin"
import axios from "axios"

admin.initializeApp()

import { Request, Response } from "express"
import { validateFirebaseIdToken } from "./authMiddleware"
import { IUsers } from "./interfaces"

const apiRouter = express.Router() // eslint-disable-line
const app = express()
app.use(cors({ origin: true }))
app.use("/api", apiRouter)

const sendToServer = async (method: string, url: string, body: object) => {
  const config = {
    method,
    maxBodyLength: Infinity,
    timeout: 5000,
    url,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(body),
  }

  return await axios
    .request(config)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error.response.data.error
    })
}

// INFO Endpoints NÃO seguros --------------------------------------------------

apiRouter.get("/health", async (req: Request, res: Response) => {
  const userData = { state: true }
  res.status(200).send(JSON.stringify(userData))
})

apiRouter.post("/auth", async (req: Request, res: Response) => {
  const firebaseKey = process.env.FIREBASE_API
  const firebaseLogin = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseKey}`

  const bodyLogin = {
    email: req.body.email,
    password: req.body.access_token,
    returnSecureToken: true,
  }

  const result = await sendToServer("POST", firebaseLogin, bodyLogin)
  res.status(200).send(JSON.stringify(result))
})

// INFO Endpoints seguros --------------------------------------------------

apiRouter.use(validateFirebaseIdToken)
apiRouter.get("/", async (req: Request, res: Response) => {
  // const snapshot = await admin.firestore().collection("users").get()

  // const users: Array<IUsers> = []
  // snapshot.forEach((doc) => {
  //   const id = doc.id
  //   const data = doc.data()

  //   users.push({ id, ...data })
  // })

  const users: Array<IUsers> = [{ id: "1", data: { name: "molina" } }]

  res.status(200).send(JSON.stringify(users))
})

apiRouter.get("/user/:id", async (req: Request, res: Response) => {
  // const snapshot = await admin
  //   .firestore()
  //   .collection("users")
  //   .doc(req.params.id)
  //   .get()

  // const userId = snapshot.id
  // const userData = snapshot.data()
  const userId = 22222
  const userData = { name: "edelcio" }

  res.status(200).send(JSON.stringify({ id: userId, ...userData }))
})

apiRouter.post("/", async (req: Request, res: Response) => {
  // const user = req.body

  //  await admin.firestore().collection("users").add(user)

  res.status(201).send()
})

apiRouter.put("/user/:id", async (req: Request, res: Response) => {
  // const body = req.body

  // await admin.firestore().collection("users").doc(req.params.id).update(body)

  res.status(200).send()
})

apiRouter.delete("/user/:id", async (req: Request, res: Response) => {
  // await admin.firestore().collection("users").doc(req.params.id).delete()

  res.status(200).send()
})

exports.api = functions.https.onRequest(app)
