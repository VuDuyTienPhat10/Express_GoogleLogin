const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        //sau khi user chọn tài khoản thì lưu vào 1 biến newUser
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        }
        //kiểm tra xem coi có User có googleId tương ứng dzậy trong trong mongoDB hay chưa
        //nếu có r thì trả về User đó
        //nếu chưa có thì tạo thêm 1 user mới nữa trong collection User
        try {
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user);
            
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )
  //mã hóa, lưu user._id vào session và cookie (từ đó biết đc từ session-cookie này => user._id nào => là tg user nào bằng hàm ở dưới)
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })


  //cái này để khi các req tiếp theo nó sẽ KT req.cookie=>thuật toan'=>lấy ra đc id user = > tìm coi cụ thể là tg user nào để trả về thông tin tương ứng
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
