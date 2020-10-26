import {StyleSheet} from 'react-native';
import Constans from './../../utils/constans';

export default StyleSheet.create({
  headMoreButton: {
    color: Constans.THEME.colors.link,
    opacity: 1,
    textDecorationLine: 'underline',
    fontSize: 20,
    paddingRight: 10,
  },
  head: {backgroundColor: Constans.THEME.colors.primary},
  headTitle: {fontSize: 22, marginTop: 5},
  headSubtitle: {fontSize: 17},
  content: {paddingTop: 15, paddingHorizontal: 16},
  title: {marginBottom: 30, textAlign: 'center'},
});
