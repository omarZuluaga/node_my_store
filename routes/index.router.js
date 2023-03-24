const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const userRouter = require('./user.router');
const customersRouter = require('./customers.router');
const orderRoute = require('./order.route');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const express = require('express');

// const userRouter = require('./user.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', userRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', orderRoute);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;
