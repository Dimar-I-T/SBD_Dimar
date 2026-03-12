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

const updateStore = async (id, name, address) => {
    const adaName = name.trim().length > 0;
    const adaAddress = address.trim().length > 0;

    if (!adaName && !adaAddress) {
        throw new Error("Nothing to update");
    }

    let result;
    if (adaName && adaAddress) {
        result = await sql`
            update stores
            set name = ${name}, address = ${address}
            where id = ${id}
            returning *
        `;
    } 
    else if (adaName) {
        result = await sql`
            update stores
            set name = ${name}
            where id = ${id}
            returning *
        `;
    } 
    else {
        result = await sql`
            update stores
            set address = ${address}
            where id = ${id}
            returning *
        `;
    }

    return result[0];
};

const deleteStore = async (id) => {
    const result = await sql`
        delete from stores where id = ${id} returning *
    `;

    return result[0];
}

const getStore = async (id) => {
    const result = await sql`
        select * from stores where id = ${id}
    `

    return result;
}

const getStoreByName = async (name) => {
    const result = await sql`
        select * from stores where name = ${name}
    `

    return result;
}

module.exports = {
    createStore,
    getAllStores,
    updateStore,
    deleteStore,
    getStore,
    getStoreByName
};