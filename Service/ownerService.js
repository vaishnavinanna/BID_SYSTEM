const Bid = require('../Model/Bid');
const User = require('../Model/User');

const createBid = async (bidData) => {
    const bid = new Bid(bidData);
    console.log("the bid is ", bidData)
    try {
        return await bid.save();
    } catch (err) {
        console.log("the error is ", err)
        throw new Error('Failed to create bid');
    }
};

const getOwnerBids = async (userId) => {
    try {
        const ownerCreatedBids = await Bid.aggregate([
            {
                $match: {
                    userId: userId,
                    isDeleted: false
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'OwnerDetails'
                }
            },
            { $unwind: '$OwnerDetails' },
            {
                $project: {
                    'OwnerDetails.password': 0,
                    'userDetails': 0
                }
            }
        ]);

        return {
            ownerCreatedBids,
        };

    } catch (err) {
        console.error("Error fetching owner bids:", err.message);
        throw new Error('Failed to fetch owner bids');
    }
};


const getBidderBids = async (userId) => {
    try {
        return await Bid.aggregate([
            { $match: { 'bidders.bidderId': userId, isDeleted: false } },

            { $unwind: '$bidders' },
            { $match: { 'bidders.bidderId': userId } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'OwnerDetails'
                }
            },
            { $unwind: '$OwnerDetails' },

            {
                $project: {
                    _id: 1,
                    bidName: 1,
                    description: 1,
                    cost: 1,
                    days: 1,
                    status: 1,
                    'bidders.bidAmount': 1,
                    'bidders.bidDays': 1,
                    'OwnerDetails.name': 1,
                    'OwnerDetails.email': 1
                }
            }
        ]);
    } catch (err) {
        console.error('Error fetching user-specific bids:', err.message);
        throw new Error('Failed to fetch user-specific bids');
    }
};


const getApproveBids = async () => {
    try {
        return await Bid.aggregate([
            { $match: { status: 'approved', isDeleted: false } },
            {
                $project: {
                    _id: 1,
                    bidName: 1,
                    description: 1,
                    cost: 1,
                    days: 1,
                    approvedBidder: {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: "$bidders",
                                    as: "bidder",
                                    cond: { $eq: ["$$bidder.bidAmount", "$cost"] }
                                }
                            },
                            0
                        ]
                    }
                }
            }
        ]);
    } catch (err) {
        throw new Error('Failed to fetch approved bids');
    }
};


const confirmBid = async (bidId, userId) => {
    console.log("I am confirm bid service");

    try {
        const bid = await Bid.findOne({ _id: bidId, isDeleted: false });
        console.log("Bid found: ", bid);

        if (!bid) {
            throw new Error('Bid not found or has been deleted');
        }

        if (bid.status === 'approved') {
            throw new Error('Bid is already approved');
        }

        const user = await User.findOne({ _id: userId, isDeleted: false });
        console.log("User found: ", user);
        if (!user) {
            throw new Error('User not found or has been deleted');
        }

        const updatedBid = await Bid.findOneAndUpdate(
            { _id: bidId, isDeleted: false },
            { $set: { status: 'approved', updatedBy: userId } },
            { new: true }
        );

        if (!updatedBid) {
            throw new Error('Failed to update the bid');
        }

        return updatedBid;

    } catch (err) {
        console.error("Error during bid confirmation:", err.message);
        throw new Error('Failed to confirm bid: ' + err.message);
    }
};

const viewAllBid = async (ownerId) => {
    try {
        const bids = await Bid.find({ userId: ownerId, isDeleted: false });
        return bids;
    } catch (error) {
        throw new Error("Error fetching bids: " + error.message);
    }
};

const viewBidById = async (ownerId, bidId) => {
    try {
        const bid = await Bid.findOne({ _id: bidId, userId: ownerId, isDeleted: false });
        if (!bid) {
            throw new Error("Bid not found or unauthorized access");
        }
        return bid;
    } catch (error) {
        throw new Error("Error fetching bid: " , error.message);
    }
};

module.exports = {
    createBid,
    getApproveBids,
    confirmBid,
    getOwnerBids,
    getBidderBids,
    viewAllBid,
    viewBidById
};
