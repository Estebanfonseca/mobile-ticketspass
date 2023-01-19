import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Artists from "../views/Artists";
import Concerts from "../views/Concerts";
import Home from "../views/Home";

const StackNav = createNativeStackNavigator();

export default function Stack() {
  return (
    <StackNav.Navigator>
      <StackNav.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <StackNav.Screen name="Artists" component={Artists} />
      <StackNav.Screen name="Concerts" component={Concerts} />
    </StackNav.Navigator>
  );
}
