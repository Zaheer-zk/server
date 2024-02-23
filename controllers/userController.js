import { User } from './../models/user.model.js';

export const getAllUsers = async (req, res) => {
  try {
    const rows = await User.find();
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }
    // console.log(rows);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err, message: 'Not able to find all users' });
  }
};

export const createNewUser = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUserWithSameEmail = await User.findOne({ email });

    if (existingUserWithSameEmail) {
      return res.status(400).json({ message: 'Email should be unique' });
    }

    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    // console.log(savedUser);
    return res.status(201).json(savedUser);
  } catch (err) {
    // console.log(err);
    return res
      .status(400)
      .json({ error: err, message: `User not created due to ${err.message}` });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, name, email, isActive } = req.body;
    console.log(id);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, isActive },
      {
        new: true,
      }
    );

    console.log('updatedUser: ', updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: `User not found` });
    }

    return res.status(201).json(updatedUser);
  } catch (err) {
    return res
      .status(400)
      .json({ error: err, message: `User not updated due to ${err.message}` });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    console.log('id', id);
    const deletedUser = await User.findByIdAndDelete(id);
    console.log('deletedUser: ', deletedUser);
    if (!deletedUser || !deletedUser === null) {
      return res.status(404).json({ message: `User not found` });
    }
    res.json({ message: `User deleted successfully` });
  } catch (err) {
    res
      .status(400)
      .json({ error: err, message: `User not deleted due to ${err}` });
  }
};
