import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useDebugValue, useEffect, useState } from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { useNavigation } from '@react-navigation/native'
import { _storageUrl } from '@/constants'
import { font, RH, RW } from '@/theme/utils'
import { BACKGROUND, ICON, WHITE } from '@/theme/colors'
import SearchAddresses from '@/screens/Map/SearchAddresses'
import LightButton from '@/components/buttons/Button'
import { launchImageLibrary } from 'react-native-image-picker'
import UploadIcon from '@/assets/svgs/uploadPhotoIcon'
import { editMyTeam } from '@/store/Slices/TeamSlice'
import { useDispatch, useSelector } from 'react-redux'

const EditTeamInfo = ({ route }) => {
  const command = route.params
  const address_name = command?.address_name
  const [addresName, setAddressName] = useState('')
  const [name, setName] = useState(command?.name)
  const [photo, setPhoto] = useState({ uri: _storageUrl + command?.img })
  const { token } = useSelector(({ auth }) => auth)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const uploadPhoto = async () => {
    await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    }).then((result) => {
      if (result?.assets?.[0]?.uri) {
        setPhoto(result.assets[0])
      } else {
        setPhoto(null)
      }
    })
  }
  const hundleSubmit = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('address_name', addresName)
    // formData.append('image', photo)
    formData.append('image', {
      name: photo?.fileName,
      type: photo?.type,
      uri: photo?.uri,
    })
    // formData.append('latitude', 0)
    // formData.append('longitude', 0)

    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'multipart/form-data')
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append('Accept', 'application/json')
    let requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    }
    fetch(
      Platform.OS == 'ios'
        ? 'https://to-play.ru/api/team/' + command?._id
        : 'http://to-play.ru/api/team/' + command?._id,
      requestOptions,
    )
      .then((result) => result.json())
      .then((result) => {
        navigation.navigate('MyTeamInfo', {
          command: {
            ...command,
            name: name,
            address_name: addresName,
            img: photo.uri,
          },
        })
      })
      .catch((error) => console.log('error', error))
  }
  useEffect(() => {
    if (address_name) setAddressName(address_name)
  }, [address_name])
  return (
    <ScreenMask>
      <View style={styles.row}>
        <ImageBackground
          source={{ uri: photo.uri }}
          resizeMode="cover"
          style={styles.img}
          imageStyle={styles.img}
        >
          <Pressable style={styles.uploadBtn} onPress={uploadPhoto}>
            <UploadIcon />
          </Pressable>
        </ImageBackground>
        <TextInput style={styles.input} value={name} onChangeText={(e) => setName(e)} />
      </View>
      <View style={styles.colBox}>
        <Text style={styles.text}>Адрес нахождения команды:</Text>
        <SearchAddresses
          addressName={addresName}
          setAddressName={setAddressName}
          navigateTo="EditTeam"
          command={command}
          show={true}
        />
      </View>
      <View style={styles.bottomBox}>
        <LightButton
          label={'Сохранить'}
          size={{ width: RW(366), height: RH(50) }}
          // onPress={() => navigation.navigate('MyTeamInfo', command)}
          onPress={hundleSubmit}
        />
      </View>
    </ScreenMask>
  )
}

export default EditTeamInfo

const styles = StyleSheet.create({
  img: {
    width: RW(120),
    height: RW(120),
    borderRadius: RW(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtn: {
    zIndex: 93,
    height: '100%',
    width: '100%',
    borderRadius: RW(60),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  input: {
    backgroundColor: BACKGROUND,
    marginBottom: RH(49),
    borderRadius: RW(10),
    width: RW(246),
    height: RH(48),
    color: ICON,
    top: '4%',
    paddingLeft: RW(24),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: RH(40),
  },
  text: {
    marginVertical: RH(15),
    ...font('regular', 16, WHITE),
  },
  colBox: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  bottomBox: {
    position: 'absolute',
    bottom: RW(30),
    alignSelf: 'center',
  },
})
