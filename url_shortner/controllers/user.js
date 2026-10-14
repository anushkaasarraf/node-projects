const User = require('../models/user');
const {v4: uuidv4} = require('uuid');
const { setUser } = require('../services/auth');

async function handleUserRequest(req, res) {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    return res.render('home');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.status(401).render('login', { error: 'Invalid credentials' });
    }
    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    // res.cookie('uid', sessionid);
    const token = setUser(user);
    // res.cookie('uid', token);
    // return res.redirect('/');
    return res.json({token});
}



module.exports = { handleUserRequest,
    handleUserLogin
 };