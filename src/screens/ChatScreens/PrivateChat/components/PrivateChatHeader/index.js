import { Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import LeftArrow from '../../../../../assets/svgs/leftArrow'
import InfoSvg from '@/assets/svgs/infoSvg'
import Row from '@/components/wrappers/row'
import CircleSvg from '@/assets/svgs/CircleSvg'
import { RW } from '@/theme/utils'
import { useNavigation } from '@react-navigation/native'
import GameInfoModal from './GameInfoModal'
import TeamInfoModal from './TeamInfoModal'

const PrivateChatHeader = ({ gameID, playersLength, type }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'space-around',
        justifyContent: 'space-between',
        // position: 'absolute',
        width: '100%',
        top: '3%',
        zIndex: 9999,
      }}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <Row>
          <LeftArrow />
          <View style={{ marginLeft: RW(8) }}>
            <CircleSvg count={playersLength || 0} />
          </View>
        </Row>
      </Pressable>
      <Pressable onPress={() => setModalVisible(true)}>
        <InfoSvg />
      </Pressable>
      {modalVisible ? (
        type === 'Командный' ? (
          <TeamInfoModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            TeamId={gameID}
          />
        ) : (
          <GameInfoModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            gameID={gameID}
          />
        )
      ) : null}
    </View>
  )
}

export default PrivateChatHeader

const styles = StyleSheet.create({})
