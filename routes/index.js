const express = require('express');
const router = express.Router();
const { response } = require('express');
const bcrypt = require('bcrypt');
const pool = require('../utils/database.js');
const session = require('express-session');
const promisePool = pool.promise();




router.get('/login', async function (req, res, next) {

    res.render('login.njk', { title: 'Log' });
});

router.get('/shop', async function (req, res, next) {

    if (req.session.login == 1) {
        const [rows] = await promisePool.query("SELECT * FROM edzarshop");
        res.render('shop.njk', { title: 'PostIt', name: req.session.username, rows: rows });
    }
    else {
        return res.status(401).send('Access denied');
    }
});



router.post('/shop', async function (req, res, next) {
    req.body = { logout };


});

router.get('/logout', async function (req, res, next) {

    res.render('logout.njk', { title: 'Logout' });
    req.session.login = 0;
});

router.post('/shop', async function (req, res, next) {
    req.body = { profile };


});

router.get('/profile', async function (req, res, next) {

    res.render('profile.njk', { title: 'profile' });
    req.session.login = 0;
});



router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;


    if (username.length == 0) {
        return res.send('Username is Required')
    }
    if (password.length == 0) {
        return res.send('Password is Required')
    }

    const [user] = await promisePool.query('SELECT * FROM edzarusers WHERE name = ?', [username]);


    bcrypt.compare(password, user[0].password, function (err, result) {

        if (result === true) {
            req.session.username = username;
            req.session.login = 1;
            return res.redirect('/shop');
        }

        else {
            return res.send("Invalid username or password")
        }

    })


});

router.get('/crypt/:password', async function (req, res, next) {
    const password = req.params.password
    bcrypt.hash(password, 10, function (err, hash) {
        return res.json({ hash });

    })
});



router.get('/register', function (req, res, next) {
    res.render('register.njk', { title: 'register' });

});

router.post('/register', async function (req, res, next) {
    const { username, password, passwordConfirmation } = req.body;

    if (username === "") {
        console.log({ username })
        return res.send('Username is Required')

    }
    else if (password.length === 0) {
        return res.send('Password is Required')
    }
    else if (password && password.length <= 8) {
        response.errors.push('password must be at least 8 characters');
    }
    else if (passwordConfirmation.length === 0) {
        return res.send('Password is Required')
    }
    else if (password !== passwordConfirmation) {
        return res.send('Passwords do not match')
    }

    const [user] = await promisePool.query('SELECT name FROM edzarusers WHERE name = ?', [username]);
    console.log({ user })

    if (user.length > 0) {
        return res.send('Username is already taken')
    } else {
        bcrypt.hash(password, 10, async function (err, hash) {
            const [creatUser] = await promisePool.query('INSERT INTO edzarusers (name, password) VALUES (?, ?)', [username, hash]);
            res.redirect('/login')
        })
    }
});

router.get('/', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM edzarshop");
    res.render('index.njk', {
        rows: rows,
        title: 'PostIt'
    });
});







router.get('/delete', async function (req, res, next) {
    res.render('delete.njk', {
        title: 'Delete',
        user: req.session.login || 0
    });
});

router.post('/delete', async function (req, res, next) {
    const { username, password } = req.body;
    if (!username) {
        return res.send('Username is required');
    }
    if (!password) {
        return res.send('Password is required');
    }

    const [user] = await promisePool.query('SELECT * FROM edzarusers WHERE name = ?', [username]);
    if (!user.length) {
        return res.send('User not found');
    }
    bcrypt.compare(password, user[0].password, function (err, result) {
        if (result === true) {
            promisePool.query('DELETE FROM edzarusers WHERE name = ?', [username])
                .then(() => {
                    req.session.destroy();
                    res.redirect('/');
                })
                .catch((error) => {
                    console.error(error);
                    res.send('Error deleting user');
                });
        } else {
            res.send('Invalid username or password');
        }
    });
});

router.get('/new', async function (req, res, next) {
    res.render('new.njk', {
        title: 'Nytt inlägg',
    });
});



router.post('/new', async function (req, res, next) {
    const { author, title, content } = req.body;
    const error = [];

    if (!title) {
        error.push('Title is required');
    }
    if (!content) {
        error.push('Body is required');
    }
    if (title && title.length <= 3) {
        error.push('Title must be at least 3 characters');
    }
    if (content && content.length <= 10) {
        error.push('Body must be at least 10 characters');
    }
    if (res.length === 0) {
        const sanitize = (str) => {
            let temp = str.trim();
            temp = validator.stripLow(temp);
            temp = validator.escape(temp);
            return temp;
        };
    }
    if (!title) {
        sanitizedTitle = sanitize(title)
    }
    if (!content) {
        sanitizedcontent = sanitize(content)
    }
    if (error.length === 0) {
        try {
            const [rows] = await promisePool.query("INSERT INTO edzarshop (author, title, content) VALUES ( ?, ?, ?)", [author, title, content]);
            res.redirect('/shop');
        } catch (error) {
            console.error(error);
        }
    } else {
        res.send(error);
    }


});




module.exports = router;
