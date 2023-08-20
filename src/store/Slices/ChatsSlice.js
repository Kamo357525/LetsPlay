import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../Api'

const initialState = {
  chats: [],
  playMessageId: null,
  pausedMessageId: null,
  voiceDuration: '00:00:00',
  allChats: [],
  allTeamChats: [],
}

export const ChatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (store, action) => {
      return {
        ...store,
        chats: action.payload,
      }
    },
    setPlayMessageId: (store, action) => {
      return {
        ...store,
        playMessageId: action.payload,
      }
    },
    setPausedMessageId: (store, action) => {
      return {
        ...store,
        pausedMessageId: action.payload,
      }
    },
    setVoiceDuration: (store, action) => {
      return {
        ...store,
        voiceDuration: action.payload,
      }
    },
    setAllChats: (store, action) => {
      return {
        ...store,
        allChats: action.payload,
      }
    },
    setDeleteChat: (store, action) => {
      return {
        ...store,
        allChats: store.allChats.filter((elm) => elm._id !== action.payload),
      }
    },
    setAllTeamChats: (store, action) => {
      return {
        ...store,
        allTeamChats: action.payload,
      }
    },
  },
})

export const getAllChats = () => (dispatch) => {
  axiosInstance
    .get('api/create/game/all/create_games')
    .then((response) => {
      dispatch(setAllChats(response.data.data))
    })
    .catch((err) => {
      console.error('Error: getMessagesCount', err)
    })
}
export const deleteChat = (gameId, callBack) => (dispatch) => {
  axiosInstance
    .delete(`api/create/game/${gameId}`)
    .then((res) => {
      callBack()
      console.log('deleteChat', res.data)
      dispatch(setDeleteChat(gameId))
    })
    .catch((err) => {
      console.error('Error: createGame', err.request._response)
    })
}
export const getChats = (data) => (dispatch) => {
  axiosInstance
    .get(`/api/create/game/chat/${data}`)
    .then((response) => {
      dispatch(setChats(response.data.datas.reverse()))
    })
    .catch((err) => {
      console.error('Error: request chats', err.request._response)
    })
}
export const getAllTeamChats = () => (dispatch) => {
  axiosInstance
    .get(`api/team/create/game/all/team_games`)
    .then((response) => {
      dispatch(setAllTeamChats(response.data.data))
    })
    .catch((err) => {
      console.error('Error: getAllTeamChats', err.request._response)
    })
}
export const getTeamChats = (data) => (dispatch) => {
  axiosInstance
    .get(`/api/team/chat/${data}`)
    .then((response) => {
      dispatch(setChats(response.data.datas.reverse()))
    })
    .catch((err) => {
      console.error('Error: request chats', err.request._response)
    })
}
export const sendMessage = (data) => (dispatch) => {
  axiosInstance.post(`/api/create/game/chat/`, data).catch((err) => {
    console.error('Error: request', err.request._response)
  })
}
export const sendTeamMessage = (data) => (dispatch) => {
  axiosInstance
    .post(`/api/team/chat`, data)
    .then((response) => {})
    .catch((err) => {
      console.error('Error: request', err.request._response)
    })
}
export const deleteMemberChat = (chatId, setDeleting) => (dispatch) => {
  axiosInstance
    .delete(`/api/participate/${chatId}`)
    .then((response) => {
      setDeleting(false)
    })
    .catch((err) => {
      console.error('Error: deleting chat deleteMemberChat', err)
    })
}
export const deleteOrganizerChat = (chatId, setDeleting) => (dispatch) => {
  axiosInstance
    .delete(`/api/create/game/${chatId}`)
    .then((response) => {
      setDeleting(false)
    })
    .catch((err) => {
      console.error('Error: deleting chat deleteOrganizerChat', err)
    })
}

export const {
  setChats,
  setPlayMessageId,
  setPausedMessageId,
  setVoiceDuration,
  setAllChats,
  setDeleteChat,
  setAllTeamChats,
} = ChatsSlice.actions
export default ChatsSlice.reducer
