const express = require('express');
const ProductsService= require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {

  createProductSchem,
  updateProductSchema,
  getProducSchema,
  queryProductShema,

} = require('./../schemas/product.schema');
const passport = require('passport');
const router = express.Router();

const service = new ProductsService();

router.get('/',
  validatorHandler(queryProductShema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
});

router.get('/filter', (req, res) => {
  res.send('im a filter');
})


router.get('/:id', validatorHandler(getProducSchema, 'params'), async (req, res, next) => {

  try {

    const { id } = req.params;
    const product = await service.findOne(id);

    res.json(product);

  } catch (error) {
    next(error);
  }
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createProductSchem, 'body'),
  async (req, res, next) => {

    try {
      const body = req.body;
      const newProduct = await service.create(body);

      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }

});

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getProducSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {

    try {

      const { id } = req.params;
      const body = req.body;
      const updatedProduct = await service.update(id, body)

      res.json(updatedProduct);

    } catch (error) {

      next(error);

    }

});

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const updatedId = await service.delete(id);

      res.json(updatedId);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
