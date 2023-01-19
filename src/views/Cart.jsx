import { View, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Divider, Title } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import Product from "../components/Product";
import { useSelector } from "react-redux";
import axios from "axios";
import apiUrl from "../api/url";


export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const { token } = useSelector(store => store.userReducer);

  useEffect(() => {
    const getCart = async () => {
      let headers = { headers: { Authorization: `Bearer ${token}` } };
      try {
        let res = await axios.get(`${apiUrl}/carts`, headers);
        setCart(res.data.response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCart();
  }, []);

  const add = async (item) => {
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    try {
      let res = await axios.post(
        `${apiUrl}/carts`,
        { concertId: item.concertId, quantity: item.quantity + 1 },
        headers
      );
      setCart(res.data.response);
    } catch (error) {
      Alert.alert("Error", error.response ? error.response.data.message || error.response.data : error.message);
    }
  };

  const remove = async (item) => {
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    if (item.quantity > 1) {
      try {
        let res = await axios.post(
          `${apiUrl}/carts`,
          { concertId: item.concertId, quantity: item.quantity - 1 },
          headers
        );
        setCart(res.data.response);
      } catch (error) {
        Alert.alert("Error", error.response ? error.response.data.message || error.response.data : error.message);
      }
    } else {
      Alert.alert("Confirmation", "Are you sure you want to remove this item from the cart?", [
        {
          text: "Cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            removeItem(item, headers);
          },
        },
      ],{cancelable: true});
    }
  };

  const removeItem = async(item, headers) => {
    try {
      let res = await axios.delete(`${apiUrl}/carts?concertId=${item.concertId}`, headers);
      if (res.data.response.items.length === 0) {
        setCart({items: []});
      } else {
        setCart(res.data.response);
      }
    } catch (error) {
      Alert.alert("Error", error.response ? error.response.data.message || error.response.data : error.message);
    }
  }


  return loading ? (
    <ActivityIndicator animating={true} style={styles.message} />
  ) : (
    <View style={styles.listContainer}>
    <FlatList
      data={cart.items}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <Product item={item} add={add} remove={remove} />}
      ItemSeparatorComponent={<Divider />}
      ListHeaderComponent={
        <View>
          <Title style={styles.message}>Cart</Title>
        </View>
      }
      ListEmptyComponent={<Title style={styles.message}>No Products in the cart</Title>}
    />
    <Button mode="contained" style={styles.button}>Pay ${cart.total}</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  message: {
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    borderRadius: 0,
    paddingVertical: 10,
    paddingHorizontal: 5
  }
});
