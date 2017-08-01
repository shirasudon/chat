import {Navbar as Nb, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import React, {Component} from 'react';

import {logout as logoutAction} from '../actions/AuthActions';

class Navbar extends Component {

    render(){
        const {authenticated, logout} = this.props;
        return(
            <Nb inverse collapseOnSelect>
                <Nb.Header>
                    <Nb.Brand>
                        <Link to="/">Chat</Link>
                    </Nb.Brand>
                    <Nb.Toggle />
                </Nb.Header>
                <Nav pullRight>
                    {authenticated ?
                        (
                            <NavItem onClick={logout}>Logout</NavItem>
                        ):
                        (
                            <LinkContainer to="/login">
                                <NavItem>Login</NavItem>
                            </LinkContainer>
                        )
                    }
                </Nav>
            </Nb>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logoutAction())
        }
    };
};

const mapStateToProps = ({session}) => ({
    authenticated: session.authenticated,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);
