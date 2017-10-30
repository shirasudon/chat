import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { Redirect } from 'react-router'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import { withLoginHandlers, handlerFunctions, Login } from './Login'


describe("handler funcitons", () => {
    let props
    beforeEach( () => {
        props = {
            setUser: jest.fn(),
            user: {
                username: "hitochan",
                password: "mypass"
            },
            login: (user) => {return Promise.resolve(false)},
            setLoginFail: jest.fn(),
        }
    })

    const handleChange = handlerFunctions["handleChange"]
    const handleSubmit = handlerFunctions["handleSubmit"]

    describe("handleChange", () => {

        it("sets username when handleChange is called", () => {
            const event = {
                target: {
                    name: "username",
                    value: "botchan",
                } 
            }
            handleChange(props)(event)
            expect(props.setUser).toHaveBeenCalledWith({
                username: "botchan",
                password: "mypass",
            })
        })

        it("sets password when handleChange is called", () => {
            const event = {
                target: {
                    name: "password",
                    value: "new pass",
                } 
            }
            handleChange(props)(event)
            expect(props.setUser).toHaveBeenCalledWith({
                username: "hitochan",
                password: "new pass",
            })
        })

    })

    describe("handleSubmit", () => {
        it("set loginFail to true when authentication fails", (done) => {
            const event = {
                preventDefault: jest.fn(),
            }
            handleSubmit(props)(event).then( () => {
                expect(event.preventDefault).toHaveBeenCalled()
                expect(props.setLoginFail).toHaveBeenCalledWith(true)
                done()
            })
        })

    })

})

describe("Login", () => {

    it("redirects when authenticated", () => {
        const wrapper = shallow(<Login authenticated={true} user={{username: "hoge", password: "hihi"}}/>)
        expect(wrapper.find(Redirect)).toHaveLength(1)
    })

    it("shows error message when authentication failed", () => {
        const props = {
            handleChange: jest.fn(), 
            handleSubmit: jest.fn(),
            user: {
                username: "hoge", 
                password: "hihi"
            },
            loginFail: true, 
            authenticated: false, 
            classes: {},
        }
        const wrapper = shallow(<Login {...props}/>)
        expect(wrapper.find(".error")).toHaveLength(1)
        expect(wrapper.find(TextField)).toHaveLength(2)
        expect(wrapper.find(Button)).toHaveLength(1)
    })

    it("renders correctly at normal situation", () => {
        const props = {
            handleChange: jest.fn(), 
            handleSubmit: jest.fn(),
            user: {
                username: "hoge", 
                password: "hihi"
            },
            loginFail: false, 
            authenticated: false, 
            classes: {},
        }
        const wrapper = shallow(<Login {...props}/>)
        expect(wrapper.find(".error")).toHaveLength(0)
        expect(wrapper.find(TextField)).toHaveLength(2)
        expect(wrapper.find(Button)).toHaveLength(1)
    })

})
