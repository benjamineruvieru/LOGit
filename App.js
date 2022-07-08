import React from 'react';
import {StatusbarController} from './source/constants/Functions';
import Navigation from './source/navigation/StackNav';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

StatusbarController();
LogBox.ignoreLogs(['JSI SQLiteAdapter not available']);

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Navigation />
    </GestureHandlerRootView>
  );
};

export default App;
