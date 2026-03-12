const userService = require('../services/userService');

exports.getUserByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        if (!email) {
            res.status(400).json({
                success: false,
                message: "Email tidak ada"
            })
        }

        const result = await userService.getUserByEmail(email);
        res.status(200).json({
            success: true,
            message: "User ditemukan",
            payload: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.registerUser = async (req, res) => {
    try {
        const {email, password, name} = req.query;
        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                message: "Data tidak lengkap"
            })
        }

        const resultData = await userService.registerUser(email, password, name);

        res.status(201).json({
            success: true,
            message: "User created",
            payload: resultData
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.query;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Data tidak lengkap"
            })
        }

        const resultData = await userService.loginUser(email, password);
        res.status(200).json({
            success: true,
            message: "Login success",
            payload: resultData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const {id, email, password, name} = req.body;
        if (!id || !email || !password || !name) {
            res.status(400).json({
                success: false,
                message: "Data tidak lengkap"
            })
        }

        const result = await userService.updateUser(id, email, password, name);
        res.status(200).json({
            success: true,
            message: "Berhasil mengupdate user",
            payload: result
        })
    } catch {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: "Id tidak ada"
            })
        }

        const result = await userService.deleteUser(id);

        res.status(200).json({
            success: true,
            message: "Berhasil menghapus user",
            payload: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}