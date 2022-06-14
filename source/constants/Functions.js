import {StatusBar, Platform} from 'react-native';
import Colors from './Colors';

export const StatusbarController = () => {
  StatusBar.setBarStyle('light-content', true);
  Platform.OS !== 'ios' && StatusBar.setBackgroundColor(Colors.bagDark);
};

export const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'Gilmer Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Gilmer Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Gilmer Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Gilmer Outline',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Gilmer Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Gilmer Bold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Gilmer Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Gilmer Outline',
      fontWeight: 'normal',
    },
  },
};
