import React from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {Card, DataTable} from 'react-native-paper';
import {connect} from 'react-redux';

import {getRaceResultData, clearRacesData} from './../../actions/table';
import {getAllDrivers, clearDriversData} from './../../actions/drivers';
import DataInfo from './../../hoc/DataInfo';

import {getFullNameDriver} from './../../utils';
import Pagination from './../../components/Pagination';

import styles from './styles';

const DriverRow = ({
  navigation,
  driver = {},
  fullName = '',
  isDriversTable = false,
}) => (
  <DataTable.Cell style={{marginRight: isDriversTable ? '7%' : 0}}>
    <TouchableOpacity
      activateOpacity={0.5}
      onPress={() =>
        navigation.navigate('DriverProfile', {
          id: driver.driverId,
          fullName,
        })
      }>
      <Text numberOfLines={1} style={{color: 'red'}}>
        {fullName}
      </Text>
    </TouchableOpacity>
  </DataTable.Cell>
);

const DriversRow = ({
  dataRow = {},
  index = 0,
  navigation = {},
  onDriverResulstMore = () => {},
}) => {
  let fullName = '';

  if (dataRow && Object.keys(dataRow).length) {
    fullName = getFullNameDriver(dataRow);

    return (
      <DataTable.Row>
        <DriverRow
          fullName={fullName}
          navigation={navigation}
          driver={dataRow}
          isDriversTable
        />

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

const RacesRow = ({dataRow = {}, index = 0, navigation}) => {
  if (dataRow && Object.keys(dataRow).length) {
    const driver = dataRow && dataRow.Driver ? dataRow.Driver : {};

    const fullName =
      driver.givenName && driver.familyName
        ? `${driver.givenName} ${driver.familyName}`
        : driver.givenName
        ? driver.givenName
        : driver.familyName
        ? driver.familyName
        : '';

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

        <DriverRow
          fullName={fullName}
          navigation={navigation}
          driver={dataRow.Driver}
        />

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

const RacesTable = ({data = [], navigation}) => (
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

const DriversTable = ({
  data = [],
  navigation,
  handleDriverResulstMore = () => {},
}) => (
  <DataTable style={{marginTop: 15}}>
    {}
    <DataTable.Header>
      <DataTable.Title style={{marginRight: '5%'}}>Full name</DataTable.Title>

      <DataTable.Title style={{marginRight: '7%'}}>Nationality</DataTable.Title>

      <DataTable.Title style={{marginRight: '5%'}}>Birth Date</DataTable.Title>

      <DataTable.Title>Last results</DataTable.Title>
    </DataTable.Header>

    {data && data.length
      ? data.map((item, index) => (
          <DriversRow
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

const TablesScreen = ({
  navigation,

  onAppLoaded = () => {},
  onAppLoadingSet = () => {},

  getRaceResultData = () => {},
  clearRacesData = () => {},
  raceLoading = true,
  raceResult = [],
  raceListMeta = {},
  raceError = null,
  racesByDriverId = false,

  getAllDrivers = () => {},
  clearDriversData = () => {},
  driversLoading = false,
  drivers = [],
  driversListMeta = {},
  driversError = null,
}) => {
  const [isDriversTabState, setIsDriversTabState] = React.useState(true);
  const [
    isDriversResultsByDriver,
    setIsDriversResultsByDriver,
  ] = React.useState(false);

  const [racesOffset, setRacesOffset] = React.useState(0);
  const [racesLimit, setRacesLimit] = React.useState(15);
  const [racesPage, setRacesPage] = React.useState(1);

  const [driversOffset, setDriversOffset] = React.useState(0);
  const [driversLimit, setDriversLimit] = React.useState(15);
  const [driversPage, setDriversPage] = React.useState(1);

  const [
    selectedDriverForRacesResult,
    setSelectedDriverForRacesResult,
  ] = React.useState('');

  React.useEffect(() => {
    getAllDrivers();

    // throw new error('Уупс!');
  }, []);

  React.useEffect(() => {
    if (!raceLoading && !driversLoading) onAppLoadingSet(false);
  }, [raceLoading, driversLoading]);

  const _resetTablesState = () => {
    clearDriversData();
    clearRacesData();

    setRacesOffset(0);
    setDriversOffset(0);

    setRacesLimit(15);
    setDriversLimit(15);

    setDriversPage(1);
    setRacesPage(1);
  };

  const _getNewTableDataRender = () => {
    if (!isDriversTabState && !raceLoading) {
      getRaceResultData(
        isDriversResultsByDriver,
        selectedDriverForRacesResult,
        racesOffset,
        racesLimit,
      );
    } else if (isDriversTabState && !driversLoading)
      getAllDrivers(driversOffset, driversLimit);
  };

  React.useEffect(() => {
    _resetTablesState();
    _getNewTableDataRender();

    if (
      isDriversTabState &&
      selectedDriverForRacesResult &&
      selectedDriverForRacesResult.trim() &&
      isDriversResultsByDriver
    )
      _resetRacesResultsByDriver();
  }, [isDriversTabState]);

  React.useEffect(() => {
    console.log('123');

    _getNewTableDataRender();
  }, [
    racesOffset,
    racesLimit,

    driversOffset,
    driversLimit,

    isDriversResultsByDriver,
  ]);

  React.useEffect(() => {
    _setNewOffset(
      isDriversTabState ? driversPage : racesPage,
      isDriversTabState ? driversLimit : racesLimit,
      isDriversTabState ? setDriversOffset : setRacesOffset,
    );
  }, [racesPage, driversPage]);

  const _setNewOffset = (page = 1, limitItems = 15, setOffset = () => {}) => {
    let newOffset = 0;

    if (page && !isNaN(+page) && limitItems && !isNaN(+limitItems) && +page)
      newOffset = (+page - 1) * +limitItems;

    setOffset(newOffset);
  };

  const _resetRacesResultsByDriver = () => {
    setIsDriversResultsByDriver(false);
    setSelectedDriverForRacesResult('');
  };

  const loading = !isDriversTabState ? raceLoading : driversLoading;
  const error = !isDriversTabState ? raceError : driversError;

  return (
    <View style={styles.container}>
      <Card style={{marginTop: 10, marginBottom: 20}}>
        <Card.Actions>
          <TouchableOpacity
            style={{
              width: '50%',
              backgroundColor: !isDriversTabState ? 'red' : '#fff',
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
              backgroundColor: isDriversTabState ? 'red' : '#fff',
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

      <DataInfo loading={loading} error={error}>
        <Pagination
          loading={loading}
          currentPage={!isDriversTabState ? racesPage : driversPage}
          isDriversTabState={isDriversTabState}
          onNewPageSet={isDriversTabState ? setDriversPage : setRacesPage}
          limitItems={!isDriversTabState ? racesLimit : driversLimit}
          listMeta={!isDriversTabState ? raceListMeta : driversListMeta}
        />

        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 50}}>
          {isDriversTabState ? (
            <DriversTable
              data={drivers}
              navigation={navigation}
              handleDriverResulstMore={(driverId = '') => {
                setIsDriversTabState(false);

                setSelectedDriverForRacesResult(driverId);
                setIsDriversResultsByDriver(true);
              }}
            />
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
              {!isDriversTabState &&
              isDriversResultsByDriver &&
              selectedDriverForRacesResult &&
              selectedDriverForRacesResult.trim() ? (
                <TouchableOpacity
                  activateOpacity={0.5}
                  style={{marginVertical: 15}}
                  onPress={_resetRacesResultsByDriver()}>
                  <Text
                    style={{
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: 18,
                      color: 'red',
                    }}>
                    Get all Races
                  </Text>
                </TouchableOpacity>
              ) : null}

              <RacesTable data={raceResult} navigation={navigation} />
            </View>
          )}
        </ScrollView>
      </DataInfo>
    </View>
  );
};

const mapStateToProps = (state) => ({
  driversLoading: state.driversReducer.driversLoading,
  drivers: state.driversReducer.drivers,
  driversListMeta: state.driversReducer.listMeta,
  driversError: state.driversReducer.driversError,

  raceLoading: state.tableReducer.raceLoading,
  raceResult: state.tableReducer.raceResult,
  raceListMeta: state.tableReducer.listMeta,
  raceError: state.tableReducer.raceError,
  racesByDriverId: state.tableReducer.racesByDriverId,
});

export default connect(mapStateToProps, {
  getRaceResultData,
  clearRacesData,

  getAllDrivers,
  clearDriversData,
})(TablesScreen);
