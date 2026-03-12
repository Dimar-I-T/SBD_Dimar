const sql = require('../config/db');

const getUserByEmail = async (email) => {
    const result = await sql`
        select * from users
        where email = ${email}
    `;

    if (result.length == 0) {
        throw new Error("User tidak ditemukan");
    }

    return result;
}

const registerUser = async (email, password, name) => {
    const result = await sql`
        insert into users (email, password, name) values (${email}, ${password}, ${name}) returning *
    `;

    return result[0];
}

const loginUser = async (email, password) => {
    const result = await sql`
        select * from users
        where email = ${email} and password = ${password} 
    `

    if (result.length == 0) {
        throw new Error("Invalid email or password");
    }

    return result[0];
}

const updateUser = async (id, email, password, name) => {
    const result = await sql`
        update users set email = ${email}, password = ${password}, name = ${name} where id = ${id} returning *
    `

    return result[0];
}

const deleteUser = async (id) => {
    const result = await sql`
        delete from users where id = ${id} returning *
    `;

    return result[0];
}

module.exports = {
    registerUser,
    loginUser,
    getUserByEmail,
    updateUser,
    deleteUser
}