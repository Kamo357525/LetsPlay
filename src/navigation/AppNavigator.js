import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CircleButton from '@/components/buttons/Circle/Index'
import TabBarButton from '@/components/buttons/tabs'
import { NAV_HEADER_OPTION } from '@/constants'
import { ICON } from '@/theme/colors'

// TAB SCREENS
import ProfileScreen from '@/screens/Profile'
import ChatScreen from '@/screens/ChatScreens/Chats'
import HomeScreen from '@/screens/Home'
import GameSelectScreen from '@/screens/Game'
//TAB SCREENS END
// SCREENS
import Play from '@/screens/Game/Play'
import CreateGameNavigator from './CreateGameNavigator'
import MafiaNavigator from './MafiaNavigator'
import JoinGame from '@/screens/Game/JoinGame/JoinGame'
import TeamNavigator from '@/navigation/TeamNavigator'
import PrivateChat from '@/screens/ChatScreens/PrivateChat'
import ProfileNavigator from '@/navigation/ProfileNavigator'
import GameList from '@/screens/Game/GameList'
import Map from '@/screens/Map/Map'
import GameItem from '@/screens/Game/GameItem/GameItem'
import JoinGameQr from '@/screens/Game/JoinGame/JoinGameQr'
import JoinGameTypes from '@/screens/Game/JoinGame/JoinGameTypes'
import AliasNavigator from './AliasNavigator'
import NotificationNavigator from './NotificationNavigator'
import CalendarNavigator from './CalendarNavigator'
import CrocodileNavigator from './CrocodileNavigator'
import TournamentNavigator from './TournamentNavigator'
// SCREENS END

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const [isHome, setIsHome] = React.useState(true)

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(props) => <TabBarButton {...props} setIsHome={setIsHome} />}
        screenOptions={{
          headerShown: false,
          tabBarVisible: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: ICON,
          tabBarInactiveTintColor: ICON,
        }}
      >
        <Tab.Screen name={'Home'} component={HomeScreen} options={{ gestureEnabled: false }} />
        <Tab.Screen name={'Chat'} component={ChatScreen} />
        <Tab.Screen name={'Profile'} component={ProfileScreen} />
        {/* <Tab.Screen name={'NotificationNavigator'} component={NotificationNavigator} /> */}
      </Tab.Navigator>
      <CircleButton isHome={isHome} setIsHome={setIsHome} />
    </>
  )
}

const AppNavigator = () => {
  return (
    <>
      <Stack.Navigator screenOptions={NAV_HEADER_OPTION}>
        <Stack.Screen name={'TabNavigator'} component={TabNavigator} />
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
        <Stack.Screen name={'NotificationNavigator'} component={NotificationNavigator} />
        <Stack.Screen name={'CalendarNavigator'} component={CalendarNavigator} />
        <Stack.Screen name={'Play'} component={Play} />
        <Stack.Screen name={'Game'} component={GameSelectScreen} />
        <Stack.Screen name={'JoinGame'} component={JoinGame} />
        <Stack.Screen name={'GameItem'} component={GameItem} />
        <Stack.Screen name={'JoinGameTypes'} component={JoinGameTypes} />
        <Stack.Screen name={'JoinGameQr'} component={JoinGameQr} />
        <Stack.Screen name={'CreateGameNavigator'} component={CreateGameNavigator} />
        <Stack.Screen name={'MafiaNavigator'} component={MafiaNavigator} />
        <Stack.Screen name={'AliasNavigator'} component={AliasNavigator} />
        <Stack.Screen name={'TournamentNavigator'} component={TournamentNavigator} />
        <Stack.Screen name={'CrocodileNavigator'} component={CrocodileNavigator} />
        <Stack.Screen name={'TeamNavigator'} component={TeamNavigator} />
        <Stack.Screen name={'ProfileNavigator'} component={ProfileNavigator} />
        <Stack.Screen name={'PrivateChat'} component={PrivateChat} />
        <Stack.Screen name={'GameList'} component={GameList} />
        <Stack.Screen name={'Map'} component={Map} />
      </Stack.Navigator>
    </>
  )
}

export default AppNavigator
