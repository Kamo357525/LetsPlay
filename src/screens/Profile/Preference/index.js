import React, { memo, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RH, RW, font } from '@/theme/utils'
import { ACTIVE, INACTIVE, LIGHT_LABEL, WHITE } from '@/theme/colors'
import { getGames } from '@/store/Slices/GamesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserPreferences, getProfileInfo } from '@/store/Slices/AuthSlice'
import LightButton from '@/components/buttons/Button'
import Modal from '@/components/modal'
import { useIsFocused } from '@react-navigation/native'
import ScreenMask2 from '@/components/wrappers/screen2'
function Index() {
  const [myPreferencesActive, setMyPreferencesActive] = useState([])
  const [myPreferencesDesktop, setMyPreferencesDesktop] = useState([])

  const games = useSelector((gameSlice) => gameSlice.games.games)
  const { preferences } = useSelector(({ auth }) => auth.user)

  const [modalVisible, setModalVisible] = useState(false)
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  useEffect(() => {
    dispatch(getProfileInfo())
    if (isFocused && !games.length) {
      dispatch(getGames())
    }
  }, [isFocused])

  useEffect(() => {
    if (games.length && preferences.length) {
      let myPreferencesData = {
        active: [],
        desktop: [],
      }
      games.map((game) => {
        myPreferencesData[game?.category?.name] = [
          ...myPreferencesData[game?.category?.name],
          {
            game: game?.name,
            id: game?._id,
            checked: preferences?.includes(game?._id),
          },
        ]
      })
      setMyPreferencesActive(myPreferencesData.active)
      setMyPreferencesDesktop(myPreferencesData.desktop)
    }
  }, [games, preferences])

  const checkItem = (id, type) => {
    if (type == 'desktop') {
      setMyPreferencesDesktop((prevState) => {
        const newDate = prevState.map((elm) => {
          if (elm.id == id) {
            return { ...elm, checked: !elm.checked }
          } else return elm
        })

        return newDate
      })
    } else {
      setMyPreferencesActive((prevState) => {
        const newDate = prevState.map((elm) => {
          if (elm.id == id) {
            return { ...elm, checked: !elm.checked }
          } else return elm
        })
        return newDate
      })
    }
  }

  const savePreferences = () => {
    const changedPreferences = [
      ...myPreferencesActive.filter((elm) => elm.checked).map((elm) => elm.id),
      ...myPreferencesDesktop.filter((elm) => elm.checked).map((elm) => elm.id),
    ]
    const addPreferences = changedPreferences?.filter((elm) => {
      return !preferences?.includes(elm)
    })
    const deletePreferences = preferences?.filter((elm) => {
      return !changedPreferences?.includes(elm)
    })
    console.log({
      addPreferences,
      deletePreferences,
    })
    dispatch(
      changeUserPreferences({
        addPreferences: ['63ec9183338f6ba3d35e9eee'],
        deletePreferences: ['63ec9238338f6ba3d35e9ef8'],
      }),
    )
    setModalVisible(true)
  }
  return (
    <ScreenMask2>
      <View style={styles.container}>
        <Text style={styles.title}>Мои предпочтения</Text>
        <View style={styles.gameNamesBlock}>
          <Text style={styles.gameNamesTitle}>Предпочтения в играх</Text>
          <Text style={styles.gameNamesTitle}>Настольные игры</Text>
          <View style={styles.gamesBox}>
            {myPreferencesDesktop?.map((elm, i) => {
              return (
                <TouchableOpacity
                  key={elm?.id}
                  onPress={() => checkItem(elm?.id, 'desktop')}
                  style={[
                    styles.gameBtn,
                    {
                      backgroundColor: elm.checked ? ACTIVE : INACTIVE,
                    },
                  ]}
                >
                  <Text style={styles.linkText}>{elm?.game}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
          <Text style={styles.gameNamesTitle}>Активные игры</Text>
          <View style={styles.gamesBox}>
            {myPreferencesActive?.map((elm, i) => {
              return (
                <TouchableOpacity
                  key={elm?.id}
                  onPress={() => checkItem(elm?.id, 'active')}
                  style={[
                    styles.gameBtn,
                    {
                      backgroundColor: elm.checked ? ACTIVE : INACTIVE,
                    },
                  ]}
                >
                  <Text style={styles.linkText}>{elm?.game}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
          <View style={styles.flatListBlock}></View>
        </View>
      </View>
      <LightButton label={'Сохранить'} onPress={savePreferences} style={styles.submitBtn} />
      <Modal
        item={
          <View style={styles.modal}>
            <Text style={styles.successTeam}>Успешно сохранено</Text>
          </View>
        }
        modalVisible={modalVisible}
        setIsVisible={setModalVisible}
        navigationText={'Profile'}
      />
    </ScreenMask2>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: RW(43),
    paddingHorizontal: RW(8),
    alignItems: 'center',
  },
  gameNamesBlock: {
    width: '100%',
  },
  gameNamesTitle: {
    ...font('medium', 18, WHITE, 28),
    marginTop: RH(15),
  },
  gameBtn: {
    alignSelf: 'center',
    marginHorizontal: RW(4),
    borderRadius: RW(10),
    marginTop: RW(23),
  },

  flatListBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '95%',
    alignSelf: 'center',
  },
  gamesBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '95%',
    alignSelf: 'center',
  },
  modal: {
    width: RW(306),
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    padding: RW(50),
    marginHorizontal: RW(30.5),
  },
  successTeam: {
    ...font('inter', 16, WHITE, 20),
    textAlign: 'center',
  },

  submitBtn: {
    position: 'absolute',
    bottom: RH(45),
    zIndex: 11,
    right: RW(5),
  },
  title: {
    ...font('bold', 24, WHITE, 24),
    marginBottom: RW(15),
  },

  linkText: {
    ...font('regular', 16, WHITE, 19),
    paddingHorizontal: RW(12),
    paddingVertical: RH(10),
  },
})
export default memo(Index)
