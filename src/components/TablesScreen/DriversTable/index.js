import React from 'react';
import {DataTable} from 'react-native-paper';

import DriverRow from './DriverRow';

export default ({
  data = [],
  navigation,
  handleDriverResulstMore = () => {},
}) => (
  <DataTable style={{marginTop: 15}}>
    <DataTable.Header>
      <DataTable.Title style={{marginRight: '5%'}}>Full name</DataTable.Title>

      <DataTable.Title style={{marginRight: '7%'}}>Nationality</DataTable.Title>

      <DataTable.Title style={{marginRight: '5%'}}>Birth Date</DataTable.Title>

      <DataTable.Title>Last races</DataTable.Title>
    </DataTable.Header>

    {data && data.length
      ? data.map((item, index) => (
          <DriverRow
            key={`${item.driverId || 'driver'}-${index}`}
            dataRow={item}
            index={index}
            navigation={navigation}
            onDriverResulstMore={() => handleDriverResulstMore(item.driverId)}
          />
        ))
      : null}
  </DataTable>
);
