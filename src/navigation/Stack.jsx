import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Artists from "../views/Artists";
import Concerts from "../views/Concerts";
import Home from "../views/Home";
import Concert from "../views/Concert";
import Cart from "../views/Cart";
import { useTranslation } from "react-i18next";
import Artist from "../views/Artist";

const StackNav = createNativeStackNavigator();

export default function Stack() {
  const {t} = useTranslation()
  return (
    <StackNav.Navigator  >
      <StackNav.Screen name={t('home')} component={Home} options={{ headerShown: false }} />
      <StackNav.Screen name={t('artist')} component={Artists} />
      <StackNav.Screen name={t('art')} component={Artist} />
      <StackNav.Screen name={t('concert')} component={Concerts} />
      <StackNav.Screen name={t('concrt')} component={Concert}/>
      <StackNav.Screen name={t('cart')} component={Cart} />
    </StackNav.Navigator>
  );
}
