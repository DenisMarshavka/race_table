import React from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';

import styles from './styles';

export default ({
  loading = true,

  onNewPageSet = () => {},

  isDriversTabState = true,
  currentPage = 1,
  limitItems = 15,

  listMeta = {},
}) => {
  const [hasNext, setHasNext] = React.useState(true);
  const [hasPrev, setHasPrev] = React.useState(false);

  // const [currentTablePage, setCurrentTablePage] = React.useState(1);

  const {total: totalListItems = 15} =
    listMeta && typeof listMeta === 'object' && Object.keys(listMeta).length
      ? listMeta
      : {};

  const _getTablePagesCount = (totalItems = 0, limit = 15) => {
    let newCount = 1;

    if (totalItems && !isNaN(+totalItems) && limit && !isNaN(+limit))
      newCount = Math.ceil(totalItems / limit);

    return newCount;
  };

  const maxPages = _getTablePagesCount(totalListItems, limitItems);

  React.useEffect(() => {
    setHasPrev(false);
    setHasNext(false);

    _setActivityPagesButtons(currentPage, maxPages);
  }, [loading]);

  const _setActivityPagesButtons = (page = 1, maxCountPages = 1) => {
    console.log('page', page, 'maxCountPages', maxCountPages);

    if (page && !isNaN(+page) && maxCountPages && !isNaN(+maxCountPages)) {
      setHasPrev(+page > 1);
      setHasNext(+page < +maxCountPages);
    }
  };

  const _changeTablePage = (
    isNext = true,
    page = 1,
    maxPagesCount = 1,
    callback = () => {},
  ) => {
    let nextPage = 0;

    if (page && !isNaN(+page) && maxPagesCount && !isNaN(+maxPagesCount)) {
      if (isNext) {
        nextPage = +page < +maxPagesCount ? +page + 1 : +page;
      } else nextPage = +page - 1 && +page - 1 !== 0 ? +page - 1 : +page;
    }

    console.log('nextPagenextPage', nextPage);

    if (nextPage) {
      _setActivityPagesButtons(nextPage, maxPagesCount);
      callback(nextPage);
    }

    return nextPage;
  };

  return (
    <View
      style={{
        flex: 1,
        maxHeight: 35,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={hasPrev ? 0.5 : 1}
        onPress={() =>
          hasPrev
            ? _changeTablePage(false, currentPage, maxPages, onNewPageSet)
            : null
        }>
        <Text style={{flex: 1, color: hasPrev ? '#000' : '#ccc', fontSize: 19}}>
          {'<'}
        </Text>
      </TouchableOpacity>

      <Text>{`${currentPage} of ${maxPages}`}</Text>

      <TouchableOpacity
        activeOpacity={hasNext ? 0.5 : 1}
        onPress={() =>
          hasNext
            ? _changeTablePage(true, currentPage, maxPages, onNewPageSet)
            : null
        }>
        <Text style={{flex: 1, color: hasNext ? '#000' : '#ccc', fontSize: 19}}>
          {'>'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
