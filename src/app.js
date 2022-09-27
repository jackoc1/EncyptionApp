const express = require('express');
const encryptRouter = require('./routers/encrypt');
const signatureRouter = require('./routers/signature');

const app = express();

app.use(express.json());
app.use(encryptRouter);
app.use(signatureRouter);

module.exports = app;