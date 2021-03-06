// @format
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Button from 'material-ui/Button'

import { chatActionCreator } from '../actions'
import {
  Chat,
  mapDispatchToProps,
  setChatActionCreator,
  withLifecycles,
  withLifecyclesFactory,
} from './Chat'
import CreateGroupModal from './CreateGroupModal'
import SideTabs from './SideTabs'
import MessageWindow from './MessageWindow'

describe('Chat', () => {
  it('contains CreateGroupModal, Button, SideTabs, MessageWindow ', () => {
    const openCreateGroupModal = jest.fn()
    const wrapper = shallow(
      <Chat classes={{}} openCreateGroupModal={() => {}} />
    )
    expect(wrapper.find(CreateGroupModal)).toHaveLength(1)
    expect(wrapper.find(Button)).toHaveLength(1)
    expect(wrapper.find(SideTabs)).toHaveLength(1)
    expect(wrapper.find(MessageWindow)).toHaveLength(1)
  })

  it('contains calls openCreateGroupModal when a button is clicked ', () => {
    const openCreateGroupModal = jest.fn()
    const wrapper = shallow(
      <Chat classes={{}} openCreateGroupModal={openCreateGroupModal} />
    )
    wrapper.find(Button).simulate('click')
    expect(openCreateGroupModal).toHaveBeenCalled()
  })
})

describe('mapDispatchToProps', () => {
  const chatActionCreator = {
    fetchRooms: jest.fn(roomId => `fetchRooms: ${roomId}`),
    fetchFriends: jest.fn(userId => `fetchFriends: ${userId}`),
    openCreateGroupModal: jest.fn(),
  }
  const dispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    setChatActionCreator(chatActionCreator)
  })

  it('dispatches openCreateGroupModal', () => {
    mapDispatchToProps(dispatch).openCreateGroupModal()
    expect(chatActionCreator.openCreateGroupModal).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalled()
  })
})

describe('componentDidMount', () => {
  it('calls fetchRooms and fetchFriends', () => {
    const DummyComponent = () => <div>Dummy</div>
    const WebSocketService = {
      connect: jest.fn(),
    }
    const Component = withLifecyclesFactory(WebSocketService)(DummyComponent)
    mount(<Component />)
    expect(WebSocketService.connect).toHaveBeenCalledTimes(1)
  })
})
