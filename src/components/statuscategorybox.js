import React from "react"
import containerStyles from "../styles/components/statusbox.module.scss"
import formurlencoded from 'form-urlencoded';
import monitors_file from '../../monitors.json'
import ReactTooltip from 'react-tooltip'
import Loader from 'react-loaders'
import '../styles/components/loader.scss';
import down_arrow from '../images/down.svg';
import StatusCategorySubBox from '../components/statuscategorysubbox';
import AnimateHeight from 'react-animate-height';
export default class StatusCategoryBox extends React.Component
{
    constructor(props) {
        super(props);
        this.state = 
        {
            boxes: [],
            statuses: [],
            loading: true,
            opened: false
        }
        this.clickOpenGroup = this.clickOpenGroup.bind(this);
      }

    createStatus = (data) =>
    {
        let render = [];
        var data_count = data.length;
        var uptimes = [];
        for (var i = 0; i < data_count; i++)
        {
            var tempdata = data[i].custom_uptime_ranges.split("-");
            for(var x = 0; x < tempdata.length; x++)
            {
                var val = parseFloat(tempdata[x]);
                if(val == 0)
                {
                    continue;
                }
                else
                {
                    if(uptimes[x] == undefined)
                    {
                        uptimes[x] = { count: 1, value: val }
                    }
                    else
                    {
                        uptimes[x].count = uptimes[x].count + 1;
                        uptimes[x].value = uptimes[x].value + val;
                    }
                }
            }
        }
        var final_uptimes = [];
        for (var i = 0; i < uptimes.length; i++)
        {
            final_uptimes[i] = uptimes[i].value / uptimes[i].count;
        }
        var now = new Date;
        for (var i = 0; i < 31; i++)
        {
            if(final_uptimes[i] == undefined)
            {
                render.unshift(<div className={containerStyles.bar}></div>)
            }
            else
            {
                var uptime = "Data: " + now.getDate() + " " + now.toLocaleString('default', { month: 'long' }) + " Uptime: " + final_uptimes[i] + "%";
                render.unshift(<div data-for={this.props.title} data-tip={uptime} className={containerStyles.bar} style={{background: 'linear-gradient(0deg, rgb(46,204,64)' + final_uptimes[i] + '%, rgb(255,65,54) '  + final_uptimes[i] + '%)'}}></div>)
                now.setDate(now.getDate() - 1);
            }
        }
   
        return render;
    }
    createSubStatus = (data) =>
    {
        let render = []
        for (var i = 0; i < data.length; i++)
        {
            render.unshift(<StatusCategorySubBox data={data[i]} ></StatusCategorySubBox>)
        }
        return render;
    }

    postData = async function (url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          body: formurlencoded(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
      }

    getStatusData = async function (monitors, timeset) {
        var monitor_result = [];
        for(var i = 0; i < monitors.length; i++)
        {
             var data =
             {
                api_key: monitors_file.api_key,
                monitors: monitors[i].id,
                custom_uptime_ranges: timeset
             }
             var response = await this.postData('https://api.uptimerobot.com/v2/getMonitors', data);
             response.monitors[0].title = monitors[i].title;
             monitor_result.push(response.monitors[0]);
        }
        return monitor_result;
    }


    componentDidMount() {
        this.getStatusData(this.props.monitors, this.props.timeset)
        .then((data) => {
            this.setState({
                boxes: this.createStatus(data),
                statuses: this.createSubStatus(data),
                loading: false,
                opened: false
              })
            ReactTooltip.rebuild()
        });
    }

    clickOpenGroup = (event) =>
    {
        this.setState({ opened: !this.state.opened })
    }

    render() {
        return(
            <div className={containerStyles.status_container}>
                <div className={[containerStyles.status_stat,containerStyles.status_stat_ok].join(" ")}></div>
                <div className={containerStyles.status_name}>
                    <span className={containerStyles.status_name_title}>{this.props.title}</span>
                </div>
                <div className={containerStyles.status_monthstat}>
                    {this.state.loading ? <Loader type="line-scale" active={true} /> : this.state.boxes}
                    <ReactTooltip
                        id={this.props.title}
                        className={containerStyles.status_tooltip}
                        place={'top'}
                        effect='solid'
                        delayHide={300}
                        arrowColor='transparent'
                        type="info" />
                </div>
                <span className={[containerStyles.status_tip,containerStyles.left].join(" ")}>31 dni temu</span>
                <span className={[containerStyles.status_tip,containerStyles.right].join(" ")}>teraz</span>
                <div className={containerStyles.status_more} onClick={this.clickOpenGroup}>
                    <div className={containerStyles.status_more_text}>Pokaż {this.state.opened ? 'mniej' : 'więcej'}</div>
                    <img src={down_arrow} className={[containerStyles.status_more_icon, this.state.opened ? containerStyles.on : null ].join(" ")}></img>
                </div>
                <div className={containerStyles.status_more_container}>
                    <AnimateHeight
                    duration={ 250 }
                    height={this.state.opened ? 'auto' : 0 }
                    >
                        {this.state.statuses}
                    </AnimateHeight>
                    
                </div>
            </div>
        )
      }
}