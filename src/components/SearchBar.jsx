import { View, TextInput, StyleSheet } from "react-native";
import React from "react";

export default function SearchBar({ onChangeText, defaultValue ="", placeholder="" }) {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search"
          returnKeyType="search"
          style={styles.search}
          onChangeText={onChangeText}
          defaultValue={defaultValue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#e3ebf2",
    borderRadius: 4,
  },
  search: {
    color: "black",
    fontWeight: "bold",
  },
});
