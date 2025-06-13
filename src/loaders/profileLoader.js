import DataLoader from 'dataloader';
import Profile from '../database/models/profile.js';

export const createProfileLoader = () =>
  new DataLoader(async (profileIds) => {
    const profiles = await Profile.findAll({
      where: { id: profileIds },
    });

    const profileMap = new Map(profiles.map(p => [p.id, p]));
    return profileIds.map(id => profileMap.get(id));
  });
