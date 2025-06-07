const express = require('express');
const router = express.Router();
const graphqlHandler = require('../graphql');

router.use('/', graphqlHandler);

module.exports = router;
