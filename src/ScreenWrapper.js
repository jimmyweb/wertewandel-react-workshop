import React, { Component, PropTypes } from 'react';
import { Image, ToolbarAndroid, StyleSheet, Dimensions, Navigator } from 'react-native';

import BackIcon from './res/BackIcon.png';
import BackgroundImage from './res/HomeScreen.png';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  toolbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: 60,
    width,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

class ScreenWrapper extends Component {
  static PropTypes = {
    hasToolbar: PropTypes.bool.isRequired,
    hasBackButton: PropTypes.bool,
    title: PropTypes.string,
    navigator: PropTypes.instanceOf(Navigator).isRequired,
  };

  static defaultProps = {
    hasBackButton: true,
    toolbarTitle: '',
  };

  constructor(props) {
    super(props);
    this.onIconClicked = this.onIconClicked.bind(this);
  }

  onIconClicked() {
    if (this.props.navigator && this.props.navigator.getCurrentRoutes().length === 1) {
      return false;
    }
    this.props.navigator.pop();
    return true;
  }

  renderToolbar() {
    if (this.props.hasToolbar) {
      return (<ToolbarAndroid style={styles.toolbar}
                              navIcon={this.props.hasBackButton ? BackIcon : null}
                              title={this.props.toolbarTitle}
                              onIconClicked={this.onIconClicked}
                              titleColor="white"/>);
    } else {
      return null;
    }
  }

  render() {
    return (
      <Image source={BackgroundImage}
             style={[styles.container, this.props.style, {paddingTop: this.props.hasToolbar ? 60 : 0}]}>
        {this.renderToolbar()}
        {this.props.children}
      </Image>
    );
  }
}

export default ScreenWrapper;
