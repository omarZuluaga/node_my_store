'use strict';

const { CUSTOMER_TABLE, CustomerSchema } = require('./../models/customer.model');
const { CATEGORY_TABLE, CategorySchema } = require('./../models/category.model');
const { PRODUCT_TABLE, ProductSchema } = require('./../models/product.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    // await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
    //   field: 'user_id',
    //   allowNull: false,
    //   type: DataTypes.INTEGER,
    //   unique: true,
    // });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
