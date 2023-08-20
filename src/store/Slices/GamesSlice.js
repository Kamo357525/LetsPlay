import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../Api'
import { setModalOptions } from './AppSlice'
import {
  setAge_restrictions_from,
  setAge_restrictions_to,
  setNumber_of_players_from,
  setNumber_of_players_to,
  setOrganizer_in_the_game,
  setPlaceName,
  setPlayers_gender,
} from './GameCreatingSlice'

const initialState = {
  games: [],
  gameFinishPhoto: null,
}

export const GameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    setGames: (store, action) => {
      return {
        ...store,
        games: action.payload,
      }
    },
    setGameFinishPhoto: (store, action) => {
      return {
        ...store,
        gameFinishPhoto: action.payload,
      }
    },
  },
})

export const getGames = () => (dispatch) => {
  axiosInstance
    .get(`api/game`)
    .then((response) => {
      dispatch(setGames(response.data.games))
    })
    .catch((err) => {
      console.error('Error: request', err.request._response)
    })
}

export const joinGame = (gameId, nav, setError, setModalVisible) => async (dispatch) => {
  console.log('gameId', gameId)
  axiosInstance
    .post(`api/participate/${gameId}`)
    .then((response) => {
      if (response.data.message !== 'Success') {
        setError(response.data.message)
        setModalVisible(true)
      } else {
        setModalVisible(false), nav.navigate('Home')
      }
    })
    .catch((err) => {
      console.error('Error: joining to game :', err.request?._response)
    })
}
export const participateToGame = (gameId) => (dispatch) => {
  axiosInstance
    .post(`api/create/game/player/confirm/${gameId}`)
    .then((response) => {
      console.log('participateToGame response', response.data)
      dispatch(
        setModalOptions({
          visible: true,
          type: 'message',
          body: 'Вы подключились к игру',
        }),
      )
    })
    .catch((err) => {
      console.error('Error: request', err.request._response)
    })
}
export const confirmPhotoAfterFinishGame = (data) => (dispatch) => {
  axiosInstance
    .put(`api/create/game/confirm_file`, data)
    .then((response) => {
      console.log('confirmPhotoAfterFinishGame result', response.data)
    })
    .catch((err) => {
      console.error('Error: confirmPhotoAfterFinishGame', err.request._response)
    })
}

export const callEndGame = (game_id) => (dispatch) => {
  axiosInstance
    .post(`api/create/game/player/end/${game_id}`)
    .then((response) => {
      console.log('callEndGame result', response.data)
    })
    .catch((err) => {
      console.error('Error: callEndGame', err.request._response)
    })
}
export const ratePlayersAfterFinishGame = (data, navigation) => (dispatch) => {
  axiosInstance
    .post(`api/create/game/create_game/rating`, data)
    .then((response) => {
      console.log('ratePlayersAfterFinishGame result', response.data)
      navigation.navigate('Home')
    })
    .catch((err) => {
      console.error('Error: ratePlayersAfterFinishGame', err.request._response)
    })
}
export const rateOrganizerAfterFinishGame = (data) => (dispatch) => {
  axiosInstance
    .post(`api/create/game/create_game/organizer_rating`, data)
    .then((response) => {
      console.log('rateOrganizerAfterFinishGame result', response.data)
    })
    .catch((err) => {
      console.error('Error: rateOrganizerAfterFinishGame', err.request._response)
    })
}
export const followUser = (data) => (dispatch) => {
  axiosInstance
    .post(`api/user/follow`, data)
    .then((response) => {
      console.log('followUser result', response.data)
    })
    .catch((err) => {
      console.error('Error: followUser', err.request._response)
    })
}
export const getGameById =
  (create_game_id, callBack = () => {}) =>
  async (dispatch) => {
    await axiosInstance
      .get(`api/create/game/${create_game_id}`)
      .then((response) => {
        if (response.data.data) {
          console.log('response.data.data.address_nam', response.data.data.address_nam)
          dispatch(setAge_restrictions_from(response.data.data.age_restrictions_from))
          dispatch(setAge_restrictions_to(response.data.data.age_restrictions_to))
          dispatch(setNumber_of_players_from(response.data.data.number_of_players_from))
          dispatch(setNumber_of_players_to(response.data.data.number_of_players_to))
          dispatch(setPlaceName(response.data.data.address_name))
          dispatch(setPlayers_gender(response.data.data.players_gender))
          dispatch(setOrganizer_in_the_game(response.data.data.organizer_in_the_game))
          callBack(response.data.data.game, {
            start_date: response.data.data.start_date,
            players_gender: response.data.data.players_gender,
            end_date: response.data.data.end_date,
            organizer_in_the_game: response.data.data.organizer_in_the_game,
          })
        }
      })
      .catch((err) => {
        console.error('Error: getGameById', err.request._response)
      })
  }

export const { setGames, setGameFinishPhoto } = GameSlice.actions
export default GameSlice.reducer
