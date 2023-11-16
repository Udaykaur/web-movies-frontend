const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

let objects = []; // Temporary in-memory store

app.get('/', (req, res) => {
    res.render('index', { objects: objects });
});

app.post('/create', (req, res) => {
    const newObject = {
        id: objects.length + 1,
        name: req.body.name,
        isNew: true // Flag for new object
    };
    objects.push(newObject);
    // Set a timeout to remove the isNew flag after first render
    setTimeout(() => newObject.isNew = false, 500);
    res.redirect('/');
});

app.post('/update/:id', (req, res) => {
    const object = objects.find(obj => obj.id === parseInt(req.params.id));
    if (object) {
        object.name = req.body.name || object.name;
    }
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    objects = objects.filter(obj => obj.id !== parseInt(req.params.id));
    res.redirect('/');
});

const PORT = process.env.PORT || 3021;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
