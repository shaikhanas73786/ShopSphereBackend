import {
  createUser,
  findUser,
  findUserById,
  updateUserData,
  deleteUser as deleteUserService
} from '../services/userServices.js';
import { hashPass, checkPass } from '../units/authentication.js';
import { generateToken } from '../units/jwt.js';




export const createAccount = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email, and password are required'
      });
    }

    const existingUser = await findUser({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({
        message: 'Email is already registered'
      });
    }

    const hashedPassword = await hashPass(password);

    
    const newUser = await createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone || '',
      password: hashedPassword,
      role: 'user'
    });

    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role
    };

    return res.status(201).json({
      message: 'Account created successfully',
      response: userResponse
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};




export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    
    const user = await findUser({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const isMatch = await checkPass(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role
    });


    return res.status(200).json({
      message: 'Login successful',
      response: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};





export const userProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: 'User profile not found'
      });
    }

    return res.status(200).json({
      message: 'User profile fetched successfully',
      response: user
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};





export const updateUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    
    const updatePayload = {};

    if (name) updatePayload.name = name.trim();
    if (phone !== undefined) updatePayload.phone = phone;
    if (password) {
      updatePayload.password = await hashPass(password);
    }

    const updatedUser = await updateUserData(req.user.id, updatePayload);
    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    return res.status(200).json({
      message: 'User profile updated successfully',
      response: updatedUser
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};






export const deleteUser = async (req, res) => {
  try {
    const deleted = await deleteUserService(req.user.id);
    if (!deleted) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    return res.status(200).json({
      message: 'User account deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};
