const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers?.authentication
        if (!token) {
            return res.status(401).json({ message: 'Unothrized: no token provided' })
        }
        const decode = jwt.verify(token, 'Suhel')
        if (!decode) {
            return res.status(403).json({ message: 'Token expire please login again' })
        }
        req.user = decode
        next()
    }
    catch (err) {
        res.status(403).json({ message: 'Internal server error', err })
    }
}

const roleCheck = (roles) => {
   return (req,res,next)=>{
    try{
        const userRole = req.user.rest.role 
        if(!userRole || !roles.includes(userRole)){
            return res.status(403).json({message:'Only admin can access this'})
        }
        next()
    }
    catch(err){
        return res.status(403).json({message:'Only admin can add task'})
    }
    }
}

module.exports = { verifyToken ,roleCheck}