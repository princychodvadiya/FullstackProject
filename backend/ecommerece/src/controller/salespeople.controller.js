const { getSalespeople, addSalespeople } = require("../model/salespeople.model");

const listSalespeople = async (req, res) => {
    try {
        const salespeople = await getSalespeople();
        // console.log(salespeople);
    } catch (error) {
        console.log(error);
    }
}

const AddSalespeople = async (req, res) => {
    try {
        const { sname, city, comm } = req.body;
        const salespeople = await addSalespeople(sname, city, comm);
        // res.status(201).json({ message: "Salesperson added successfully", insertedId: salespeople.insertId });
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    listSalespeople,
    AddSalespeople
}