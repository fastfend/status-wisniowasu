import React from 'react';
import containerStyles from '../styles/components/titlebox.module.scss';
// import logo from '../images/logo.png'

export default class TitleBox extends React.Component {
  render() {
    return (
      <div id={containerStyles.title_box}>
        <div id={containerStyles.title_box_image}></div>
      </div>
    );
  }
}
