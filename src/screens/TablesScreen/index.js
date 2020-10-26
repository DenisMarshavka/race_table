import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';

import {getRaceResultData, clearRacesData} from './../../actions/races';
import {getAllDrivers, clearDriversData} from './../../actions/drivers';
import DataInfo from './../../hoc/DataInfo';
import Pagination from './../../components/UI/Pagination';
import {DriversTable, RacesTable} from './../../components/TablesScreen';
import styles from './styles';
import Tabs from './../../components/UI/Tabs';

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

  // React.useEffect(() => {
  //   getAllDrivers();
  //
  //   // throw new error('Уупс!');
  // }, []);

  React.useEffect(() => {
    if (
      (isDriversTabState && !driversLoading) ||
      (!isDriversTabState && !raceLoading)
    )
      onAppLoadingSet(false);
  }, [raceLoading, driversLoading, isDriversTabState]);

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
    _getNewTableDataRender();
  }, [
    racesOffset,
    racesLimit,
    driversOffset,
    driversLimit,
    selectedDriverForRacesResult,
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
    setRacesPage(1);

    setIsDriversResultsByDriver(false);
    setSelectedDriverForRacesResult('');
  };

  const loading = !isDriversTabState ? raceLoading : driversLoading;
  const error = !isDriversTabState ? raceError : driversError;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Tabs
          style={{marginTop: 25}}
          onChangeState={setIsDriversTabState}
          currentState={isDriversTabState}
        />
      </SafeAreaView>

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
            <View style={styles.racesTableWrap}>
              {!isDriversTabState &&
              isDriversResultsByDriver &&
              selectedDriverForRacesResult &&
              selectedDriverForRacesResult.trim() ? (
                <TouchableOpacity
                  activateOpacity={0.5}
                  style={styles.resetButton}
                  onPress={_resetRacesResultsByDriver}>
                  <Text style={styles.resetButtonText}>Get all Races</Text>
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
