const express = require('express');

const mongoose=require('mongoose');
const router = express.Router();

router.use('/transform',require('./transforms'));
router.use('/users', require('./users'));
router.use('/pets', require('./pet'));

module.exports = router;