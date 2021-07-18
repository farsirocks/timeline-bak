import Timeline from '../Modules/Timeline/timeline'
import styles from '../styles/Home.module.css'
import TimeLineConfig from '../Modules/TimeLineConfig'
import React, { useState, useEffect, useRef } from "react";
import moment from 'moment'

function App() {

    const [locale, setLocale] = useState('en');
    const [selectedIds, setSelectedIds] = useState([]);
    const timelineRef = useRef(null);
    let timeLineConfig = null;
    useEffect(()=>{
        if (timelineRef.current)
        {
            timeLineConfig = new TimeLineConfig(timelineRef);
            timeLineConfig.setLocale(locale);
        }
    },[timelineRef])



    // constructor(props) {
    //     super(props);

    //     state = {
    //         selectedIds: [],
    //         locale: 'en'
    //     };
    // }

    const onAddItem = () => {
        let nextId = timelineRef.current.items.length + 1;
        timelineRef.current.items.add(timeLineConfig.addItem(nextId, 3, 'test', moment()));
        timelineRef.current.timeline.fit();
    };

    const onFit = () => {
        timelineRef.current.timeline.fit();
    };


    // selectLocale = (event) => {
    //     setState({locale: event.target.value});
    //     timeLineConfig.setLocale(event.target.value)
    // };

    const clickHandler = () => {
        const { group } = props;
        var items = timelineRef.current.items.get();
        const selectedIds = items.filter(item => item.group === group).map(item => item.id);
        setState({
            selectedIds
        });
    };

    // if (!timeLineConfig)
    //     return <div>Loading.. </div>
    // else
    return (

        <div className="App">
            <p className="header">This example demonstrate using groups.</p>
            <div className="timeline-container">
                <Timeline
                    ref={timelineRef}
                    {...timeLineConfig.getProps()}
                    clickHandler={clickHandler}
                    selection={selectedIds}
                />
            </div>
            <br />
            <button onClick={onAddItem}>Add Item</button>
            <button onClick={onFit}>Fit Screen</button>

            {/* <select id="locale" onChange={locale} value={locale}>
                <option value="fa">Farsi</option>
                <option value="en">English</option>
            </select> */}
        </div>
    );


}

export default App;
