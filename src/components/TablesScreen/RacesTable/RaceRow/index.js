import React from 'react';
import {Text} from 'react-native';
import {DataTable} from 'react-native-paper';

import DriverField from './../../DriverField';

export default ({dataRow = {}, index = 0, navigation}) => {
  if (dataRow && Object.keys(dataRow).length) {
    return (
      <DataTable.Row
        style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <DataTable.Cell>
          <Text numberOfLines={1}>
            {dataRow.position ? dataRow.position : ''}
          </Text>
        </DataTable.Cell>

        <DataTable.Cell>
          <Text numberOfLines={1}>{dataRow.number ? dataRow.number : ''}</Text>
        </DataTable.Cell>

        <DriverField navigation={navigation} driver={dataRow.Driver} />

        <DataTable.Cell>
          <Text numberOfLines={1}>
            {dataRow && dataRow.Time && dataRow.Time.time
              ? dataRow.Time.time
              : ''}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>
    );
  }

  return null;
};
