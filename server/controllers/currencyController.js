const Currencies = require('../model/Currencies');

const fetchCurrencies = async (req, res) => {
    try {
        const result = await Currencies.find();
        console.log(result); // Log the result to see if it's empty
        res.status(200).json(result);
    } catch (error) {
        console.error(error); // Log any errors
        res.status(500).json({ message: error.message });
    }
}

module.exports = { fetchCurrencies };
