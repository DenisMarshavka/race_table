import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {DataTable} from 'react-native-paper';

import Constans from './../../utils/constans';
import {getFullNameDriver} from './../../utils';

export default ({navigation, driver = {}, isDriversTable = false}) => {
  const fullName = getFullNameDriver(driver);

  return (
    <DataTable.Cell style={{marginRight: isDriversTable ? '7%' : 0}}>
      <TouchableOpacity
        activateOpacity={0.5}
        onPress={() =>
          navigation.navigate('DriverProfile', {
            id: driver.driverId,
            fullName,
          })
        }>
        <Text numberOfLines={1} style={{color: Constans.THEME.colors.primary}}>
          {fullName}
        </Text>
      </TouchableOpacity>
    </DataTable.Cell>
  );
};
