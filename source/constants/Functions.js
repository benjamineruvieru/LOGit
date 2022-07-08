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

export function calculateRatio(num_1, num_2) {
  // for (num = num_2; num > 1; num--) {
  //   if (num_1 % num == 0 && num_2 % num == 0) {
  //     num_1 = num_1 / num;
  //     num_2 = num_2 / num;
  //   }
  // }
  let num;
  if (num_2 > num_1) {
    num = num_2 / num_1;
  } else {
    num = num_1 / num_2;
  }

  var ratio = num_1 / num + ':' + num_2 / num;
  return ratio;
}
