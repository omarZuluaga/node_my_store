const { faker } = require("@faker-js/faker");
const { models } = require('../libs/sequelize');

const boom = require('@hapi/boom');
const { Op } = require("sequelize");

class ProductsService {

  constructor() {
  }

  generate() {
    const limit = 100;

    for(let index = 0; index < limit; index++) {

      this.products.push({

        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });

  }
  }

  async create(product) {
    const newProduct = await models.Product.create(product);
    return newProduct;
  }


  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset, price, price_min, price_max } = query;

    if(limit && offset) {
      options.limit = limit;
      options.offset = offset;
    };

    if(price) {
      options.where.price=price;
    };

    if(price_max && price_min) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {

    const product =  await models.Product.findByPk(id, {
      include: 'category'
    });

    if(!product) {
      throw boom.notFound('product not found');
    };

    return product;
  }

  async update(id, productChanges) {
    const product = await this.findOne(id);
    const productUpdated = await product.update(productChanges);

    return productUpdated;
  }

  async delete(id) {

    const product = await this.findOne(id);
    await product.destroy();
    return {
      id
    };
  }

}


module.exports = ProductsService;
