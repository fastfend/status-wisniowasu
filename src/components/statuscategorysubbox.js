import React from 'react';
import containerStyles from '../styles/components/statusbox.module.scss';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
export default class StatusCategorySubBox extends React.Component {
  createStatus(data) {
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
            data-for={this.props.data.title}
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

  render() {
    return (
      <div className={containerStyles.status_sub}>
        <span className={containerStyles.status_sub_title}>
          {this.props.data.title}
        </span>
        <div className={containerStyles.status_sub_monthstat}>
          {this.createStatus(this.props.data)}
        </div>
        <ReactTooltip
          id={this.props.data.title}
          className={containerStyles.status_tooltip}
          place={'top'}
          effect="solid"
          delayHide={300}
          arrowColor="transparent"
          type="info"
        />
      </div>
    );
  }
}
StatusCategorySubBox.propTypes = {
  data: PropTypes.object,
};
