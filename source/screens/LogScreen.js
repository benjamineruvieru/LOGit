import {StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  BackView,
  HeaderText,
  Tab,
  NormalText,
  FlatListBody,
} from '../components';
import {FAB, configureFonts} from 'react-native-paper';
import {fontConfig} from '../constants/Functions';
import Colors from '../constants/Colors';
import {SCREEN_HEIGHT} from '../constants/Variables';
import {getDb, createLog, updateLog} from '../db/RealmCRUD';
const LogScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const init = async () => {
      const {logs, realm} = await getDb();

      setData([...logs]);
      // console.log(logs);
      try {
        logs.addListener(() => {
          setData([...logs]);
          //console.log(logs);
        });
      } catch (error) {
        console.error(
          `Unable to update the tasks' state, an exception was thrown within the change listener: ${error}`,
        );
      }

      return () => {
        logs.removeAllListeners();
        realm.close();
      };
    };
    init();
  }, []);

  useEffect(() => {}, []);

  //  const FlatListRef = useRef(null);
  // var data = logs.map(function (i) {
  //   return i._raw;
  // });
  // //console.log(data);
  let len = data.length;

  const [update, setUpdate] = useState(true);
  // useEffect(() => {
  //   if (!data[data.length - 1].isEditting) {
  //     setUpdate(true);
  //   }
  // }, [data]);
  const newLog = () => {
    // ScrollEnd();
    createLog({
      isEditting: false,
      message: 'test',
      date: Date.now(),
      section: 'yhh',
      createdAt: Date.now(),
    });
  };

  const updateFun = async props => {
    updateLog({
      id: 1655819135937,
      isEditting: true,
      message: 'uu',
      date: 1655818423785,
    });
    //setUpdate(prev => !prev);
  };

  const ScrollEnd = () => {
    // console.log(len.length - 1);
    FlatListRef.current.scrollToIndex({index: data.length - 1});
  };

  const FirstLog = async () => {
    const data = await addLog({
      isEditting: false,
      message: 'Started Logging Today',
      date: Date.now(),
    });
  };

  // if (data.length === 0) {
  //   FirstLog();
  // }

  return (
    <BackView>
      <FlatList
        // ref={FlatListRef}
        showsVerticalScrollIndicator={false}
        data={data}
        extraData={data}
        // onContentSizeChange={() =>
        //   FlatListRef.current.scrollToIndex({index: data.length - 1})
        // }
        contentContainerStyle={{paddingBottom: SCREEN_HEIGHT / 4}}
        //initialScrollIndex={data1.length - 1}
        renderItem={data => (
          <FlatListBody data={data} length={len} updateLog={updateFun} />
        )}
      />
      <FAB
        style={styles.fab}
        label={'Add Log'}
        icon="plus"
        color={Colors.grey}
        onPress={() => updateFun(1655819135937)}
        visible={update}
        theme={{
          fonts: configureFonts(fontConfig),
        }}
      />
    </BackView>
  );
};

export default LogScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
  },
});
