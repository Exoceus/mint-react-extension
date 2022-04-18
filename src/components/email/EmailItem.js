import React, { Component } from 'react'

export default class EmailItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            subject: '',
            date: '',
            snippet: ''
        }
    }

    componentDidMount() {
        var email = this.props.email

        console.log(email)

        var headers_index = 0

        email.payload.headers.forEach((header) => {
            if (header.name === "Subject") {
                this.setState({
                    subject: header.value
                })
            }

            if (header.name === "Date") {
                this.setState({
                    date: header.value
                })
            }

            headers_index++

            if (headers_index === email.payload.headers.length) {
                this.setState({
                    isLoaded: true
                })
            }

        })

        this.setState({
            snippet: email.snippet
        })
    }

    render() {

        if (this.state.isLoaded === false) {
            return (
                <div>Loading</div>
            )
        }

        else {
            return (

                <div className='email-item'>
                    <div className='email-subject'>{this.state.subject}</div>
                    <div className='email-date'>{this.state.date}</div>
                    <div className='email-snippet'>{this.state.snippet}</div>
                </div>
            )
        }
    }
}
