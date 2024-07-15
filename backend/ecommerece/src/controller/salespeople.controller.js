const { getSalespeople } = require("../model/salespeople.model");

const listSalespeople = async (req, res) => {
    try {
        const salespeople = await getSalespeople();
        // console.log(salespeople);

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    listSalespeople
}