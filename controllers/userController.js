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
    const newUser = new User(req.body);
    await newUser.save();
    // console.log(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    res
      .status(400)
      .json({ error: err, message: `User not created due to ${err}` });
  }
};
