import http from "http";
import express from "express";
import compression from "express-compression";
import passport from "passport";
import cookieParser from "cookie-parser";
import "./mongoDb/connection/mongooseConnection.js";
import routes from "./routes/routes.js";
import initializePassport from "./config/passport.config.js";
import initializeSocketAdmin from "./socket/socket.io.js";
import exphbs from "express-handlebars";
import methodOverride from "method-override";
import handlingError from "./middleware/errros.js";
import addLogger from "./utils/logger.js";
import { setupSwagger } from './helpers/swagger/swagger.js';
import cors from "cors";
import configObject from './config/config.js';
import session from 'express-session';

const { port, pass_code } = configObject;
const PORT = port || 3000;
const app = express();

app.use(cors());
app.use(compression());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs.engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: {
    multiply
  },
}));
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.static('./src/public'));

app.use(cookieParser());
app.use(session({
  secret: pass_code,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

initializePassport();
app.use(addLogger);
app.use(routes);
app.use(handlingError);
setupSwagger(app);

const httpServer = http.createServer(app);
initializeSocketAdmin(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
