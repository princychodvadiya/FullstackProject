const pool = require("../db/mysql");

const getSalespeople = async (req, res) => {
    try {
        const data = await pool.execute("SELECT * FROM salespeople")
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const addSalespeople = async (sname, city, comm) => {
    try {
        const sql = "INSERT INTO salespeople (sname, city, comm) VALUES (?, ?, ?)";
        const values = [sname, city, comm];
        const result = await pool.execute(sql, values);
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getSalespeople,
    addSalespeople
};
