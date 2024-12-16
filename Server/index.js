const express = require("express");
const app = express();
require('dotenv').config();
require('./Modal/dbConnection');

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');

app.use(cors());

const router = require('./Route/routes');
app.use('/new-feedback', router);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
