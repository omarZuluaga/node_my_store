const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async create(order) {
    const newOrder = await models.Order.create(order);
    return newOrder;
  }

  async find() {
    return await models.Order.findAll({
      include: ['customer']
    });
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if(!order) {
      throw boom.notFound('order not found');
    }
    return order;
  }

  async findByUser(userId) {

    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    return orders;
  }

  async update(id, orderChanges) {
    const orderFinded = await this.findOne(id);
    return await orderFinded.update(orderChanges);
  }

  async delete(id) {
    const orderFinded = await this.findOne(id);
    await orderFinded.destroy();
    return {id};
  }

  async addItem(item) {
    const newItem = await models.OrderProduct.create(item);
    return newItem;
  }

}

module.exports = OrderService;
