require('dotenv').config()
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token')

    if(!token){
       return res.status(401).send('please valid token')
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user
        next();
    }
    catch(error){
        res.status(401).send('please valid token')
    }
}


module.exports = fetchuser