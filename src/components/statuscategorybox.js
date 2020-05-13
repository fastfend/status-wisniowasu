import React from 'react';
import containerStyles from '../styles/components/statusbox.module.scss';
import formurlencoded from 'form-urlencoded';
import monitorsFile from '../../monitors.json';
import ReactTooltip from 'react-tooltip';
import Loader from 'react-loaders';
import '../styles/components/loader.scss';
import ErrorImg from '../images/icons/icons8-high-priority-50.png';
import OkImg from '../images/icons/icons8-checked-50.png';
import downArrowImg from '../images/down.svg';
import StatusCategorySubBox from '../components/statuscategorysubbox';
import AnimateHeight from 'react-animate-height';
import PropTypes from 'prop-types';
export default class StatusCategoryBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: [],
      statuses: [],
      loading: true,
      opened: false,
      status: (
        <Loader
          className={containerStyles.status_stat_loading}
          type="ball-scale-ripple"
          active={true}
        />
      ),
    };
    this.clickOpenGroup = this.clickOpenGroup.bind(this);
  }

  createStatus(data) {
    const render = [];
    var dataCount = data.length;
    var uptimes = [];
    for (var i = 0; i < dataCount; i++) {
      var tempdata = data[i].custom_uptime_ranges.split('-');
      for (var x = 0; x < tempdata.length; x++) {
        var val = parseFloat(tempdata[x]);
        if (uptimes[x] === undefined) {
          uptimes[x] = { count: 1, value: val };
        } else {
          uptimes[x].count = uptimes[x].count + 1;
          uptimes[x].value = uptimes[x].value + val;
        }
      }
    }
    var finalUptimes = [];
    for (var o = 0; o < uptimes.length; o++) {
      finalUptimes[o] = uptimes[o].value / uptimes[o].count;
    }
    var now = new Date();
    for (var j = 0; j < 31; j++) {
      if (finalUptimes[j] === undefined) {
        render.unshift(<div className={containerStyles.bar}></div>);
      } else {
        var uptime =
          now.getDate() +
          ' ' +
          now.toLocaleString('default', { month: 'long' }) +
          '\nUptime: ' +
          Math.floor(finalUptimes[j] * 100) / 100 +
          '%';
        render.unshift(
          <div
            data-for={this.props.title}
            data-tip={uptime}
            className={containerStyles.bar}
            style={{
              background:
                'linear-gradient(0deg, rgb(46,204,64)' +
                finalUptimes[j] +
                '%, rgb(255,65,54) ' +
                finalUptimes[j] +
                '%)',
            }}
          ></div>,
        );
        now.setDate(now.getDate() - 1);
      }
    }

    return render;
  }

  createSubStatus(data) {
    const render = [];
    for (var i = 0; i < data.length; i++) {
      render.unshift(
        <StatusCategorySubBox data={data[i]}></StatusCategorySubBox>,
      );
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

  async getStatusData(monitors, timeset) {
    var monitorResult = [];
    for (var i = 0; i < monitors.length; i++) {
      var data = {
        api_key: monitorsFile.api_key,
        monitors: monitors[i].id,
        custom_uptime_ranges: timeset,
      };
      var response = await this.postData(
        'https://api.uptimerobot.com/v2/getMonitors',
        data,
      );
      response.monitors[0].title = monitors[i].title;
      monitorResult.push(response.monitors[0]);
    }
    return monitorResult;
  }

  componentDidMount() {
    this.getStatusData(this.props.monitors, this.props.timeset).then(
      (data) => {
        this.setState({
          boxes: this.createStatus(data),
          statuses: this.createSubStatus(data),
          loading: false,
          opened: false,
          status: this.getStatus(data),
        });
        ReactTooltip.rebuild();
      },
    );
  }

  clickOpenGroup(event) {
    this.setState({ opened: !this.state.opened });
  }

  getStatus(data) {
    var errorstats = 0;
    for (var i = 0; i < data.length; i++) {
      var monitor = data[i];
      if (monitor.status === 9 || monitor.status === 8) {
        errorstats++;
      }
    }

    if (errorstats !== 0) {
      return (
        <img
          src={ErrorImg}
          className={containerStyles.status_stat}
          alt="Usługi niesprawne"
        ></img>
      );
    } else {
      return (
        <img
          src={OkImg}
          className={containerStyles.status_stat}
          alt="Usługi sprawne"
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
        </div>
        <div className={containerStyles.status_monthstat}>
          {this.state.loading ? (
            <Loader type="line-scale" active={true} />
          ) : (
            this.state.boxes
          )}
          <ReactTooltip
            id={this.props.title}
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
        <div
          className={containerStyles.status_more}
          onClick={this.clickOpenGroup}
        >
          <div className={containerStyles.status_more_text}>
            Pokaż {this.state.opened ? 'mniej' : 'więcej'}
          </div>
          <img
            src={downArrowImg}
            className={[
              containerStyles.status_more_icon,
              this.state.opened ? containerStyles.on : null,
            ].join(' ')}
            alt="Pokaż więcej usług"
          ></img>
        </div>
        <div className={containerStyles.status_more_container}>
          <AnimateHeight
            duration={250}
            height={this.state.opened ? 'auto' : 0}
          >
            {this.state.statuses}
          </AnimateHeight>
        </div>
      </div>
    );
  }
}
StatusCategoryBox.propTypes = {
  title: PropTypes.string.isRequired,
  monitors: PropTypes.object.isRequired,
  timeset: PropTypes.object.isRequired,
};
