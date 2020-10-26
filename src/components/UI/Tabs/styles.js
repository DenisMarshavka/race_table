import {StyleSheet} from 'react-native';
import Constans from './../../../utils/constans';

export default StyleSheet.create({
  wrap: {marginTop: 10, marginBottom: 20},
  tab: {
    width: '50%',
    backgroundColor: Constans.THEME.colors.primary,
    paddingVertical: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  content: {
    color: Constans.THEME.colors.default,
    textAlign: 'center',
    fontSize: 21,
  },
});
