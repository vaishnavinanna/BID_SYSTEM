const service = require('../Service/ownerService');

const createBid = async (req, res) => {
    try {
        console.log("The body is ",req.body);
        const newBid = await service.createBid(req.body);
        console.log("The new bid is ",newBid);
        res.status(201).json({
            message: 'Bid created successfully',
            data: newBid
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to place bid', error: err.message });
    }
};

const viewAllBid = async (req, res) => {
    try {
        const ownerId=req.user._id;
        console.log("The owner ID is ", req.user._id); 
        const bids = await service.viewAllBid(ownerId);
        res.status(200).json({ success: true, data: bids });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const viewBidById = async (req, res) => {
    try {
        const ownerId = req.user._id;
        const bidId = req.params.bidId; 
        console.log("The owner and bid id is ",ownerId,"and the bid id is ",bidId);
        const bid = await service.viewBidById(ownerId, bidId);
        res.status(200).json({ success: true, data: bid });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getAllBid = async (req, res) => {
    console.log("The data from getAllBid is ", req.user);
    try {
        let bids;
        if (req.user.role === 'Owner') {
            console.log("The owner ID is ", req.user._id);

            const result = await service.getOwnerBids(req.user._id);
            bids = {
                createdByOwner: result.ownerCreatedBids, 
            };

        } else if (req.user.role === 'Bidder') {
            console.log("The bidder ID is ", req.user._id);
            bids = await service.getBidderBids(req.user._id);

        } else {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized role'
            });
        }

        res.status(200).json({
            message: 'Fetched bids successfully',
            data: bids
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch bids',
            error: err.message
        });
    }
};

  

const getApproveBids = async (req, res) => {
    try {
        console.log("Fetching Approved Bids...");

        const bids = await service.getApproveBids();
        res.status(200).json({
            message: 'Fetched approved bids successfully',
            data: bids
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch approved bids', error: err.message });
    }
};


const confirmBid = async (req, res) => {
    console.log("I am confirm bid controller");

    const bidId = req.body.bidId; 
    const userId = req.body.userId;

    try {
        if (!bidId) {
            return res.status(400).json({ message: 'Bid ID is required' });
        }

        const updatedBid = await service.confirmBid(bidId, userId);

        res.status(200).json({
            message: 'Bid confirmed successfully',
            data: updatedBid
        });
    } catch (err) {
        console.error("Error confirming bid:", err.message);
        res.status(500).json({ message: 'Failed to confirm bid', error: err.message });
    }
};



module.exports = {
    createBid,
    getAllBid,
    getApproveBids,
    confirmBid,
    viewAllBid,
    viewBidById
};
