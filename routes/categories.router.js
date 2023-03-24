const passport = require('passport');
const express = require('express');
const router = express.Router();
const CategoriesService = require('./../services/category.service');
const {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} = require('./../schemas/category.schema');
const validatorHandler = require('../middlewares/validator.handler');
const { checkAdminRole, checkRoles } = require('../middlewares/auth.handler');

const categoriesService = new CategoriesService();

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await categoriesService.create(body);

      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
});

router.get('/', async (req, res, next) => {
  try {
    const categories = await categoriesService.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'customer'),
  validatorHandler(getCategorySchema, 'parms'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await categoriesService.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  });

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const body  = req.body;
      const categoryUpdated = await categoriesService.update(id, body);
      res.json(categoryUpdated)
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getCategorySchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      await categoriesService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
