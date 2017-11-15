import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import green from 'material-ui/colors/green'
import Button from 'material-ui/Button'
import { compose, withHandlers } from 'recompose'


const styles = {
    wrapper: {
        position: 'relative',
    },
    successButton: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    progress: {
        color: green[500],
        position: 'absolute',
        top: -2,
        left: -2,
        opacity: 0.5,
    },
}

export const withButtonHandlers = withHandlers({

    handleButtonClick: ( { onClick, isRequesting } ) => () => {
        if ( !isRequesting && onClick ) { // if not loading and onClick is callable
            onClick()
        }
    }

})


export const CircularProgressButton = ( { children, classes, isRequesting, handleButtonClick, raised, disabled, color } ) => (
    <div className={classes.wrapper}>
        <Button 
            fab
            onClick={handleButtonClick}
            raised={raised}
            color={color} 
            disabled={disabled} >
            {children || ''} { /* if no children is found simply assign empty string */ }
        </Button>
        { isRequesting && <CircularProgress size={60} className={classes.progress} />}
    </div>
)
    

const mapStateToProps = ({ ui }) => ({
    isRequesting: ui.createGroup.isRequesting,
})

const enhancer = compose(
    withStyles(styles),
    connect(mapStateToProps, null),
    withButtonHandlers,
)

export default enhancer(CircularProgressButton)
