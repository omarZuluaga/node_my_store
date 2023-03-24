const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

const getConnection = require('./../libs/postgres');

class UsersService {

  constructor() {
    this.user = '';
  }

  async create(user) {
    const newUser = await models.User.create({
      ...user,
      password: await this.hashPassword(user.password)
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async find() {
    const client = await models.User.findAll({
      include: ['customer']
    });

    return client;
  }

  async findByEmail(email) {
    const client = await models.User.findOne({
      where: { email }
    });

    return client;
  }

  async findOne(id) {

    const userFinded = await models.User.findByPk(id);

    if(!userFinded) {
      throw boom.notFound('user not found');
    };

    return userFinded;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return {
      id
    };
  }
}

module.exports = UsersService;
