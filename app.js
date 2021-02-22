const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path')
const fs = require('fs');
const app = express();

app.listen(5000, () => {
    console.log('App listen 5000');
})

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}))

app.set('views', path.join(__dirname, 'views'))

const DataAllUsers = path.join(__dirname, 'Users.txt');

app.get('/registration', (req, res) => {
    res.render('registration')
})

app.post('/registration', (req, res) => {
    fs.readFile(DataAllUsers, (err, success) => {
        if (err) {
            console.log(err);
            return;
        }
        const parsedUsers = JSON.parse(success.toString())
        const userEmail = parsedUsers.some(user => user.email === req.body.email)
        if (userEmail) {
            res.render('error', {
                error: 'User registed!'
            })
        }
        parsedUsers.push(req.body)
        fs.writeFile(DataAllUsers, JSON.stringify(parsedUsers), err => {
            if (err) {
                console.log(err);
                return;
            }
        })
        res.redirect('/user');
    })
})


app.get('/user', (req, res) => {
    fs.readFile(DataAllUsers, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        users = JSON.parse(data.toString());
        res.render('user', {
            users
        })
    })
})


app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    fs.readFile(DataAllUsers, (err, success) => {
        if (err) {
            console.log(err);
            return;
        }
        const parsedUsers = JSON.parse(success.toString())
        const registeredUser = parsedUsers.some(user => user.email === req.body.email && user.password === req.body.password);
        if (registeredUser) {
            fs.readFile(DataAllUsers, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                users = JSON.parse(data.toString());
                let userIndex = users.findIndex(user => user.email === req.body.email && user.password === req.body.password);
                res.redirect(`/user/${userIndex}`)
            })
        }
        res.render('error', {
            error: 'User is not registrated'
        })
    })
})
app.get('/user/:userId', (req, res) => {
    const {
        userId
    } = req.params
    fs.readFile(DataAllUsers, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const parsedUsersData = JSON.parse(data.toString());
        console.log(parsedUsersData[userId]);

        res.render('single-user', {
            user: parsedUsersData[userId]
        })
    })
})
