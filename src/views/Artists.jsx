import { View, FlatList, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import artistsActions from '../redux/actions/artistsactions'
import { ActivityIndicator, Searchbar, Title } from 'react-native-paper'
import ArtistCard from '../components/ArtistCard'
import apiUrl from '../api/url'
import filterArtistActions from '../redux/actions/fiterArtistActions'
import axios from 'axios'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { useTranslation } from 'react-i18next'

export default function Artists({ navigation }) {
  const {t} = useTranslation()
  let dispatch = useDispatch()
  let [isOpen, setIsOpen] = useState(false)
  let [genres, setGenres] = useState([])
  let { artists, loading, message } = useSelector(state => state.artistsReducer)
  let filter = useSelector(state => state.filterArtistReducer)
  let { getArtists, getFilteredArtists } = artistsActions
  let { setChecked, setSearched } = filterArtistActions

  useEffect(() => {
    axios.get(`${apiUrl}/artists`)
      .then(res => {
        let allGenres = Array.from(new Set(res.data.data.map(el => el.genre).reduce((el1, el2) => el1.concat(el2), [])))
        setGenres(allGenres);
      })
      .catch(err => console.log(err.message))
  }, [])

  useEffect(() => {
    if (artists.length < 1 && filter.name === '' && filter.genre.length < 1) {
      dispatch(getArtists())
    } else {
      dispatch(getFilteredArtists(filter))
    }
  }, [filter])

  let onSearch = (text) => {
    let searched = text.trim()
    dispatch(setSearched(searched))
  }
    return (
      
      loading ? <ActivityIndicator animating={true} />  :
      <FlatList
      style={{backgroundColor: 'white'}}
        data={artists}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={{backgroundColor: 'white'}}>
            <ArtistCard item={item} navigation={navigation} />
          </View>
        )}
        ItemSeparatorComponent={<View style={{margin: 5}}></View>}
        ListHeaderComponent={<View>
          <Searchbar placeholder="Search Artist" value={filter.name} onChangeText={onSearch}/>
          <Pressable onPress={() => setIsOpen(!isOpen)} style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', paddingVertical: 8, backgroundColor: '#ebecf0'}}><Title style={{fontWeight: '600', marginEnd: 5}}>Select by genre</Title>{isOpen ? <Image source={require('../../assets/icons8-slide-up-48.png')} style={{width:26,height:26}}/> : <Image source={require('../../assets/icons8-down-button-48.png')} style={{width:26,height:26}}/>}</Pressable>
          {isOpen && <View style={{flexDirection: "row", alignItems: "center", flexWrap: 'wrap', backgroundColor: '#ebecf0'}}>
            {
              genres.length > 0 ?
              genres.map(el => 
                <BouncyCheckbox key={el} fillColor='darkviolet' style={{padding: 10}} text={el} textStyle={{fontSize: 15, textDecorationLine: "none",}} isChecked={filter.genre.includes(el)} onPress={(isChecked) => {
                  let auxArray = [...filter.genre]
                  if(isChecked){
                      auxArray.push(el)
                  }else{
                      auxArray = auxArray.filter(element => element !== el)
                  }
                  let checked = auxArray
                  dispatch(setChecked(checked))
              }}></BouncyCheckbox>
                ) :
              <Text>Cannot get genres</Text>
            }
          </View>}
        </View>}
        ListEmptyComponent={<Title>{message}</Title> }
      />
  );
}
