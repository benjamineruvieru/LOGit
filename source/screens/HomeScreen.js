import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  BackView,
  HeaderText,
  Tab,
  IconButton,
  NormalText,
  TextButton,
} from '../components';
import {FAB, configureFonts} from 'react-native-paper';
import Colors from '../constants/Colors';
import {fontConfig} from '../constants/Functions';
import {useNavigation} from '@react-navigation/native';
import mainimage from '../assets/images/sticky-note.png';
import {SCREEN_WIDTH} from '../constants/Variables';
const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <BackView>
      <Tab style={{justifyContent: 'flex-end'}}>
        <IconButton type={'search'} />
        <IconButton type={'settings'} />
      </Tab>
      <NormalText>
        Don't forget, <HeaderText> LOGit</HeaderText>
      </NormalText>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Image
          source={mainimage}
          resizeMode={'contain'}
          style={{height: SCREEN_WIDTH - 100, width: SCREEN_WIDTH - 100}}
        />
      </View>
      <View style={{justifyContent: 'flex-end', paddingBottom: 60}}>
        <TextButton>+ Import Logs</TextButton>
        <TextButton>+ Create New Section</TextButton>
      </View>
      <FAB
        style={styles.fab}
        label={'Add Log'}
        icon="plus"
        color={Colors.grey}
        onPress={() => navigation.navigate('Logs')}
        theme={{
          fonts: configureFonts(fontConfig),
        }}
      />
    </BackView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
  },
});
