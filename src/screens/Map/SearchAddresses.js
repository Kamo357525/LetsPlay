import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native'
import { RH, RW } from '@/theme/utils'
import { BACKGROUND, ICON } from '@/theme/colors'
import { useNavigation } from '@react-navigation/native'
import { fetchAddress } from './fetchAddress'
import { useDispatch, useSelector } from 'react-redux'
import { setLatitude, setLongitude, setPlaceName } from '@/store/Slices/GameCreatingSlice'
import Geolocation from 'react-native-geolocation-service'
import MapSvg from '@/assets/svgs/mapSvg'
import { setModalOptions } from '@/store/Slices/AppSlice'

const SearchAddresses = ({
  game,
  setAddressName = () => {},
  addressName = '',
  navigateTo = '',
  command = null,
  size = 380,
}) => {
  const inp = useRef()
  const [state, setState] = useState('')
  const [addresses, setAddresses] = useState(null)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const initialState = useSelector((state) => state.game)

  const checkPermissionAndNavigate = async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          navigation.navigate('Map', { game: game, navigateTo: navigateTo, command: command })
        } else {
          dispatch(
            setModalOptions({
              type: 'error',
              visible: true,
              body: 'Доступ к местоположению запрещен',
            }),
          )
        }
      } catch (err) {
        console.warn(err)
      }
    } else {
      let geo = await Geolocation.requestAuthorization('always')
      if (geo === 'granted') {
        navigation.navigate('Map', { game: game, navigateTo: navigateTo, command: command })
      } else {
        dispatch(
          setModalOptions({
            type: 'error',
            visible: true,
            body: 'Доступ к местоположению запрещен',
          }),
        )
      }
    }
  }
  useEffect(() => {
    setAddresses('')
    // dispatch(setPlaceName(''))
    setState(!command ? '' : command?.address_name)
  }, [])
  useEffect(() => {
    setState(command ? command?.address_name : initialState?.address_name)
  }, [initialState.address_name])
  const makeURL = async (state) => {
    try {
      const res = fetchAddress(false, null, null, state).then(async (e) => {
        await fetch(e.url)
          .then((r) => {
            return r?.json()
          })
          .then((s) => {
            if (s.results?.length) {
              let response = s.results[0]?.formatted_address
              setAddresses(response)
              setAddressName({
                address_name: response,
                lat: s.results[0]?.geometry.bounds?.northeast.lat,
                lng: s.results[0]?.geometry.bounds?.northeast?.lng,
              })

              dispatch(setLatitude(s.results[0]?.geometry.bounds?.northeast.lat))
              dispatch(setLongitude(s.results[0]?.geometry.bounds?.northeast?.lng))
            }
          })
      })
      return res
    } catch (err) {
      return console.log('err', err)
    }
  }
  const chooseAddress = () => {
    setState(addresses)
    if (state?.length >= 35) {
      setState(state.split().reverse().join().substring(0, 32) + '...')
    }
    setAddresses(null)
    dispatch(setPlaceName(addressName.address_name))
  }
  useEffect(() => {
    if (state?.length >= 5) {
      makeURL()
    } else {
      setAddresses(null)
      setAddressName('')
    }
  }, [state?.length])
  return (
    <View style={{ flexDirection: 'column' }}>
      <View
        style={[
          styles.container,
          { width: RW(size) },
          addresses ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : null,
        ]}
      >
        <TextInput
          style={styles.input}
          ref={inp}
          placeholder={'Адрес проведения игры'}
          placeholderTextColor={ICON}
          value={state}
          onChangeText={(e) => {
            setState(e)
            if (state?.length >= 4) {
              makeURL(state)
            }
          }}
        ></TextInput>
        <TouchableOpacity onPress={checkPermissionAndNavigate} style={styles.mapIcon}>
          <MapSvg />
        </TouchableOpacity>
      </View>
      {addresses && (
        <Pressable style={styles.responseAddress} onPress={chooseAddress}>
          <Text style={styles.searchedAddress}>{addresses}</Text>
        </Pressable>
      )}
    </View>
  )
}

export default SearchAddresses

const styles = StyleSheet.create({
  searchIcon: {
    width: '15%',
    alignItems: 'center',
  },
  container: {
    backgroundColor: BACKGROUND,
    width: RW(380),
    height: RH(50),
    alignSelf: 'center',
    flexDirection: 'row',
    // top: RH(32),
    zIndex: 89,
    borderRadius: RW(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: ICON,
    width: '80%',
    marginLeft: RW(20),
    fontSize: RW(16),
  },
  responseAddress: {
    backgroundColor: BACKGROUND,
    width: RW(380),
    height: RH(55),
    alignSelf: 'center',
    zIndex: 888,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: RW(10),
    borderBottomRightRadius: RW(10),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  searchedAddress: {
    color: ICON,
    fontSize: RW(16),
    marginLeft: RW(20),
  },
  mapIcon: {
    left: '25%',
  },
})
