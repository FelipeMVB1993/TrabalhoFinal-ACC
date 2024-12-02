const mysql = require('mysql2/promise')

class Database {

    constructor() {
        if (!Database.instance) {
            this.pool = mysql.createPool({
                host: "136.248.80.115",
                user: "felipe",
                password: "lfmvb1993",
                database: "atividadefinal"
            })
            Database.instance = this;
        }
        return Database.instance;
    }
    
    async ExecutaComando(sql, params = []) {
        const connection = await this.pool.getConnection()
        try {
            const [rows] = await connection.query(sql, params)
            return rows;

        } finally {
            connection.release();
        }

    }

    async ExecutaComandoNonQuery(sql, params = []) {
        const connection = await this.pool.getConnection()
        try {
            const [results] = await connection.query(sql, params)
            return results.affectedRows;

        } finally {
            connection.release();
        }
    }

}

module.exports = Database;