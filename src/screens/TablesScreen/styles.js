import {StyleSheet} from 'react-native';
import Constans from './../../utils/constans';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    margin: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  resetButton: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
    color: Constans.THEME.colors.primary,
  },
  racesTableWrap: {marginVertical: 15},
  resetButtonText: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
    color: Constans.THEME.colors.primary,
  },
});
