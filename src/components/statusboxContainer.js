import React from "react"
import containerStyles from "../styles/components/statusbox.module.scss"
import settings from '../../monitors.json'
import StatusBox from '../components/statusbox'

export default class StatusBoxContainer extends React.Component
{
    renderStatusBoxes = () =>
    {
        let statusboxList = [];
        settings.monitors.forEach(element => {
            statusboxList.push(<StatusBox title="Serwerownia" subtitle="Urządzenia sieciowe"/>)
        });
        return statusboxList
    }

    getTimeSets = () =>
    {
        let timesets = [];
        let unixDay = 86400;
        var endTime = Math.round((new Date().getTime()-60000)/1000);
        var end = new Date();
        end.setHours(0,0,0,0);
        var startTime = Math.round(end.getTime()/1000);
        timesets.push(startTime.toString() + "_" + endTime.toString())

        for (var i = 0; i < 30; i++)
        {
            endTime = startTime;
            startTime = startTime - unixDay;
            timesets.push(startTime.toString() + "_" + endTime.toString())
        }
        return timesets.join("-");
    }

    render() {
        const statusBoxes = settings.monitors.map(element => {
            return (
                <StatusBox title={element.title} subtitle={element.subtitle} id={element.id} timeset={this.getTimeSets()}/>
            )
        });
        return(
            <div id="status_box">
                { statusBoxes }
            </div>
        )
      }
}