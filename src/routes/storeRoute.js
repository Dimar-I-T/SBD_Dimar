const express = require('express')
const router = express.Router();
const storeController = require('../controllers/storeController')

router.post('/create', storeController.createStore);
router.get('/getAll', storeController.getAllStores);
router.get('/:id', storeController.getStore);
router.put('/update', storeController.updateStore);
router.delete('/delete/:id', storeController.deleteStore);
router.get('/getStoreByName', storeController.getStoreByName);

module.exports = router;