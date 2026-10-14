const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET

function setUser(user){
    return jwt.sign(
        {
            _id:user._id,
            email : user.email,
        }, secret);
}

function getUser(token){
    if(!token) return null;
    jwt.verify(token, secret)
}   

// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }   

module.exports = {
    setUser,
    getUser
}