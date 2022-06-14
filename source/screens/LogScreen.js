import {StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import {
  BackView,
  HeaderText,
  Tab,
  NormalText,
  FlatListBody,
} from '../components';
import {observeLogs, addLog, updateLog, logs} from '../db/DAO/LogDAO';
import withObservables from '@nozbe/with-observables';
import {FAB, configureFonts} from 'react-native-paper';
import {fontConfig} from '../constants/Functions';
import Colors from '../constants/Colors';
import {SCREEN_HEIGHT} from '../constants/Variables';

const LogScreen = ({logs}) => {
  var data = logs.map(function (i) {
    return i._raw;
  });
  //console.log(data);
  const [update, setUpdate] = useState(true);
  let len = logs.length;
  const newLog = async () => {
    const data = await addLog({isEditting: true, message: 'The test'});
    const complete = await updateLog({
      date: data._raw.created_at,
      id: data._raw.id,
      isEditting: true,
      message: '',
    });
    setUpdate(false);
  };

  const updateLg = async props => {
    //  console.log(props);
    const complete = await updateLog({
      id: props.id,
      isEditting: false,
      message: props.message,
      date: props.date,
    });
    setUpdate(true);
  };
  return (
    <BackView>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        extraData={update}
        contentContainerStyle={{paddingBottom: SCREEN_HEIGHT / 4}}
        initialScrollIndex={logs.length - 1}
        renderItem={data => (
          <FlatListBody data={data} length={len} updateLog={updateLg} />
        )}
      />
      <FAB
        style={styles.fab}
        label={'Add Log'}
        icon="plus"
        color={Colors.grey}
        onPress={() => newLog()}
        visible={update}
        theme={{
          fonts: configureFonts(fontConfig),
        }}
      />
    </BackView>
  );
};

const enhance = withObservables([], () => ({
  logs: observeLogs().observe(),
}));

export default enhance(LogScreen);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
  },
});
