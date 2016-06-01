import React, { Component } from 'react';
import { connect } from 'react-redux';

//import styles from './styles.css';

class App extends Component {
    render() {
        return <div className="container">{this.props.children}</div>;
    }
}

export default connect()(App);
