const sql = require('../config/db');

const createStore = async (name, address) => {
    const newStore = await sql`
        insert into stores (name, address)
        values (${name}, ${address})
        returning *
    `

    return newStore[0];
};

const getAllStores = async () => {
    const stores = await sql`
        select * from stores
    `

    return stores;
}

module.exports = {
    createStore,
    getAllStores
};