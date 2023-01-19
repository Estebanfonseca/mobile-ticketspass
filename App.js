import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from './src/navigation/Drawer';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';


export default function App() {

  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
        <Provider store={store}>
          <Drawer/>
        </Provider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
