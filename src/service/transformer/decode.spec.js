// @format

import moment from 'moment'

import { decode } from './decode'
import {
  MESSAGE_CREATED,
  ROOM_CREATED,
  ROOM_DELETED,
  ROOM_MESSAGES_READ_BY_USER,
} from '../../constants/websocket'
import {
  SEND_CHAT_MESSAGE,
  RECEIVE_CREATE_ROOM,
  RECEIVE_DELETE_ROOM,
  RECEIVE_MESSAGE_READ,
} from '../../constants/chat'

it('decodes message_created JSON string', () => {
  const responseStr = JSON.stringify({
    event: MESSAGE_CREATED,
    data: {
      message_id: 1,
      room_id: 2,
      content: 'hello there',
      created_by: 3,
      created_at: '2017-12-26T00:07:03.004699564+09:00',
    },
  })

  const expected = {
    type: SEND_CHAT_MESSAGE,
    payload: {
      id: 1,
      roomId: 2,
      text: 'hello there',
      userId: 3,
      createdAt: moment('2017-12-26T00:07:03.004699564+09:00').valueOf(),
      readBy: [],
    },
  }

  expect(decode(responseStr)).toEqual(expected)
})

it('decodes room_messages_read_by_user JSON string', () => {
  const responseStr = JSON.stringify({
    event: ROOM_MESSAGES_READ_BY_USER,
    data: {
      room_id: 2,
      user_id: 3,
      read_at: '2018-01-05T00:07:03.004699564+09:00',
    },
  })

  const expected = {
    type: RECEIVE_MESSAGE_READ,
    payload: {
      roomId: 2,
      userId: 3,
      readAt: moment('2018-01-05T00:07:03.004699564+09:00').valueOf(),
    },
  }

  expect(decode(responseStr)).toEqual(expected)
})

it('decodes unidentified event string to an obect with type and payload', () => {
  const responseStr = JSON.stringify({
    event: 'NONEXISTING_EVENT',
    data: {
      hello: 'there',
    },
  })

  const expected = {
    type: 'NONEXISTING_EVENT',
    payload: {
      hello: 'there',
    },
  }

  expect(decode(responseStr)).toEqual(expected)
})

it('decodes ROOM_CREATED to RECEIVE_CREATE_ROOM', () => {
  const responseStr = JSON.stringify({
    event: ROOM_CREATED,
    data: {
      room_id: 2,
      name: 'hello',
    },
  })

  const expected = {
    type: RECEIVE_CREATE_ROOM,
    payload: {
      id: 2,
      name: 'hello',
    },
  }

  expect(decode(responseStr)).toEqual(expected)
})

it('decodes ROOM_DELETED to RECEIVE_DELETE_ROOM', () => {
  const responseStr = JSON.stringify({
    event: ROOM_DELETED,
    data: {
      room_id: 2,
      name: 'hello',
    },
  })

  const expected = {
    type: RECEIVE_DELETE_ROOM,
    payload: {
      id: 2,
    },
  }

  expect(decode(responseStr)).toEqual(expected)
})
