import React from 'react';
import {Text} from 'react-native';
import {DataTable, Card} from 'react-native-paper';

import RacesRow from './RaceRow';

export default ({data = [], navigation}) => (
  <DataTable style={{marginTop: 15}}>
    {data && data.length
      ? data.map((item, index) => {
          return (
            <React.Fragment key={`${item.Circuit.circuitName}-${index}`}>
              <Card
                style={{
                  width: '100%',
                  marginBottom: 15,
                  paddingVertical: 5,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  {item &&
                  item.Circuit &&
                  item.Circuit.circuitName &&
                  item.Circuit.circuitName.trim()
                    ? item.Circuit.circuitName.trim()
                    : ''}
                </Text>
              </Card>

              <DataTable.Header
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <DataTable.Title>Postition</DataTable.Title>

                <DataTable.Title>N</DataTable.Title>

                <DataTable.Title>Driver</DataTable.Title>

                <DataTable.Title>Time</DataTable.Title>
              </DataTable.Header>

              {item.Results && item.Results.length
                ? item.Results.map((itemRow, indexRow) => (
                    <RacesRow
                      key={`race-${indexRow}`}
                      dataRow={itemRow}
                      index={indexRow}
                      navigation={navigation}
                    />
                  ))
                : null}
            </React.Fragment>
          );
        })
      : null}
  </DataTable>
);
