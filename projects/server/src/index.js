require("dotenv/config");
const db = require('../models')
const express = require("express");
const cors = require("cors");
const { join } = require("path");

const {userRouters, adminRouters, warehouseRouter, authRouters, authRouter, userRouter, addressRouter, rajaongkirRouter, productRouter, stockRouter, categoryRouter, cartRouter} = require('../routers')

const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  cors(
  //   {
  //   origin: [
  //     process.env.WHITELISTED_DOMAIN &&
  //       process.env.WHITELISTED_DOMAIN.split(","),
  //   ],
  // }
  )
);

app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/address', addressRouter);
app.use('/api/location', rajaongkirRouter); //---Perbaiki 
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter)
app.use('/api/user/',userRouters)
app.use('/api/admin/',adminRouters)
app.use('/api/warehouse/',warehouseRouter)
app.use('/api/auth/',authRouters)
app.use("/api/stock", stockRouter)
app.use("/api/cart", cartRouter)

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
        // db.sequelize.sync({alter:true})
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});