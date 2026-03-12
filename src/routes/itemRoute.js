const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.post('/create', upload.single('image'), itemController.createItem);
router.put('/', upload.single('image'), itemController.updateItem);
router.get('/', itemController.getAllItems);
router.get('/byId/:id', itemController.getItemById);
router.get('/byStoreId/:store_id', itemController.getItemByStoreId);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
