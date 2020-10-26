import {StyleSheet} from 'react-native';
import Constans from './../../../utils/constans';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    maxHeight: 35,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {flex: 1, color: Constans.THEME.colors.light, fontSize: 19},
});
