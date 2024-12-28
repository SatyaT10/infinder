const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const http = require('http').createServer(app);
const cors = require('cors');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const EXCEL_FILE_PATH = './excel_files/users.xlsx';

app.post('/register', (req, res) => {
    try {
        const { name, email, password, businessName, country, state, city, pinCode, GSTNumber, address, whatsAppNo } = req.body;

        if (!email || !password || !name || !whatsAppNo || !address || !pinCode || !city || !state || !country || !businessName) {
            return res.status(400).json({ message: 'Name, Email, and Phone are required.' });
        }

        // Check if the file exists
        if (!fs.existsSync(EXCEL_FILE_PATH)) {
            // Create a new workbook and worksheet if file doesn't exist
            const workbook = xlsx.utils.book_new();
            const worksheet = xlsx.utils.json_to_sheet([]);
            xlsx.utils.book_append_sheet(workbook, worksheet, 'Users');
            xlsx.writeFile(workbook, EXCEL_FILE_PATH);
        }

        // Read the existing workbook
        const workbook = xlsx.readFile(EXCEL_FILE_PATH);
        const worksheet = workbook.Sheets['Users'];

        // Convert the worksheet to JSON
        const users = xlsx.utils.sheet_to_json(worksheet);

        // Add the new user
        users.push({ Name: name, Email: email, Phone: whatsAppNo,Password:password 
            , BusinessName: businessName, Country: country, State: state, City: city, PinCode: pinCode, GSTNumber: GSTNumber, Address: address
        });

        // Convert the updated JSON back to worksheet
        const updatedWorksheet = xlsx.utils.json_to_sheet(users);
        workbook.Sheets['Users'] = updatedWorksheet;

        // Write the updated workbook back to the file
        xlsx.writeFile(workbook, EXCEL_FILE_PATH);

        res.json({ message: 'User registered successfully.' });
    } catch (err) {
        console.error('Error updating Excel file:', err);
        res.status(500).json({ message: 'An error occurred while registering the user.' });
    }
});

// Route to generate a complete Excel file for all users
app.get('/generate-excel', (req, res) => {
    try {
        // Create a new workbook and worksheet
        const fileName = 'users.xlsx';
        // Respond with the download link
        res.status(200).json({
            message: 'Excel file generated successfully.',
            filePath: `./excel_files/${fileName}`,
        });
    } catch (err) {
        console.error('Error generating Excel file:', err);
        res.status(500).json({ message: 'An error occurred while generating the Excel file.' });
    }
});

// Serve the Excel files statically
app.use('/excel_files', express.static(path.join(__dirname, 'excel_files')));

http.listen(port, () => console.log(`Server is running on port ${port}`));