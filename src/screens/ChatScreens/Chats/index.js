import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ChatItem from '@/screens/ChatScreens/Chats/components/ChatItem'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { RH, RW, font } from '@/theme/utils'
import { LIGHT_GRAY, WHITE } from '@/theme/colors'

import { getAllChats, getAllTeamChats } from '@/store/Slices/ChatsSlice'
import ScreenMask2 from '@/components/wrappers/screen2'

const ChatScreen = () => {
  const { allChats, allTeamChats } = useSelector(({ chats }) => chats)

  const dispatch = useDispatch()

  const isFocused = useIsFocused()

  useEffect(() => {
    dispatch(getAllTeamChats())
    dispatch(getAllChats())
  }, [isFocused])

  return (
    <ScreenMask2>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Чат</Text>
          {allChats?.length || allTeamChats.length ? (
            <>
              <View>
                {allTeamChats?.map((eachChat) => {
                  return (
                    <ChatItem
                      item={eachChat}
                      playersLength={eachChat?.players?.length}
                      key={eachChat?._id}
                      type="Командный"
                    />
                  )
                })}
              </View>
              <View>
                {allChats?.map((eachChat) => {
                  return (
                    <ChatItem
                      item={eachChat}
                      key={eachChat?._id}
                      playersLength={eachChat?.players?.length}
                      type="Игра"
                    />
                  )
                })}
              </View>
            </>
          ) : (
            <Text style={styles.emptyText}>Пусто</Text>
          )}
        </View>
      </ScrollView>
    </ScreenMask2>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: RH(56),
    alignItems: 'center',
  },

  emptyText: {
    paddingTop: '10%',
    ...font('regular', 24, WHITE, 26),
  },

  title: {
    ...font('bold', 24, LIGHT_GRAY, 29),
    marginBottom: RW(27),
  },
})

export default ChatScreen
