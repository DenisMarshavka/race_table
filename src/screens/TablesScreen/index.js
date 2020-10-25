import React from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {Card, DataTable} from 'react-native-paper';
import {connect} from 'react-redux';

import {getRaceResultData} from './../../actions/table';
import {getAllDrivers} from './../../actions/drivers';

import styles from './styles';

const DriversRow = ({dataRow = {}, index = 0, navigation = {}}) => {
  let fullName = '';

  if (dataRow && Object.keys(dataRow).length) {
    fullName =
      dataRow.givenName && dataRow.familyName
        ? `${dataRow.givenName} ${dataRow.familyName}`
        : dataRow.givenName
        ? dataRow.givenName
        : dataRow.familyName
        ? dataRow.familyName
        : '';

    return (
      <DataTable.Row>
        <TouchableOpacity
          activityOpacity={0.5}
          onPress={() =>
            navigation.navigate('DriverProfile', {
              id: dataRow.driverId,
              fullName,
            })
          }>
          <DataTable.Cell style={{marginRight: 25}}>
            <Text numberOfLines={1} style={{width: '10%', color: 'red'}}>
              {fullName}
            </Text>
          </DataTable.Cell>
        </TouchableOpacity>

        <DataTable.Cell style={{marginRight: 25}}>
          <Text numberOfLines={1} style={{width: '10%', textAlign: 'center'}}>
            {dataRow.nationality ? dataRow.nationality : ''}
          </Text>
        </DataTable.Cell>

        <DataTable.Cell>
          <Text numberOfLines={1} style={{width: '10%'}}>
            {dataRow.dateOfBirth ? dataRow.dateOfBirth : ''}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>
    );
  }

  return null;
};

const TablesScreen = ({
  navigation,

  onAppLoaded = () => {},
  onAppLoadingSet = () => {},

  getRaceResultData = () => {},
  raceLoading = true,
  raceResult = [],
  raceListMeta = {},
  raceError = null,

  getAllDrivers = () => {},
  driversLoading = true,
  drivers = [],
  driversListMeta = {},
  driversError = null,
}) => {
  const [isDriversTabState, setIsDriversTabState] = React.useState(true);

  const {total: raceTotal = 0, offset: raceOffset = 0, limit: raceLimit = 0} =
    raceListMeta &&
    typeof raceListMeta === 'object' &&
    Object.keys(raceListMeta).length
      ? raceListMeta
      : {};

  const {
    total: driversTotal = 0,
    offset: driversOffset = 0,
    limit: driversLimit = 0,
  } =
    driversListMeta &&
    typeof driversListMeta === 'object' &&
    Object.keys(driversListMeta).length
      ? driversListMeta
      : {};

  React.useEffect(() => {
    getAllDrivers();

    // throw new error('Уупс!');
  }, []);

  React.useEffect(() => {
    if (!isDriversTabState) getRaceResultData();
  }, [isDriversTabState]);

  React.useEffect(() => {
    if (raceResult && raceResult.length) {
      console.log('raceResult DATA: ', raceResult);
    }
  }, [raceResult]);

  React.useEffect(() => {
    if (drivers && drivers.length) {
      console.log('drivers DATA: ', drivers);
    }
  }, [drivers]);

  React.useEffect(() => {
    console.log('raceloading status changed: ', raceLoading);
    // console.log(
    //   'race total',
    //   raceTotal,
    //   'race offset',
    //   raceOffset,
    //   'race limit',
    //   raceLimit,
    // );

    if (!raceLoading || !driversLoading) {
      onAppLoadingSet(false);

      if (raceListMeta && Object.keys(raceListMeta).length)
        console.log('raceListMeta', raceListMeta);
      if (driversListMeta && Object.keys(driversListMeta).length)
        console.log('driversListMeta', driversListMeta);
    }
  }, [raceLoading, driversLoading]);

  const renderRaceRow = (dataRow = {}) => {
    if (dataRow && Object.keys(dataRow).length)
      return (
        <DataTable.Row>
          <DataTable.Cell>
            {dataRow.circuitName || 'Неизвестные'}
          </DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>61.30d</DataTable.Cell>
        </DataTable.Row>
      );

    return null;
  };

  const renderRaceTable = (data = []) => {
    if (data && data.length)
      return (
        <DataTable style={{marginTop: 15}}>
          <DataTable.Header>
            <DataTable.Title>Race</DataTable.Title>
            <DataTable.Title numeric>Calories</DataTable.Title>
            <DataTable.Title numeric>Ffvdfvfat</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>Frozen yogurt</DataTable.Cell>
            <DataTable.Cell numeric>159</DataTable.Cell>
            <DataTable.Cell numeric>61.30d</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0 df dc </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      );
  };

  const renderDriversTable = (data = []) => {
    if (data && data.length)
      return (
        <DataTable style={{marginTop: 15}}>
          <DataTable.Header>
            <DataTable.Title style={{marginRight: 25}}>
              Full name
            </DataTable.Title>

            <DataTable.Title style={{marginRight: 25}}>
              Nationality
            </DataTable.Title>

            <DataTable.Title>Birth Date</DataTable.Title>
          </DataTable.Header>

          {data.map((item, index) => (
            <DriversRow
              key={`${item.driverId || 'driver'}-${index}`}
              dataRow={item}
              index={index}
              navigation={navigation}
            />
          ))}
        </DataTable>
      );
  };

  return (
    <View style={styles.container}>
      <Card style={{marginTop: 10, marginBottom: 20}}>
        <Card.Actions>
          <TouchableOpacity
            style={{
              width: '50%',
              backgroundColor: !isDriversTabState ? 'orange' : '#fff',
              paddingVertical: 5,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}
            onPress={() => setIsDriversTabState(false)}>
            <Text
              style={{
                color: !isDriversTabState ? '#fff' : '#ccc',
                textAlign: 'center',
                fontSize: !isDriversTabState ? 21 : 17,
              }}>
              Races
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '50%',
              backgroundColor: isDriversTabState ? 'orange' : '#fff',
              paddingVertical: 5,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}
            onPress={() => setIsDriversTabState(true)}>
            <Text
              style={{
                color: isDriversTabState ? '#fff' : '#ccc',
                textAlign: 'center',
                fontSize: isDriversTabState ? 21 : 17,
              }}>
              Drivers
            </Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>

      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        {isDriversTabState ? renderDriversTable(drivers) : null}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  raceLoading: state.tableReducer.raceLoading,
  raceResult: state.tableReducer.raceResult,
  raceListMeta: state.tableReducer.listMeta,
  raceError: state.tableReducer.raceError,

  driversLoading: state.driversReducer.driversLoading,
  drivers: state.driversReducer.drivers,
  driversListMeta: state.driversReducer.listMeta,
  driversError: state.driversReducer.driversError,
});

export default connect(mapStateToProps, {
  getRaceResultData,
  getAllDrivers,
})(TablesScreen);
