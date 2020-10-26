import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {DataTable} from 'react-native-paper';

import DriverField from './../../DriverField';

export default ({
  dataRow = {},
  index = 0,
  navigation = {},
  onDriverResulstMore = () => {},
}) => {
  if (dataRow && Object.keys(dataRow).length) {
    return (
      <DataTable.Row>
        <DriverField navigation={navigation} driver={dataRow} isDriversTable />

        <DataTable.Cell style={{marginRight: '8%'}}>
          <Text numberOfLines={1} style={{maxWidth: '12%'}}>
            {dataRow.nationality ? dataRow.nationality : ''}
          </Text>
        </DataTable.Cell>

        <DataTable.Cell style={{marginRight: '8%'}}>
          <Text numberOfLines={1} style={{maxWidth: '12%'}}>
            {dataRow.dateOfBirth ? dataRow.dateOfBirth : ''}
          </Text>
        </DataTable.Cell>

        <DataTable.Cell>
          <TouchableOpacity activateOpacity={0.5} onPress={onDriverResulstMore}>
            <Text numberOfLines={1} style={{color: 'red'}}>
              More...
            </Text>
          </TouchableOpacity>
        </DataTable.Cell>
      </DataTable.Row>
    );
  }

  return null;
};
