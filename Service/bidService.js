const Bid = require('../Model/Bid');
const User = require('../Model/User');

const placeBid = async (bidData) => {
    const { BidId, userId, cost, days } = bidData;

    try {
        const bid = await Bid.findOne({ _id: BidId, isDeleted: false });

        if (!bid) {
            throw new Error('Bid not found');
        }

        if (bid.status === 'approved') {
            return { message: 'Bid is already approved. You cannot place a bid.' };
        }

        const bidderData = {
            bidderId: userId,
            bidAmount: cost,
            bidDays: days,
        };

        const updatedBid = await Bid.findOneAndUpdate(
            { _id: BidId, isDeleted: false },
            { $push: { bidders: bidderData } },
            { new: true }
        );

        if (!updatedBid) {
            throw new Error('Failed to place bid');
        }

        return updatedBid;

    } catch (err) {
        console.error("Failed to place bid:", err);
        throw new Error('Failed to place bid');
    }
};

const getAllBids = async () => {
    try {
        return await Bid.aggregate([
            { $match: { status: "pending", isDeleted: false } }, 

            { $unwind: "$bidders" },

            {
                $lookup: {
                    from: "users", 
                    localField: "bidders.bidderId",
                    foreignField: "_id",
                    as: "BidderDetails"
                }
            },
            { $unwind: "$BidderDetails" }, 

            {
                $lookup: {
                    from: "users", 
                    localField: "userId",
                    foreignField: "_id",
                    as: "OwnerDetails"
                }
            },
            { $unwind: "$OwnerDetails" },

            {
                $group: {
                    _id: "$_id",
                    bidName: { $first: "$bidName" },
                    description: { $first: "$description" },
                    cost: { $first: "$cost" },
                    days: { $first: "$days" },
                    status: { $first: "$status" },
                    createdBy: { $first: "$createdBy" },
                    OwnerDetails: { 
                        $first: {
                            name: "$OwnerDetails.name",
                            email: "$OwnerDetails.email"
                        } 
                    },
                    bidders: {
                        $push: {
                            bidAmount: "$bidders.bidAmount",
                            bidDays: "$bidders.bidDays",
                            name: "$BidderDetails.name",
                            email: "$BidderDetails.email"
                        }
                    }
                }
            }
        ]);
    } catch (err) {
        console.error("Error fetching all bids:", err.message);
        throw new Error("Failed to fetch bids");
    }
};

const getOwnerBidsWithBidders = async (userId) => {
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
                    as: 'creatorDetails'
                }
            },
            {
                $unwind: '$creatorDetails'
            },
            {
                $unwind: '$bidders'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'bidders.bidderId',
                    foreignField: '_id',
                    as: 'bidderDetails'
                }
            },

            {
                $unwind: '$bidderDetails'
            },

            {
                $project: {
                    bidName: 1,
                    description: 1,
                    cost: 1,
                    status: 1,
                    'creatorDetails.name': 1,
                    'creatorDetails.email': 1,
                    'bidders.bidderId': 1,
                    'bidders.bidAmount': 1,
                    'bidders.bidDays': 1,
                    'bidders.status': 1,
                    'bidderDetails.name': 1,
                    'bidderDetails.email': 1,
                }
            }
        ]);

        return { ownerCreatedBids };
    } catch (err) {
        console.error('Error fetching owner bids with bidders:', err);
        throw new Error('Failed to fetch owner bids with bidders');
    }
};

module.exports = {
    placeBid,
    getAllBids,
    getOwnerBidsWithBidders
};
