const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { jwtSecretKey, jwtExpiresIn, projectName, smtpServices, smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass } = require('./../config')

// === Authentication =====
const generateAuthToken = (email) => {
  return jwt.sign({ email }, jwtSecretKey, { algorithm: 'HS256', expiresIn: jwtExpiresIn })
}

// Verify token
const verifyToken = (req, res, next) => {
  const reqToByPass = [
    '/user/login',
    '/user/register',
    '/user/forgot-password',
    '/user/reset-password'
  ]

  console.log('req.path ===', req.path)
  console.log('reqToByPass.indexOf(req.path) ===', reqToByPass.indexOf(req.path))

  if (reqToByPass.indexOf(req.path) !== -1) {
    console.log('inside if =====')
    next()
  } else if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, jwtSecretKey, { algorithms: ['HS256'] }, function (err, payload) {
      if (err) {
        let msg = 'Invalid Token'
        if (err.name === 'TokenExpiredError') {
          msg = 'Token is expired'
        }
        next({ status: 401, message: msg || err.message })
      } else {
        // let bytes  = CryptoJS.AES.decrypt(payload.data, jwtSecretKey)
        // let decryptedData  = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        // console.log('decryptedData ==> ', decryptedData)
        next()
      }
    })
  } else {
    next({ status: 401, message: 'Unauthorized access' })
  }
}

// ==== Send email ========
const sendMail = async (recipients, subject, emailBody) => {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    const transporter = nodemailer.createTransport({
      service: smtpServices,
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: smtpUser,
        pass: smtpPass
      }
    })

    const info = await transporter.sendMail({
      from: projectName + ' <' + smtpUser + '>', // sender address
      to: recipients, // list of receivers
      subject, // Subject line
      html: emailBody // html body
    })
    return info
  } catch (error) {
    console.log('error while sending mail : ', error)
  }
}

const prepareMail = (templateName, data) => {
  let { subject, template } = templateName
  for (const key in data) {
    template = (template).replace(new RegExp('{{' + key + '}}', 'g'), data[key])
  }
  return { subject, template }
}

module.exports = {
  generateAuthToken,
  verifyToken,
  sendMail,
  prepareMail
}
