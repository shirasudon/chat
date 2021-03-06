// @format
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import { compose } from 'recompose'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

import { toJS } from './ToJS'
import { logout as logoutAction } from '../actions/AuthActions'

const style = {
  root: {
    width: '100%',
    height: '12%',
  },
  flex: {
    flex: 1,
  },
}

export const Navbar = ({ myId, logout, classes }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit" className={classes.flex}>
          Chat
        </Typography>
        {myId !== null ? (
          <Button onClick={logout} color="contrast">
            Logout
          </Button>
        ) : (
          <Button component={Link} to="/login" color="contrast">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  </div>
)

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logoutAction())
  },
})

const mapStateToProps = state => ({
  myId: state.getIn(['auth', 'myId']),
})

export const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  toJS,
  withStyles(style)
)

export default enhancer(Navbar)
