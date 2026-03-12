const storeService = require('../services/storeService');

exports.createStore = async (req, res) => {
    try {
        const { name, address } = req.body;
        if (!name || !address) {
            res.status(400).json({
                success: false,
                message: "Missing store name or address"
            })
        }

        const store = await storeService.createStore(name, address);
        res.status(201).json({
            success: true,
            message: "Store created",
            payload: store
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllStores = async (req, res) => {
    try {
        const stores = await storeService.getAllStores();
        res.status(200).json({
            success: true,
            message: "Stores found",
            payload: stores
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.updateStore = async (req, res) => {
    try {
        let {id, name, address} = req.body;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "idnya tidak ada"
            })
        }
        
        if (!name) {
            name = "";
        }
        
        if (!address) {
            address = "";
        }
        
        const update = await storeService.updateStore(id, name, address);
        res.status(200).json({
            success: true,
            message: "Store berhasil diupdate",
            payload: update
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Store tidak ditemukan"
        });
    }
}

exports.deleteStore = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Id tidak ada"
            });
        }

        const deleteRes = await storeService.deleteStore(id);

        res.status(200).json({
            success: true,
            message: "Berhasil menghapus",
            payload: deleteRes
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Store tidak ditemukan"
        })
    }
} 

exports.getStore = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Id tidak ada"
            })
        }

        const result = await storeService.getStore(id);

        res.status(200).json({
            success: true,
            message: "Store ditemukan",
            payload: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Store tidak ditemukan"
        })
    }
}

exports.getStoreByName = async (req, res) => {
    try {
        const name = req.query.name;
        if (!name) {
            res.status(400).json({
                success: false,
                message: "Name tidak ditemukan"
            })
        }

        const result = await storeService.getStoreByName(name);
        res.status(200).json({
            success: true,
            message: "Store ditemukan",
            payload: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}