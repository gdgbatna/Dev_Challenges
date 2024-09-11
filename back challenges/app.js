require("dotenv").config();
require("express-async-errors");

// express
const express = require("express");
const app = express();

// rest of packages
const cookieParser = require("cookie-parser"); // access to cookies
// dev
const morgan = require("morgan");
// Security
const rateLimiter = require("express-rate-limit")
const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")
const mongoSanitize = require("express-mongo-sanitize")
// DB
const connectDB = require("./db/connect");
// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// routers
const AuthRouter = require("./routes/authRoutes");
const UserRouter = require("./routes/userRoutes");

// dev
app.use(morgan("tiny"));
app.use(express.json()); // have acces to json data in req.body
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet())
app.use(xss())
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(mongoSanitize())
// app.use(rateLimiter({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100
// }))


// app.use /api routes
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", UserRouter);


// middleware errors and not-found
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
