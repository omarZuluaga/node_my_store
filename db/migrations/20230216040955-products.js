'use strict';

const { CATEGORY_TABLE, CategorySchema } = require('../models/category.model');
const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');
const { PRODUCT_TABLE, ProductSchema } = require('../models/product.model');
const { UserSchema, USER_TABLE } = require('./../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    // await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    // await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    // await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    // await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
    //   field: 'user_id',
    //   allowNull: false,
    //   type: DataTypes.INTEGER,
    //   unique: true,
    // });
    // await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  async down (queryInterface, Sequelize) {
w
  }
};
