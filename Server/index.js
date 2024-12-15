const express = require("express");
const app = express();
const sequelize = require('./Modal/dbConnection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');

app.use(cors());

const router = require('./Route/routes');
app.use('/new-feedback', router);


(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        await sequelize.sync({ force: true }); // This will create the table if it doesn't exist (use { force: true } to drop and recreate the table)
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server connected Secussesfully on port ${PORT}`);
});