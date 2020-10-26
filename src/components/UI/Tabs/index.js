import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Card} from 'react-native-paper';

import Constans from './../../../utils/constans';
import styles from './styles';

const Content = ({style = {}, text = '', isActive = false}) => (
  <Text
    style={{
      ...styles.content,
      color: isActive
        ? Constans.THEME.colors.default
        : Constans.THEME.colors.primary,
      fontSize: isActive ? 21 : 17,
      ...style,
    }}>
    {text}
  </Text>
);

export default ({
  style = {},
  currentState = false,
  onChangeState = () => {},
}) => (
  <Card style={{...styles.wrap, ...style}}>
    <Card.Actions>
      <TouchableOpacity
        style={{
          ...styles.tab,
          backgroundColor: !currentState
            ? Constans.THEME.colors.primary
            : Constans.THEME.colors.default,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
        }}
        onPress={() => onChangeState(false)}>
        <Content text="Races" isActive={!currentState} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          ...styles.tab,
          backgroundColor: currentState
            ? Constans.THEME.colors.primary
            : Constans.THEME.colors.default,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}
        onPress={() => onChangeState(true)}>
        <Content text="Drivers" isActive={currentState} />
      </TouchableOpacity>
    </Card.Actions>
  </Card>
);
