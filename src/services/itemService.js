const sql = require('../config/db');

const createItem = async (name, price, store_id, image_url, stock) => {
    const result = await sql`
        insert into items (name, price, store_id, image_url, stock) 
        values (${name}, ${price}, ${store_id}, ${image_url}, ${stock})
        returning *
    `;

    return result[0];
}

const getAllItems = async () => {
    const result = await sql`
        select * from items
    `;

    return result;
}

const getItemById = async (id) => {
    const result = await sql`
        select * from items
        where id = ${id}
    `;

    if (!result) {
        throw new Error({message: 'Item tidak ditemukan'});
    }

    return result;
}

const getItemByStoreId = async (store_id) => {
    const result = await sql`
        select * from items
        where store_id = ${store_id}
    `;

    if (!result) {
        throw new Error({message: 'Item tidak ditemukan'});
    }

    return result;
}

const updateItem = async (id, name, price, store_id, image_url, stock) => {
    const result = await sql`
        update items set 
        name = ${name},
        price = ${price},
        store_id = ${store_id},
        image_url = ${image_url},
        stock = ${stock}
        where id = ${id}
        returning *
    `;

    return result[0];
}

const deleteItem = async (id) => {
    const result = await sql`
        delete from items where id = ${id}
        returning *
    `;

    return result[0];
}

module.exports = {
    createItem,
    getAllItems,
    getItemById,
    getItemByStoreId,
    updateItem,
    deleteItem
}