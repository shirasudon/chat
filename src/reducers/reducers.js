import {RECEIVE_FRIENDS, RECEIVE_ROOMS, RECEIVE_ROOM_INFO, SENDING_ENTER_ROOM} from '../actions/chat';

const initialFriend = {
    username: "",
    lastName: "",
    firstName: ""
};

export function friend(state = initialFriend, action) {
    switch(action.type) {
        case RECEIVE_FRIENDS:
             return Object.assign({}, state, {
                 username: action.username,
                 lastName: action.lastName,
                 firstName: action.firstName,
            }); 
        default:
            return state;
    }
}

export function friends(state = {byUsername: {}, all: []}, action){
    switch(action.type){
        case RECEIVE_FRIENDS:
            let newState = {byUsername: {}, all: []};
            action.friends.forEach((f, index) => {
                newState["byUsername"][f.username] = friend(undefined, {type: action.type, ...f});
                newState.all.push(f.username);
            });
            return newState;
        default:
            return state;
    }
}

export function room(state = {id: null, name: null, initialFetch: false, messages: [], members: []}, action){
    switch(action.type){
        case RECEIVE_ROOM_INFO:
            return Object.assign({}, state, {
                messages: action.messages,
                members: action.members,
                initialFetch: true,
            }); 

        case RECEIVE_ROOMS:
            return Object.assign({}, state, {
                id: action.id,
                name: action.name,
                initialFetch: false,
            });

        default:
            return state;
    } 
}


export function rooms(state = {byId: {}, all: []}, action){
    switch(action.type){
        case RECEIVE_ROOMS: {
            let newState = {byId: {}, all: []};
            action.rooms.forEach((r, index) => {
                newState.byId[r.id] = room(state.byId[action.id], {type: action.type, ...r});
                newState.all.push(r.id);
            });
            return newState;
        }

        case RECEIVE_ROOM_INFO: {
            let newState = Object.assign(
                {}, 
                state
            );

            newState.byId[action.id] = room(state.byId[action.id], action);
        }

        default:
            return state;
    }
}

export function websocket(state = {roomStatus: null}, action) {
    switch(action.type){
        case SENDING_ENTER_ROOM:
            return Object.assign(
                {}, 
                state,
                {
                    roomStatus: SENDING_ENTER_ROOM
                }
            );

        default:
            return state;
    }
}