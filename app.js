const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotevn = require('dotenv')

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user')

const app = express();

dotevn.config()

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//we fetch user and store that in the request
app.use((req, res, next) => {
    User.findById('60255cf23112ea39f83f4c23')
        .then(user => {
            //req.user = user; //I have user info but cannot work woth user
            req.user = new User(user.username, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
});