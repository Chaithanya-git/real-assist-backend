const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const app = express();
const port = process.env.PORT || 5000;

app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});
// app.use(
//   cors({
//     origin:
//       "https://6526c872e6c14008ed1102c1--leafy-sunshine-584f60.netlify.app",
//   })
// );

app.use("/", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
