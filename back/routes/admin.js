const ObjectId = require('mongodb').ObjectId;
const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send({messaged: 'Success', data: 1});
});

module.exports = router;