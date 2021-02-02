const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pet');
const { validateBody } = require('../middlewares/route');
const { string } = require('@hapi/joi');

const router = express.Router();

router.post('/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pet Name is required'),
    age: Joi.number().integer().required().description('Pet age required'),
    color: Joi.string().required().description('Pet color required')
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pet = new Pet(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (e) {
      next(e);
    }
  }
);


router.get( '/',  
  async (req, res, next) => {
    try {  
     let data = await Pet.find({});
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
);

router.delete('/:name',  
  async (req, res, next) => {
    try {
     let data = await Pet.deleteOne({name:req.params.name});
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;