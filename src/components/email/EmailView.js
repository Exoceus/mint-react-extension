import React, { Component } from 'react'
import EmailItem from "./EmailItem"

export default class EmailView extends Component {
    render() {
        if (this.props.emails) {
            var listed_emails = this.props.emails.map((email) => (
                <div><EmailItem email={email} /> </div>
            ))
        }

        return (
            <div className="emails-list-wrapper">
                {listed_emails}
            </div>
        )
    }
}
