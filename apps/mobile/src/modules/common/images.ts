import type { ImageSourcePropType } from 'react-native';

// Photos and logos from maasafatmarathon.com, keyed by event or edition slug
export const images = {
  logo: require('../../../assets/images/logo.png'),
  logoWhite: require('../../../assets/images/logo-white.png'),
  hero: require('../../../assets/images/rum-9th.jpg'),
};

export const eventImages: Record<string, ImageSourcePropType> = {
  'rum-international-marathon': require('../../../assets/images/rum-marathon.jpg'),
  'jordan-eco-trail': require('../../../assets/images/eco-trail.jpg'),
  'rum-marathon-10th': require('../../../assets/images/rum-10th.jpg'),
  'rum-marathon-9th': require('../../../assets/images/rum-9th.jpg'),
  'eco-trail-4th': require('../../../assets/images/eco-trail-4th.jpg'),
};

// Logo is 1430 x 299
export const LOGO_ASPECT = 1430 / 299;
