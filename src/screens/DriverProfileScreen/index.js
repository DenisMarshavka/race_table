import React from 'react';
import {View, Text, TouchableOpacity, Alert, Linking} from 'react-native';
import {connect} from 'react-redux';
import {Card, Title, Paragraph, Appbar} from 'react-native-paper';

import DataInfo from './../../hoc/DataInfo';

import {getDriverById, clearDriverData} from './../../actions/drivers';

const TextRow = ({children, style = {}}) => (
  <View
    style={{
      flexDirection: 'row',
      marginBottom: 15,
      justifyContent: 'flex-start',
      alignItems: 'center',
      ...style,
    }}>
    {children}
  </View>
);

const DriverProfileScreen = ({
  navigation,
  route,

  getDriverById = () => {},
  clearDriverData = () => {},
  loading = true,
  info = {},
  meta = {},
  error = null,
}) => {
  const {id = '', fullName = ''} = route && route.params ? route.params : {};
  const {xmlns = ''} =
    meta && typeof meta === 'object' && Object.keys(meta).length ? meta : {};

  const {
    dateOfBirth = '',
    driverId = '',
    familyName = '',
    givenName = '',
    nationality = '',
    url = '',
  } = info && typeof info === 'object' && Object.keys(info).length ? info : {};

  React.useEffect(() => {
    getDriverById(id);

    return () => {
      clearDriverData();
    };
  }, []);

  React.useEffect(() => {
    console.log('driverInfo', info);
  }, [info]);

  const _handleMore = async (url = '') => {
    const supported = await Linking.canOpenURL(url);

    if (url && url.trim() && supported) {
      await Linking.openURL(url);
    } else Alert.alert(`Don't know how to open this URL: ${url}`);
  };

  const e = {
    dateOfBirth: '1956-12-23',
    driverId: 'alboreto',
    familyName: 'Alboreto',
    givenName: 'Michele',
    nationality: 'Italian',
    url: 'http://en.wikipedia.org/wiki/Michele_Alboreto',
  };

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: 'red'}} dark={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />

        <Appbar.Content
          titleStyle={{fontSize: 22, marginTop: 5}}
          subtitleStyle={{fontSize: 17}}
          title={fullName}
          subtitle="Driver"
        />

        <TouchableOpacity
          activityOpacity={0.2}
          onPress={() => (!loading ? _handleMore(xmlns) : null)}>
          <Text
            style={{
              color: 'blue',
              opacity: !loading ? 1 : 0.2,
              textDecorationLine: 'underline',
              fontSize: 20,
              paddingRight: 10,
            }}>
            More
          </Text>
        </TouchableOpacity>
      </Appbar.Header>

      <DataInfo
        style={{paddingTop: 15, paddingHorizontal: 16}}
        loading={loading}
        error={error}>
        <Card>
          <Card.Content>
            <Title style={{marginBottom: 30, textAlign: 'center'}}>
              Info of the Person
            </Title>

            <TextRow>
              <Paragraph style={{fontSize: 18}}>Name: </Paragraph>

              <Text style={{color: 'red'}}>{givenName}</Text>
            </TextRow>

            <TextRow>
              <Paragraph style={{fontSize: 18}}>Family: </Paragraph>

              <Text style={{color: 'red'}}>{familyName}</Text>
            </TextRow>

            <TextRow>
              <Paragraph style={{fontSize: 18}}>Birth date: </Paragraph>

              <Text style={{color: 'red'}}>{dateOfBirth}</Text>
            </TextRow>

            <TextRow style={{marginBottom: 0}}>
              <Paragraph style={{fontSize: 18}}>Nationality: </Paragraph>

              <Text style={{color: 'red'}}>{nationality}</Text>
            </TextRow>
          </Card.Content>
        </Card>
      </DataInfo>
    </View>
  );
};

const mapStateToProps = (state) => ({
  loading: state.driversReducer.driverInfoLoading,
  info: state.driversReducer.driverInfo,
  meta: state.driversReducer.driverMeta,
  error: state.driversReducer.driverInfoError,
});

export default connect(mapStateToProps, {getDriverById, clearDriverData})(
  DriverProfileScreen,
);
