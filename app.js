const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3000;

app.set('view engine', 'hbs');
app.set('views', __dirname);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    fs.readFile('replies.txt', 'utf8', (err, ans) => {
        if (err) {
            console.log(err);
        } else {
            if (ans) {
                res.render('index', {
                    reply : ans,
                    type : 'alert-primary'
                });
            } else {
                fs.readFile('questions.txt', 'utf8', (err, ques) => {
                    if (err) {
                        console.error(err);
                    } else {
                        res.render('index', {
                            reply : ques,
                            type : 'alert-danger'
                        });
                    }    
                });
            }
        }
    });
});

app.listen(PORT, () => {
    console.log('App started');
});