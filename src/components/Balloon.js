import React from 'react'
import { connect } from 'react-redux'
import { withStyles, } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import moment from 'moment'
import { lifecycle, compose } from 'recompose'
import { chatActionCreator } from '../actions'

export const RIGHT = "right"
export const LEFT = "left"

const balloonElement = {
    [LEFT]: {
        content: "''",
        position: "absolute",
        top: "50%",
        left: "-30px",
        marginTop: "-15px",
        border: "15px solid transparent",
        borderRight: "15px solid #e0edff",
    },
    [RIGHT]: {
        content: "''",
        position: "absolute",
        top: "50%",
        left: "100%",
        marginTop: "-15px",
        border: "15px solid transparent",
        borderLeft: "15px solid #e0edff",
    },
}

const baloonMain = {
    position: "relative",
    padding: "20px 10px",
    borderRadius: "20px",
    minWidth: "10%",
    maxWidth: "100%",
    color: "#555",
    fontSize: "16px",
    background: "#e0edff",
}

const styleSheet = theme => ({
    balloonLeft: {
        ...baloonMain,
        // "&:before": balloonElement[LEFT],
    },
    balloonRight: {
        ...baloonMain,
        // "&:before": balloonElement[RIGHT],
    },
    postMetaLeft: {
        textAlign: "left"
    },
    postMetaRight: {
        textAlign: "right"    
    }
})

export const withLifecycle = lifecycle({
    componentDidMount() {
        // dispatch read notification to the server
        const { message, session, sendRead } = this.props
        const me = session.user
        if ( !message.readBy.includes(me.id) ) { // notify the server that the current user has read the specific message
            sendRead(message.id, me.id)
        }
    }
})

export const Balloon = ( { message, classes, session, users } ) => {
    const shouldPutRight = message.userId === session.user.id
    const balloonStyle = shouldPutRight ? classes.balloonRight: classes.balloonLeft
    const username = users.byId.hasOwnProperty(message.userId) ? users.byId[message.userId].username : ""
    const postMeta = shouldPutRight ? classes.postMetaRight: classes.postMetaLeft
    const justify = shouldPutRight ? "flex-end": "flex-start"
    return (
        <Grid id={message.id} container justify={justify}>
            <Grid item xs={6}>
                <div className={balloonStyle}>
                    {message.text}
                </div>
                <div className="readCount">
                    { message.readBy.length > 0 && message.readBy.length + " Read" }
                </div>
                <div className={postMeta}>
                    { username && <span>{username}</span> } : <span>{moment(message.createdAt).format("MMMM Do YYYY, h:mm a")}</span>
                </div>
            </Grid>
        </Grid>
    )
}

export const mapStateToProps = ( { session, entities } ) => ({
    session,
    users: entities.users,
    messages: entities.messages
})

export const mapDispatchToProps = dispatch => ({
    sendRead: (messageId, userId) => {
        dispatch(chatActionCreator.sendMessageRead([messageId], userId))
    }
})

export const enhancer = compose(
    withStyles(styleSheet),
    connect(mapStateToProps, mapDispatchToProps),
    withLifecycle,
)

export default enhancer(Balloon)

