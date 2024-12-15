const InfoModal = require('../Modal/formModel');
const MainPage = require('../Modal/mainForm');


const newUser = async (req, res) => {
    try {
        const { name, businessEmail, companyWebsite, clinicName, mobileNo } = req.body;
        if (!name || !businessEmail || !companyWebsite || !clinicName || !mobileNo) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }
        const userExist = await InfoModal.findOne({ where: { businessEmail: businessEmail } });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "Info already exist!"
            })
        }
        await InfoModal.create({
            name,
            businessEmail,
            companyWebsite,
            clinicName,
            mobileNo
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
        const { businessEmail, landingPageUrl } = req.body
        if (!businessEmail || !landingPageUrl) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        } else {
            const isExist = await MainPage.findOne({ where: { businessEmail: businessEmail } });
            if (isExist) {
                return res.status(400).json({
                    success: false,
                    message: "All ready exists!"
                })
            } else {
                await MainPage.create({
                    businessEmail,
                    landingPageUrl
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