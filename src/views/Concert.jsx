import { View, Text, StyleSheet, ScrollView, Image, Alert, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../api/url";
import { ActivityIndicator, Button, Divider, Paragraph, Title } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import dateFormatter from "../utils/dateFormatter";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { useTranslation } from "react-i18next";

export default function Concert({ route }) {
  const { t } = useTranslation();
  const { id } = route.params;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [concert, setConcert] = useState(null);
  const { logged, token } = useSelector(store => store.userReducer);
  const [items, setItems] = useState([]);
  const {navigate} = useNavigation();
  useEffect(() => {
    getConcert();
  }, [id]);

  const getConcert = async () => {
    try {
      let res = await axios.get(`${apiUrl}/concerts/${id}`);
      setConcert(res.data.response);
      setMessage("");
    } catch (error) {
      setMessage(`${error.response ? error.response.data.message || error.response.data : error.message}`);
    } finally {
      setLoading(false);
    }
    await getCart();
  };

  const getCart = async () => {
    if (logged) {
      let headers = { headers: { Authorization: `Bearer ${token}` } };
      try {
        let res = await axios.get(`${apiUrl}/api/carts`, headers);
        setItems(res.data.response.items);
      } catch {
        setItems([]);
      }
    }
  };

  const addToCart = async () => {
    if (logged) {
      let headers = { headers: { Authorization: `Bearer ${token}` } };
      try {
        let res = await axios.post(`${apiUrl}/carts`, { concertId: id, quantity: 1 }, headers);
        setItems(res.data.response.items);
      } catch (error) {
        Alert.alert("Error", `${error.response ? error.response.data.message || error.response.data : error.message}`);
      }
    } else {
      Alert.alert(t("Error"), t("alert_ticket_cart"));
    }
  };

  return loading ? (
    <ActivityIndicator animating={true} style={styles.message} />
  ) : !!concert ? (
    <ScrollView>
      <Image source={{ uri: concert.banner }} style={styles.banner} />
      <View style={styles.content}>
        <Title style={styles.capitalize}>{concert.name}</Title>
        <Paragraph style={styles.bottomSpace}>{concert.description}</Paragraph>
        <Divider />
        <Paragraph style={styles.capitalize}>
          <FontAwesome name="map-signs" /> {concert.venue.name} {concert.venue.address} {concert.venue.city}{" "}
          {concert.venue.country}
        </Paragraph>
        <Paragraph>
          <FontAwesome name="calendar" /> {dateFormatter(concert.date)}
        </Paragraph>
        <Title style={styles.capitalize}>{concert.type === "festival" ? "Lineup" : t("art")}</Title>
        {concert.artists.map(artist => (
          <Pressable  key={artist._id} onPress={() => navigate(t('art'), {id: artist._id})}>
            <Paragraph>
              <FontAwesome name="music" /> {artist.name}
            </Paragraph>
          </Pressable>
        ))}
      </View>
      <Divider />
      <View>
        <View style={styles.categoryContent}>
          <Title style={styles.categoryTitle}>{t("ticket")}</Title>
          <View style={styles.row}>
            <Text style={styles.categoryName}>{concert.category.name}</Text>
            <Text>${concert.category.price} ARS</Text>
          </View>
        </View>
        <Button
          icon="cart"
          mode="contained"
          onPress={addToCart}
          style={styles.button}
          disabled={items.some(
            product => product.categoryName === concert.category.name && product.concertId === concert._id
          )}
        >
          {items.some(product => product.categoryName === concert.category.name && product.concertId === concert._id)
            ? "Added to cart"
            : "Add to cart"}
        </Button>
      </View>
    </ScrollView>
  ) : (
    <Title style={styles.message}>{message}</Title>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  message: {
    textAlign: "center",
    marginTop: 20,
  },
  capitalize: {
    textTransform: "capitalize",
  },
  banner: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  button: {
    borderRadius: 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomSpace: {
    marginBottom: 20,
  },
  categoryContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  categoryTitle: {
    textAlign: "center",
    marginBottom: 15,
  },
  categoryName: {
    textTransform: "capitalize",
    textDecorationLine: "underline",
  },
});
