import { getAllUsers } from './controllers/userController.js';

export const resolvers = {
  Query: {
    users: async (_, __, { req }) => {
      try {
        return await getAllUsers(req);
      } catch (error) {
        throw new Error('Failed to fetch users');
      }
    },
  },
};
