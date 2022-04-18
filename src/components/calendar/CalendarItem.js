import React, { Component } from 'react'

export default class CalendarItem extends Component {
    render() {
        var event = this.props.event

        if (event.hangoutLink) {
            var link = event.hangoutLink
        }

        else {
            var link = event.htmlLink
        }

        return (
            <div className='calendar-item'>
                <a href={link} className='calendar-link'>
                    <div className='event-title'>{event.summary}</div>
                    <div className='event-times'>{event.start.dateTime}-{event.end.dateTime}</div>
                </a>
            </div>
        )
    }
}
