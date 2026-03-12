const itemService = require('../services/itemService');
require('dotenv').config()
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createItem = async (req, res) => {
    try {
        const {name, price, store_id, stock} = req.body;
        const image = req.file;
        console.log("name: " + name + " price: " + price + " store_id: " + store_id + " image: " + image + " stock: " + stock);
        if (!name || !price || !store_id || !image || !stock) {
            res.status(400).json({
                success: false,
                message: "Data tidak lengkap"
            })
        }

        const base64Image = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
        const result = await cloudinary.uploader.upload(base64Image, {
            resource_type: "image",
            folder: "SBD_Dimar"
        });

        const resultData = await itemService.createItem(name, price, store_id, result.secure_url, stock);
        res.status(201).json({
            success: true,
            message: "Item created",
            payload: resultData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllItems = async (req, res) => {
    try {
        const resultData = await itemService.getAllItems();
        res.status(200).json({
            success: true,
            message: "Items found",
            payload: resultData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getItemById = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Id tidak ada"
            });
        }

        const resultData = await itemService.getItemById(id);
        res.status(200).json({
            success: true,
            message: "Item found",
            payload: resultData
        });
    } catch (error) {
        let errorMessage = (error.message.includes('invalid input')) ? 'Item tidak ditemukan' : error.message;
        res.status(500).json({
            success: false,
            message: errorMessage
        })
    }
}

exports.getItemByStoreId = async (req, res) => {
    try {
        const {store_id} = req.params;

        if (!store_id) {
            res.status(400).json({
                success: false,
                message: "store_id tidak ada"
            })
        }

        const resultData = await itemService.getItemByStoreId(store_id);
        res.status(200).json({
            success: true,
            message: "Items found",
            payload: resultData
        })
    } catch (error) {
        let errorMessage = (error.message.includes('invalid input')) ? 'Item tidak ditemukan' : error.message;
        res.status(500).json({
            success: false,
            message: errorMessage
        })
    }
}

exports.updateItem = async (req, res) => {
    try {
        const {id, name, price, store_id, stock} = req.body;
        const image = req.file;
        if (!id || !name || !price || !store_id || !image || !stock) {
            res.status(400).json({
                success: false,
                message: "Data tidak lengkap"
            })
        }

        const base64Image = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
        const result = await cloudinary.uploader.upload(base64Image, {
            resource_type: "image",
            folder: "SBD_Dimar"
        });

        const resultData = await itemService.updateItem(id, name, price, store_id, result.secure_url, stock);
        res.status(200).json({
            success: true,
            message: "Berhasil mengupdate item",
            payload: resultData
        })
    } catch (error) {
        let errorMessage = (error.message.includes('invalid input')) ? 'Item tidak ditemukan' : error.message;
        res.status(500).json({
            success: false,
            message: errorMessage
        })
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Id tidak ada"
            });
        }

        const resultData = await itemService.deleteItem(id);
        res.status(200).json({
            success: true,
            message: "Berhasil menghapus item",
            payload: resultData
        });
    } catch (error) {
        let errorMessage = (error.message.includes('invalid input')) ? 'Item tidak ditemukan' : error.message;
        res.status(500).json({
            success: false,
            message: errorMessage
        })
    }
}