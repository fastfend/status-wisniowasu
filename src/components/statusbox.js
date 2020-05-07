'use strict';
import React from 'react';
import containerStyles from '../styles/components/statusbox.module.scss';
import formurlencoded from 'form-urlencoded';
import monitors from '../../monitors.json';
import ReactTooltip from 'react-tooltip';
import Loader from 'react-loaders';
import '../styles/components/loader.scss';
import ErrorImg from '../images/icons/icons8-high-priority-50.png';
import OkImg from '../images/icons/icons8-checked-50.png';
import PropTypes from 'prop-types';

export default class StatusBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: [],
      loading: true,
      status: (
        <Loader
          className={containerStyles.status_stat_loading}
          type="ball-scale-ripple"
          active={true}
        />
      ),
    };
  }

  createStatus(data = {}) {
    const render = [];
    const uptimes = data.custom_uptime_ranges.split('-');
    var differenceInTime =
      new Date() - new Date(data.create_datetime * 1000);
    var differenceInDays = differenceInTime / (1000 * 3600 * 24);
    var daysFromStart = Math.ceil(differenceInDays) + 1;
    var now = new Date();
    for (var i = 0; i < uptimes.length; i++) {
      if (daysFromStart <= i) {
        render.unshift(<div className={containerStyles.bar}></div>);
      } else {
        var uptime =
          now.getDate() +
          ' ' +
          now.toLocaleString('default', { month: 'long' }) +
          '\nUptime: ' +
          Math.floor(uptimes[i] * 100) / 100 +
          '%';
        render.unshift(
          <div
            data-for={data.id}
            data-tip={uptime}
            className={containerStyles.bar}
            style={{
              background:
                'linear-gradient(0deg, rgb(46,204,64)' +
                uptimes[i] +
                '%, rgb(255,65,54) ' +
                uptimes[i] +
                '%)',
            }}
          ></div>,
        );
        now.setDate(now.getDate() - 1);
      }
    }

    return render;
  }

  async postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: formurlencoded(data), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }

  async getStatusData(id, timeset) {
    var data = {
      api_key: monitors.api_key,
      monitors: id,
      custom_uptime_ranges: timeset,
    };
    const response = await this.postData(
      'https://api.uptimerobot.com/v2/getMonitors',
      data,
    );
    return response.monitors[0];
  }

  componentDidMount() {
    this.getStatusData(this.props.id, this.props.timeset).then(
      (data) => {
        this.setState({
          boxes: this.createStatus(data),
          loading: false,
          status: this.getStatus(data),
        });
        ReactTooltip.rebuild();
      },
    );
  }

  getStatus(data) {
    if (data.status === 9 || data.status === 8) {
      return (
        <img
          src={ErrorImg}
          className={containerStyles.status_stat}
          alt="Usługa niesprawna"
        ></img>
      );
    } else {
      return (
        <img
          src={OkImg}
          className={containerStyles.status_stat}
          alt="Usługa sprawna"
        ></img>
      );
    }
  }

  render() {
    return (
      <div className={containerStyles.status_container}>
        {this.state.status}
        <div className={containerStyles.status_name}>
          <span className={containerStyles.status_name_title}>
            {this.props.title}
          </span>
          <span className={containerStyles.status_name_subtitle}>
            {this.props.subtitle}
          </span>
        </div>
        <div className={containerStyles.status_monthstat}>
          {this.state.loading ? (
            <Loader type="line-scale" active={true} />
          ) : (
            this.state.boxes
          )}
          <ReactTooltip
            id={this.props.id}
            className={containerStyles.status_tooltip}
            place={'top'}
            effect="solid"
            delayHide={300}
            arrowColor="transparent"
            type="info"
          />
        </div>
        <span
          className={[
            containerStyles.status_tip,
            containerStyles.left,
          ].join(' ')}
        >
          31 dni temu
        </span>
        <span
          className={[
            containerStyles.status_tip,
            containerStyles.right,
          ].join(' ')}
        >
          teraz
        </span>
      </div>
    );
  }
}
StatusBox.propTypes = {
  id: PropTypes.string,
  timeset: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
