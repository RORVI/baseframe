const getProfile = async (req, res, next) => {
    try {
      const models = req.app.get('models');
      if (!models) {
        console.error('❌ Models not found on req.app');
        return res.status(500).json({ error: 'Models not initialized' });
      }
  
      const { Profile } = models;
      const profileId = req.get('profile_id');
      if (!profileId) return res.status(401).json({ error: 'Missing profile_id header' });
  
      const profile = await Profile.findOne({ where: { id: profileId } });
      if (!profile) return res.status(401).json({ error: 'Profile not found' });
  
      req.profile = profile;
      next();
    } catch (err) {
      console.error('❌ Error in getProfile middleware:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = getProfile;