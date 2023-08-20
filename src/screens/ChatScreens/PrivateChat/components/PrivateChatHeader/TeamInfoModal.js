import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LIGHT_LABEL, WHITE } from '@/theme/colors'
import { RH, RW } from '@/theme/utils'
import { FONT_INTER_REGULAR } from '@/theme/fonts'
import ArrowRight from '@/assets/svgs/ArrowRight'
import Modal from '@/components/modal'
import User from '@/components/User/user'
import { useSelector } from 'react-redux'
import dateFormater from '../../../../../helpers/dateFormater'

const TeamInfoModal = ({ modalVisible, setModalVisible, TeamId }) => {
  const { myTeams, myJoinedTeams } = useSelector(({ teams }) => teams)
  const teamInfo =
    myTeams.find((elm) => elm.id == TeamId) || myJoinedTeams.find((elm) => elm.id == TeamId)

  return (
    <Modal
      modalVisible={modalVisible}
      setIsVisible={setModalVisible}
      btnClose={false}
      item={
        <View style={styles.modalWrapper}>
          <View style={styles.regulationBlock}>
            <View style={styles.rowBox}>
              <ArrowRight />
            </View>
            <View style={styles.titleColumnBox}>
              <Text style={styles.title}>Имя команды: {teamInfo?.name}</Text>
              <Text style={styles.title}>
                Дата и время создание команды: {dateFormater(teamInfo?.createdAt)}
              </Text>
              <Text style={styles.title}>Адрес: {teamInfo?.address_name}</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.title}>Организатор команды:</Text>
                <View style={{ left: 10 }}>
                  <User
                    size={30}
                    user={teamInfo?.user}
                    onPressItem={{
                      item: <User size={370} user={teamInfo?.user} />,
                      modalClose: false,
                    }}
                  />
                </View>
              </View>
              {teamInfo.players?.length ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: RH(5) }}>
                  <Text style={styles.title}>Игроки команды:</Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      width: 150,
                      left: 10,
                    }}
                  >
                    {teamInfo.players.map((player) => (
                      <User
                        key={player?._id}
                        size={30}
                        user={player}
                        style={{ marginLeft: RW(5) }}
                        onPressItem={{
                          item: <User size={370} user={player} />,
                          modalClose: false,
                        }}
                      />
                    ))}
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      }
    />
  )
}
export default TeamInfoModal

const styles = StyleSheet.create({
  regulationBlock: {
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    width: RW(357),
    top: '-5%',
    padding: RW(30),
    alignSelf: 'center',
  },
  rowBox: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleColumnBox: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'flex-start',
  },
  title: {
    color: WHITE,
    fontSize: RW(14),
    fontFamily: FONT_INTER_REGULAR,
    paddingTop: '5%',
  },
})
