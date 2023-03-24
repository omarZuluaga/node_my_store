const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { config } = require('../config/config');
const UserService = require('./user.service');

const userService = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await this.verifyUser(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      throw boom.unauthorized();
    }

    delete user.dataValues.password;
    return user;
  }

  async verifyUser(email) {
    const user = await userService.findByEmail(email);
    if(!user) {
      throw boom.notFound();
    }
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwt_secret);

    return {
      user,
      token
    };
  }

  async sendPasswordRecoveryLink(email) {
    const user = await this.verifyUser(email);
    const payload = {
      sub: user.id
    };
    const token = jwt.sign(payload, config.jwt_secret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    const userUpdated = await userService.update(user.id, {recoveryToken: token});
    const mail = {
      from: config.authEmail,
      to: `${user.email}`,
      subject: "Recover your password",
      html: `<b>Join in this link to recovery your password => ${link}</b>`
    };

    const rta = await this.sendEmail(mail);
    return rta;
  }


  async sendEmail(email) {
    //const user = await userService.findByEmail(email);
    const transporter = nodemailer.createTransport({
      host: config.emailTransportHost,
      port: config.emailTransportPort,
      secure: true,
      auth: {
        user: config.authEmail,
        pass: config.authPassword
      }
    });

    await transporter.sendMail(email);


    return {
      message: 'mail sent'
    };
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwt_secret);
      const user = await userService.findOne(payload.sub);

      if(user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      const hash = await bcrypt.hash(newPassword, 10);

      await userService.update(user.id, {
        recoveryToken: null,
        password: hash
      });

      return {
        message: 'password changed successfully'
      };

    } catch (error) {
      throw boom.unauthorized();
    }
   }
}

module.exports = AuthService;
