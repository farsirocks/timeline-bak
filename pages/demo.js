import Timeline from '../Modules/Timeline/timeline'
import styles from '../styles/Home.module.css'
import TimeLineConfig from '../Modules/TimeLineConfig'
import React, {Component} from "react";
import moment from 'moment'

class App extends Component {
    timelineRef = React.createRef();
    timeLineConfig = new TimeLineConfig(this.timelineRef);

    constructor(props) {
        super(props);

        this.state = {
            selectedIds: [],
            locale: 'en'
        };
    }

    onAddItem = () => {
        var nextId = this.timelineRef.current.items.length + 1;
        this.timelineRef.current.items.add(this.timeLineConfig.addItem(nextId, 3, 'test', moment()));
        this.timelineRef.current.timeline.fit();
    };

    onFit = () => {
        this.timelineRef.current.timeline.fit();
    };


    selectLocale = (event) => {
        this.setState({locale: event.target.value});
        this.timeLineConfig.setLocale(event.target.value)
    };

    render() {

        return (
            <div className="App">
                <p className="header">This example demonstrate using groups.</p>
                <div className="timeline-container">
                    <Timeline
                        ref={this.timelineRef}
                        {...this.timeLineConfig.getProps()}
                        clickHandler={this.clickHandler}
                        selection={this.state.selectedIds}
                    />
                </div>
                <br/>
                <button onClick={this.onAddItem}>Add Item</button>
                <button onClick={this.onFit}>Fit Screen</button>

                <select id="locale" onChange={this.selectLocale} value={this.state.locale}>
                    <option value="fa">Farsi</option>
                    <option value="en">English</option>
                </select>
            </div>
        );
    }

    clickHandler = () => {
        const {group} = this.props;
        var items = this.timelineRef.current.items.get();
        const selectedIds = items.filter(item => item.group === group).map(item => item.id);
        this.setState({
            selectedIds
        });
    };
}

export default App;
