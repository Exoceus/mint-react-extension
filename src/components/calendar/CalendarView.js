import React, { Component } from 'react'
import CalendarItem from "./CalendarItem"


export default class CalendarView extends Component {

    render() {

        if (this.props.events) {
            var listed_events = this.props.events.map((event) => (
                <div><CalendarItem event={event} /> </div>
            ))
        }


        return (
            <div className="calendar-list-wrapper">
                {listed_events}
            </div>
        )
    }
}
