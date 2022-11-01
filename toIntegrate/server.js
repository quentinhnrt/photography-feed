const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const _ = require('lodash');
const fs = require('fs');
const mime = require('mime-types');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(fileUpload({
    createParentPath: true
}));
app.use('/uploads', express.static('uploads'));


app.get('/images', (req, res) => {
    res.send(JSON.parse(fs.readFileSync('images.json')));
});

app.post('/images', (req, res) => {

    const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;

    let file = req.files.media;
    let id = req.body.id;
    let extension = mime.extension(file.mimetype);
    let name = file.name.replace(regex, '')+'.'+extension;
    file.mv(`./uploads/${name}`)

    let existingData = fs.readFileSync('./images.json');

    existingData = JSON.parse(existingData);

    existingData[id] = `http://localhost:3000/uploads/${name}`;

    fs.writeFileSync('./images.json', JSON.stringify(existingData));

    res.send(existingData);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));