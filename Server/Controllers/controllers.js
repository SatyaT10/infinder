const InfoModal = require('../Modal/formModel');
const MainPage = require('../Modal/mainForm');


const newUser = async (req, res) => {
    try {
        const { name, businessEmail, website, clinicName, mobileNo,printing_materials,query,isNewsletter } = req.body;
        if (!name || !businessEmail || !mobileNo) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }
        const userExist = await InfoModal.findOne({ businessEmail: businessEmail });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "Info already exist!"
            })
        }
        await InfoModal.create({
            name,
            businessEmail,
            website,
            clinicName,
            mobileNo,
            printing_materials,
            query,
            isNewsletter
        })
        res.status(200).json({
            success: true,
            message: "Info Saved successfully..."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error", error
        })
    }
}

const mainPage = async (req, res) => {
    try {
        const { name, businessEmail, clinicName } = req.body
        if (!name || !businessEmail || !clinicName) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        } else {
            const isExist = await MainPage.findOne({ businessEmail: businessEmail } );
            if (isExist) {
                return res.status(400).json({
                    success: false,
                    message: "All ready exists!"
                })
            } else {
                await MainPage.create({
                    name,
                    businessEmail,
                    clinicName,

                });
                return res.status(200).json({
                    success: true,
                    message: "Thank You!"
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error", error
        })
    }
}

module.exports = {
    newUser,
    mainPage
}
