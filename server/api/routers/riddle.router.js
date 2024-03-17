const express = require('express');
const { getAllRiddle, getById, createRiddle, updatedRiddle, deleteRiddle } = require('../controllers/riddle.controller');
const upload=require ('../middlewares/upload')
const router = express.Router();


router.get('/:age/:subject/:difficulty', getAllRiddle);
router.get('/:riddleId', getById);
//router.post('/',upload.single('image'), createRiddle);
router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('Please upload a file');
    }
},createRiddle)
router.put('/:riddleId',upload.single('image'), updatedRiddle);
router.delete('/:riddleId', deleteRiddle);

module.exports = router;