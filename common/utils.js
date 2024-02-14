const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const nodemailer = require('nodemailer')
const { jwtSecretKey, jwtExpiresIn, projectName, smtpServices, smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass } = require('./../config')

// === Authentication =====
const generateAuthToken = (email) => {
  return jwt.sign({ email }, jwtSecretKey, { algorithm: 'HS256', expiresIn: jwtExpiresIn })
}

// Verify token
const verifyToken = (req, res, next) => {
  const reqToByPass = [
    '/api/user/login',
    '/api/user/register',
    '/api/user/forgot-password',
    '/api/user/reset-password'
  ]

  if (reqToByPass.indexOf(req.path) !== -1) {
    next()
  } else if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, jwtSecretKey, { algorithms: ['HS256'] }, function (err, payload) {
      if (err) {
        let msg = 'Invalid Token'
        if (res.name === 'TokenExpiredError') {
          msg = 'Token is expired'
        }
        next({ status: 401, message: msg || res.message })
      } else {
        // let bytes  = CryptoJS.AES.decrypt(payload.data, jwtSecretKey)
        // let decryptedData  = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        // console.log('decryptedData ==> ', decryptedData)
        next()
      }
    })
  } else {
    next({ status: 401, message: "Unauthorized access" })
  }
}

// ==== Send email ========
const sendMail = (recipients, subject, emailBody) => {
  return new Promise(async (resolve, reject) => {
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
      resolve(info)
    } catch (error) {
      reject(error)
    }
  })
}

const prepareMail = (templateName, data) => {
  let { subject, template } = templateName;
  for (let key in data) {
    template = (template).replace(new RegExp('{{' + key + '}}', "g"), data[key])
  }
  return { subject, template }
}

module.exports = {
  generateAuthToken,
  verifyToken,
  sendMail,
  prepareMail
}