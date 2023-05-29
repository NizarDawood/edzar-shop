const express = require('express');
const session = require('express-session');
const router = express.Router();
const { response } = require('express');
const bcrypt = require('bcrypt');
const pool = require('../utils/database.js');
const promisePool = pool.promise();

// Configure session middleware
router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

router.get('/', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM edzarshop");
    res.render('index.njk', {
        rows: rows,
        title: 'PostIt'
    });
});

router.get('/login', async function (req, res, next) {
    res.render('login.njk', { title: 'Log' });
});

router.get('/shop', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM edzarshop");
    res.render('shop.njk', { title: 'PostIt', name: req.session.username, rows: rows });
});

router.post('/shop', async function (req, res, next) {
    // req.body = { logout };
});

router.get('/logout', async function (req, res, next) {
    res.render('logout.njk', { title: 'Logout' });
    req.session.login = 0;
});

router.post('/shop', async function (req, res, next) {
    req.body = { profile };
});

router.get('/profile', async function (req, res, next) {
    if (req.session.login == 1) {
        res.render('profile.njk', { title: 'Profile', name: req.session.username });
    } else {
        return res.status(401).send('Access denied');
    }
});

router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;

    if (username.length == 0) {
        return res.send('Username is Required');
    }
    if (password.length == 0) {
        return res.send('Password is Required');
    }

    const [user] = await promisePool.query('SELECT * FROM edzarusers WHERE name = ?', [username]);

    bcrypt.compare(password, user[0].password, function (err, result) {
        if (result === true) {
            req.session.username = username;
            req.session.login = 1;
            return res.redirect('/shop');
        } else {
            return res.send("Invalid username or password");
        }
    });
});

router.get('/crypt/:password', async function (req, res, next) {
    const password = req.params.password;
    bcrypt.hash(password, 10, function (err, hash) {
        return res.json({ hash });
    });
});

router.get('/register', function (req, res, next) {
    res.render('register.njk', { title: 'register' });
});

router.post('/register', async function (req, res, next) {
    const { username, password, passwordConfirmation } = req.body;

    if (username === "") {
        console.log({ username });
        return res.send('Username is Required');
    } else if (password.length === 0) {
        return res.send('Password is Required');
    } else if (password && password.length <= 8) {
        response.errors.push('password must be at least 8 characters');
    } else if (passwordConfirmation.length === 0) {
        return res.send('Password is Required');
    } else if (password !== passwordConfirmation) {
        return res.send('Passwords do not match');
    }

    const [user] = await promisePool.query('SELECT name FROM edzarusers WHERE name = ?', [username]);
    console.log({ user });

    if (user.length > 0) {
        return res.send('Username is already taken');
    } else {
        bcrypt.hash(password, 10, async function (err, hash) {
            const [createUser] = await promisePool.query('INSERT INTO edzarusers (name, password) VALUES (?, ?)', [username, hash]);
            req.session.username = createUser.insertId;
            const [updateUser] = await promisePool.query('UPDATE edzarusers SET name = ? WHERE id = ?', [username, createUser.insertId]);
            res.redirect('/login');
        });
    }
});

module.exports = router;








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






////////////// hämta produkter



router.get('/profile', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM edzaruser");
    res.render('profile.njk', { title: 'postIt', name: req.session.username, rows: rows });
});

/// skicka data från tabellen edzaruser name och edzarshop id 1 column 

router.get('/shop', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM edzarshop");
    res.render('shop.njk', { title: 'PostIt', name: req.session.username, rows: rows });
});

/*
router.post('/add-to-cart', async function (req, res, next) {
    const { Id } = req.body;
  
    // logged in session funkar
    if (req.session.login === 1 && req.session.username) {
      const userId = req.session.username;
      const query = 'INSERT INTO edzarcart (userid, productname, price) VALUES (?, ?, ?)';
  
      try {

        const [productRows] = await promisePool.query('SELECT * FROM edzarshop WHERE Id = ?', [Id]);
        const { productname, price } = productRows[0];
  
        // Insert the product into the edzarcart table
        await promisePool.query(query, [userId, productname, price]);
        res.redirect('/cart');
      } catch (error) {
        console.error('Error inserting product into the cart:', error);
        return res.sendStatus(500);
      }
    } else {
      return res.status(401).send('Access denied');
    }
  });
*/






router.post('/add-to-cart', async (req, res) => {
    const { user_Id, product_Id } = req.body;
    
    if (req.session.login === 1 && req.session.username) {
      const userId = req.session.username;
    
      try {
        const insertQuery = 'INSERT INTO edzarcart (edzaruser_id, edzarshop_id) VALUES (?, ?)';
        await promisePool.query(insertQuery, [user_Id, product_Id]);
    
        const cartQuery = 'SELECT * FROM edzarcart JOIN edzarshop ON edzarcart.edzarshop_id = edzarshop.id WHERE edzarcart.edzaruser_id = ?';
        const [cartResults] = await promisePool.query(cartQuery, [user_Id]);
    
        res.render('cart.njk', { cartItems: cartResults });
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
      }
    } else {
      return res.status(401).send('Access denied');
    }
  });
  
  










module.exports = router;