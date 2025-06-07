const { Profile } = require('../database/models');

module.exports = {
  Query: {
    profiles: async () => {
      return await Profile.findAll();
    },
  },
};
