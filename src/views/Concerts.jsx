import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import concertsActions from "../redux/actions/concertsActions";
import ConcertCard from "../components/ConcertCard";
import { ActivityIndicator, Searchbar, Title } from "react-native-paper";
import { t } from "i18next";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";

export default function Concerts({ navigation }) {
  const dispatch = useDispatch();
  const { getInitialData, getQuery } = concertsActions;
  const { concerts, loading, message, name, type } = useSelector(store => store.concerts);

  useEffect(() => {
    dispatch(getInitialData());
  }, []);

  const onSearch = text => {
    let query = { params: { name: text, type } };
    dispatch(getQuery({ query }));
  };

  const selectData = [
    { name: "—All Types—", value: "" },
    { name: "Concert", value: "concert" },
    { name: "Festival", value: "festival" },
  ]

  return loading ? (
    <ActivityIndicator animating={true} style={styles.message} />
  ) : (
    <FlatList
      data={concerts}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <ConcertCard item={item} navigation={navigation} />}
      ItemSeparatorComponent={<View style={{ margin: 20 }}></View>}
      ListHeaderComponent={
        <View>
          <SelectDropdown
            dropdownStyle={{borderBottomColor: 'black', borderBottomWidth: 1 }}
            buttonStyle={{width: "100%", borderBottomColor: 'lightgray', backgroundColor: 'white', borderBottomWidth: 1, borderTopColor: 'lightgray', borderTopWidth: 1 }}
            selectedRowStyle={{backgroundColor: 'lightgray'}}
            onSelect={(selectedItem) => {
              let query = { params: {name, type: selectedItem.value} }
              dispatch(getQuery({ query }));
            }}
            renderDropdownIcon={() => <FontAwesome name="caret-down" size={24} color="black" />}
            data={selectData}
            buttonTextAfterSelection={selectedItem => selectedItem.name}
            rowTextForSelection={selectedItem => selectedItem.name}
            defaultValueByIndex={0}
          />
          <Searchbar placeholder={t("search_c")} onChangeText={onSearch} />
        </View>
      }
      ListEmptyComponent={<Title style={styles.message}>{message}</Title>}
    />
  );
}

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    marginTop: 20,
  },
});
