const bcrypt = require('bcrypt');
const { generateToken } = require('../JWT/generateToken');
const service = require('../Service/loginService');

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log("The login data:", req.body);

    try {
        const user = await service.getUserByUsername(username);
        console.log("User from DB:", user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const Match = await bcrypt.compare(password, user.password);

        if (Match) {
            console.log("the id is ",user._id,user.username);
            const token = generateToken({ id: user._id, username: user.username ,role:user.role});

            return res.json({
                success: true,
                message: 'Authentication successful!',
                token: token,
                role:user.role
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password',
            });
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

module.exports = { login };
