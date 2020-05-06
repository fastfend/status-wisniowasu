import React from 'react';
import style from '../styles/components/info.module.scss';
import queryString from 'query-string';
import PropTypes from 'prop-types';

export default class Info extends React.Component {
  getBox() {
    var params = queryString.parse(this.props.location.search);
    if (params.from !== undefined) {
      return params.from;
    }
    return false;
  }

  render() {
    var status = this.getBox();
    if (status !== false) {
      return (
        <div id={style.info}>
          <p>
            Wykryto, że usługa <b>{status}</b>
          </p>
          <p>do której chciałeś uzyskać dostęp, ma problemy.</p>
          <p>Przepraszamy za utrudnienia.</p>
        </div>
      );
    } else {
      return null;
    }
  }
}
Info.propTypes = {
  location: PropTypes.object,
};
