import bcrypt from 'bcrypt';
import { Admin } from '../models/adminUser.model.js';

export const createAdminUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUserWithSameEmail = await Admin.findOne({ email });

    if (existingUserWithSameEmail) {
      return res.status(400).json({ message: 'Email should be unique' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminUser = new Admin({ username, email, password: hashedPassword });

    const savedUser = await adminUser.save();

    console.log('Saved user', savedUser);

    res.status(201).json(savedUser);
  } catch (err) {
    // console.log(err);
    return res
      .status(400)
      .json({ error: err, message: `User not created due to ${err.message}` });
  }
};

export const getAdminUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminUser = await Admin.findOne({
      email,
    });

    console.log('adminUser: ', adminUser);

    if (!adminUser) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, adminUser.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json(adminUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Not able to find this users' });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { id, currentPassword, newChangePassword } = req.body;

    console.log(id, currentPassword, newChangePassword);

    const adminUser = await Admin.findById(id);

    console.log('adminUser: ', adminUser);

    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      adminUser.password
    );

    if (isPasswordMatch) {
      const hashPassword = await bcrypt.hash(newChangePassword, 10);
      const updateAdminUser = await Admin.findByIdAndUpdate(
        id,
        {
          password: hashPassword,
        },
        {
          new: true,
        }
      );
      return res.status(201).json(updateAdminUser);
    }
  } catch (err) {
    return res
      .status(400)
      .json({ error: err, message: `User not updated due to ${err.message}` });
  }
};
