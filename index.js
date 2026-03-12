const express = require("express");
require("dotenv").config();
const app = express();
const storeRoutes = require('./src/routes/storeRoute');
const userRoutes = require('./src/routes/userRoute');
const itemRoutes = require('./src/routes/itemRoute');
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/store', storeRoutes);
app.use('/user', userRoutes);
app.use('/item', itemRoutes);

app.get('/', (res) => {
  res.send("API running");
});

app.listen(port);