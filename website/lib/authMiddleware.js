"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFirebaseIdToken = void 0;
const admin = require("firebase-admin");
const validateFirebaseIdToken = async (req, res, next) => {
    console.log("Check if request is authorized with Firebase ID token");
    if ((!req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer ")) &&
        !(req.cookies && req.cookies.__session)) {
        console.error(
        // eslint-disable-next-line max-len
        "No Firebase ID token was passed as a Bearer token in the Authorization header.", 
        // eslint-disable-next-line max-len
        "Make sure you authorize your request by providing the following HTTP header:", "Authorization: Bearer <Firebase ID Token>", "or by passing a '__session' cookie.");
        res.status(403).send("Unauthorized");
        return;
    }
    let idToken;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")) {
        console.log("Found 'Authorization' header");
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split("Bearer ")[1];
    }
    else if (req.cookies) {
        console.log("Found '__session' cookie");
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    }
    else {
        // No cookie
        res.status(403).send("Unauthorized");
        return;
    }
    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log("ID Token correctly decoded", decodedIdToken);
        // req.user = decodedIdToken
        next();
        return;
    }
    catch (error) {
        console.error("Error while verifying Firebase ID token:", error);
        res.status(403).send("Unauthorized");
        return;
    }
};
exports.validateFirebaseIdToken = validateFirebaseIdToken;
//# sourceMappingURL=authMiddleware.js.map