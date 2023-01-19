import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { NavigationContainer , DarkTheme  } from '@react-navigation/native';
import Drawer from './src/navigation/Drawer';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import "./src/i18n";
import { StatusBar } from 'expo-status-bar';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
  },
}

export default function App() {

  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer  >
        <PaperProvider theme={theme}>
        <Provider store={store}>
        <StatusBar style="light" />
        
          <Drawer/>
        </Provider>
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
