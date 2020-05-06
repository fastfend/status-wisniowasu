import React from 'react';
import containerStyles from '../styles/components/statusboxcontainer.module.scss';
import settings from '../../monitors.json';
import StatusBox from '../components/statusbox';
import StatusCategoryBox from '../components/statuscategorybox';

export default class StatusBoxContainer extends React.Component {
  getTimeSets() {
    const timesets = [];
    const unixDay = 86400;
    var endTime = Math.round((new Date().getTime() - 60000) / 1000);
    var end = new Date();
    end.setHours(0, 0, 0, 0);
    var startTime = Math.round(end.getTime() / 1000);
    timesets.push(startTime.toString() + '_' + endTime.toString());

    for (var i = 0; i < 30; i++) {
      endTime = startTime;
      startTime = startTime - unixDay;
      timesets.push(startTime.toString() + '_' + endTime.toString());
    }
    return timesets.join('-');
  }

  render() {
    const statusBoxes = settings.monitors.map((element) => {
      if (element.type === 'standalone') {
        return (
          <StatusBox
            title={element.title}
            subtitle={element.subtitle}
            id={element.id}
            timeset={this.getTimeSets()}
          />
        );
      }
      if (element.type === 'group') {
        return (
          <StatusCategoryBox
            title={element.title}
            monitors={element.monitors}
            timeset={this.getTimeSets()}
          />
        );
      }
    });
    return (
      <div className={containerStyles.container}>{statusBoxes}</div>
    );
  }
}
