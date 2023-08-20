import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { _storageUrl } from '@/constants'
import { useNavigation } from '@react-navigation/native'
import BgMyTem from '@/assets/bgMyTem'
import FastImage from 'react-native-fast-image'
import { RH, RW, font } from '@/theme/utils'
import { WHITE } from '@/theme/colors'
import ScreenMask2 from '@/components/wrappers/screen2'

function Index() {
  const { findedTeam } = useSelector(({ teams }) => teams)
  const navigation = useNavigation()
  return (
    <ScreenMask2>
      <Text style={styles.title}>Результат поиска</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {findedTeam?.map((item, i) => {
          return (
            <TouchableOpacity
              key={item?._id || Math.random()}
              onPress={() => navigation.navigate('JoinTeam', item)}
              style={styles.homeBlock}
            >
              <View style={{ zIndex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.imageBlock}>
                  <FastImage
                    resizeMode="contain"
                    style={styles.image}
                    source={{ uri: _storageUrl + item?.img }}
                  />
                </View>

                <View style={styles.textBlock}>
                  <Text style={styles.text}>{item?.name}</Text>
                  <Text style={styles.text}>{item?.address_name}</Text>
                  <Text style={styles.text}>{item?._id}</Text>
                </View>
              </View>
              <View style={{ position: 'absolute' }}>
                <BgMyTem />
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </ScreenMask2>
  )
}
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    ...font('bold', 20, WHITE),
    marginVertical: RH(15),
  },
  homeBlock: {
    width: RW(395),
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: RH(5),
  },
  imageBlock: {
    width: RW(80),
    height: RW(80),
    borderWidth: 1,
    borderRadius: 50,
    borderColor: WHITE,
    margin: RW(15),
  },
  image: {
    borderWidth: 1,
    borderRadius: 50,
    width: '100%',
    height: '100%',
  },
  textBlock: {
    width: '70%',
  },
  text: {
    marginVertical: RH(3),
    width: '100%',
    ...font('medium', 15, WHITE),
  },
})

export default Index
