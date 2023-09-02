const { verifyJWT } = require('../helpers/jwt')
const {employee_management, user_management} = require('../models')

const isAuth = async (req, res, next)=>{
    try {
        const {access_token} = req.headers
        if(!access_token) {
            throw ({name:'Not login'})
        }
        const jwtVerified = verifyJWT(access_token)
        if(!jwtVerified){
            throw ({name:'User Not Found'})
        }
        let userLogin
        if(jwtVerified.role == "employee_management"){
            userLogin = await employee_management.findByPk(jwtVerified.id)
        }else{
            userLogin = await user_management.findByPk(jwtVerified.id)
        }
        if(!userLogin){
            throw ({name:'User Not Found'})
        }
        req.userFind = {
            idUser:userLogin.id,
            role:jwtVerified.role
        }
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = isAuth