if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializeMongoDB } = require("./db/db.connect");

const URI = process.env.MONGODB_URI;
const app = express();
app.use(cors());
app.use(bodyParser.json());
initializeMongoDB(URI);

const insert = require("./routes/insert.router");
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
const videoRouter = require("./routes/video.router");
const categoryRouter = require("./routes/category.router");
const undefinedRoutesHandler = require("./middlewares/undefinedRoutesHandler");
const errorHandler = require("./middlewares/errorHandler");

app.get("/", (_, res) => {
  res.send("Welcome to RabiTube server");
});

app.use("/insert", insert);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/categories", categoryRouter);
app.use(undefinedRoutesHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started ar port: ${PORT}`);
});
