const service = require('../Service/userService');

const creteUser=async(req,res)=>{
  try{
    const user=await service.insertUser(req.body);  
    res.status(201).json({message:"User Insrted sucessfuly",data:user});  
  }catch(error){
    console.error('Error creating User:', error.message); 
    res.status(500).json({ message: 'Failed to create User' });
  }
} 

const getAllUser = async (req, res) => {
  try {
    // console.log("i am controller from getAllUser")
      const users = await service.getUser();
      
      res.status(200).json({
          message: 'Users fetched successfully',
          data: users
      });
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({
          message: 'Error fetching users',
          error: error.message
      });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.body.id;
    await service.DeleteById(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, param } = req.body; 

    console.log("Received Update Request:", req.body);

    const updatedUser = await service.UpdateById(id, { param });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found or could not be updated" });
    }

    res.status(200).json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};




module.exports = {
  creteUser,
  getAllUser,
  deleteUser,
  updateUser
};
