const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotevn = require('dotenv')

const errorController = require('./controllers/error');
const User = require('./models/user')

const app = express();

dotevn.config()

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { CommandCursor } = require('mongodb');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//we fetch user and store that in the request
app.use((req, res, next) => {
    User.findById('602a90c0bc47e8f1c2fd2d90')
        .then(user => {
            //req.user = user; //I have user info but cannot work woth user
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.DB)
    .then(() => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'yapoey',
                    email: 'yapoey@gmail.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })