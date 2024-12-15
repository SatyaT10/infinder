const { DataTypes } = require('sequelize');
const sequelize = require('../Modal/dbConnection');



const formSchema = sequelize.define('mydb2', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    businessEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mobileNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clinicName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    website: {
        type: DataTypes.STRING,
    },
    isNewsletter: {
        type: DataTypes.INTEGER,
        default: 0
    },
}, {
    timestamps: false,
    tableName: 'Visiter'
}
);
module.exports = formSchema;

// module.exports = mongoose.model('User', formSchema);