const storeService = require('../services/storeService');

exports.createStore = async (req, res) => {
    try {
        const { name, address } = req.body;
        if (!name || !address) {
            res.status(400).json({
                success: "false",
                message: "Missing store name or address"
            })
        }

        const store = await storeService.createStore(name, address);
        res.status(201).json({
            success: "true",
            message: "Store created",
            payload: store
        });
    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error.message
        })
    }
}

exports.getAllStores = async (req, res) => {
    try {
        const stores = await storeService.getAllStores();
        res.status(200).json({
            success: "true",
            message: "Stores found",
            payload: stores
        });
    } catch (error ) {
        res.status(500).json({
            success: "false",
            message: error.message
        });
    }
}