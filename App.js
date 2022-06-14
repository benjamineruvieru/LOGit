import React from 'react';
import withObservables from '@nozbe/with-observables';
import {observeLogs, addLog, deleteLog} from './source/db/DAO/LogDAO';
import {StatusbarController} from './source/constants/Functions';
import Navigation from './source/navigation/StackNav';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

StatusbarController();
LogBox.ignoreLogs(['JSI SQLiteAdapter not available']);

const App = ({logs}) => {
  React.useEffect(() => {
    // addLog({
    //   message:
    //     'Started work on my new project i hope it goes well, am so exicted',
    // });
    // addLog({message: 'Met this cute guy'});
    //deleteLog('nb4ly07vphulwhx0');
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Navigation />
    </GestureHandlerRootView>
  );
};

const enhance = withObservables([], () => ({
  logs: observeLogs(),
}));

export default enhance(App);
