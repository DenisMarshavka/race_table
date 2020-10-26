import {StyleSheet} from 'react-native';
import Constans from './../../utils/constans';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Constans.THEME.colors.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Constans.THEME.colors.primary,
    fontSize: Constans.THEME.sizes.font.big,
    maxWidth: '80%',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
