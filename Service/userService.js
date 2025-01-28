const User = require('../Model/User');
const bcrypt = require('bcrypt');
const Login = require('../Model/Login');

const insertUser = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);


        const user = new User({
            ...userData,
            password: hashedPassword,
        });

        const savedUser = await user.save();

        const loginData = {
            _id: savedUser._id,
            username: savedUser.name, 
            email: savedUser.email, 
            password: hashedPassword,  
            role: savedUser.role
        };

        await Login.create(loginData);

        return savedUser; 
    } catch (error) {
        console.error("Error inserting user:", error);
        throw error;
    }
};

const getUser = async () => {
    try {
            return await User.find({ isDeleted: false },);
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

const DeleteById = async (id) => {
    try {
      const result = await User.updateOne({ _id: id }, { $set: { isDeleted: true } });
      console.log("Delete Result:", result);
      const loginDeletion = await Login.deleteOne({ _id: id }); 
      console.log("the login data also get Deleted",loginDeletion)
      return result;
    } catch (err) {
      console.error("Error while deleting the user by ID:", err.message);
      throw err;
    }
  };
  
  const UpdateById = async (id, data) => {
    try {
      console.log("Updating user with ID:", id, "Data:", data);
  
      const updateData = data.param;

    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    
      const updatedUser = await User.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { $set: updateData },        
        { new: true }  
      );
  
      if (!updatedUser) {
        console.log("User not found or isDeleted is true");
        return null;
      }

         const loginUpdateData = {
          username: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
      };

      if (updateData.password) {
          loginUpdateData.password = updateData.password;
      }

      const updatedLogin = await Login.findOneAndUpdate(
          { _id: id },
          { $set: loginUpdateData },
          { new: true }
      );
  
      console.log("Updated User:", updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Error while updating the user:", error.message);
      throw error;
    }
  };
  
  
module.exports = {
    insertUser,
    getUser,
    DeleteById,
    UpdateById
};
