const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 4000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('uploads'));

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, callback) => {
        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.originalname}`;
        callback(null, fileName);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1000 * 1000 },
}).single('pic');



app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

app.post('/upload', upload, (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    
    console.log('Upload successful');
    res.send('Upload Success');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
