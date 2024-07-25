import { Router } from "express";
import * as controller from "../../controllers/users.controllers.js";
import passport from "passport";
import upload from "../../utils/multer.js";
import validateFiles from "../../middleware/validateFile.js"
const routerUser = Router();

routerUser.post('/register', controller.register);

routerUser.post("/login", controller.login);

routerUser.get("/logOutRegister", controller.logOutRegister);

routerUser.post('/request-password-change', controller.requestPasswordChange);

routerUser.post('/forgot-password', controller.forgotPassword);

routerUser.get("/profile", passport.authenticate("jwt", { session: false, failureRedirect: "/login" }), controller.profile);

routerUser.get("/logout", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), controller.logOut);

routerUser.post('/change-password', passport.authenticate("jwt", { session: false, failureRedirect: "/login" }), controller.changePassword);

routerUser.post('/premium/uploaduser', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), (req, res, next) => { next(); }, 
    upload.fields([
        { name: 'profile' },
        { name: 'serviceBill' },
        { name: 'product' }
    ]), 
    validateFiles,
    controller.uploadDocuments
);

routerUser.get('/admin/controlclient', passport.authenticate('jwt-admin', { session: false, failureRedirect: "/login" }), controller.getAllUserAdmin);


routerUser.delete('/admin/controlclient/delete/:userId',passport.authenticate('jwt-admin', { session: false, failureRedirect: "/login" }), controller.deleteUserAdmin);

export default routerUser;
