const service = require('../Service/bidService');

const placeBid = async (req, res) => {
    try {
        const newBid = await service.placeBid(req.body);
        res.status(201).json({
            message: 'Bid placed successfully',
            data: newBid
        });
    } catch (err) {
        console.error('Error placing bid:', err.message);
        res.status(500).json({ message: 'Failed to place bid', error: err.message });
    }
};

const getAllBid = async (req, res) => {
    // console.log("The data from getAllBid is ", req.user);
    try {

        const result=await service.getAllBids()

        res.status(200).json({
            message: 'Fetched bids successfully',
            data: result
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch bids',
            error: err.message
        });
    }
};






module.exports = {
    placeBid,
    getAllBid,
};
