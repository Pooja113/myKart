import jwt from 'jsonwebtoken'

const verify = async (req, res, next) => {

  try {
    const { token } = req.headers
    if (!token) {
      return res.status(400).json({
        message: "You will have to login first !"
      })
    }
    const tokenVerification = jwt.verify(token, process.env.SECRET_KEY)
    req.user = tokenVerification
    next();

  } catch (error) {
       console.log(' Error in verification middleware')
       return res.status(400).json({
      message: error.message
      }) 
  }


}

export default verify