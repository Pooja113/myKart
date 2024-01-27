import jwt from 'jsonwebtoken'

const verify = async (req, res, next) => {

  try {
    const {token} = req.headers
    const tokenVerification = jwt.verify(token, process.env.SECRET_KEY)
    if (!tokenVerification) {
      return res.status(400).json({
        message: "Email verification failed, possibly the link is invalid or expired"
      })
    }

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