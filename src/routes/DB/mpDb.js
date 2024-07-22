import { Router } from "express";
const routerMP = Router();
import * as controller from "../../controllers/paymentMp.js"

// Ruta para crear preferencia en MercadoPago
routerMP.post('/create-preference', controller.createOrder);


export default routerMP;