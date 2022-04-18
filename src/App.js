import React, { Component } from 'react';
import './App.css';

import CalendarView from "./components/calendar/CalendarView"
import EmailView from "./components/email/EmailView"

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      calendar_events: null,
      emails: null
    }

    this.getApiData = this.getApiData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {

    console.log(this.state)

    var gapi = window.gapi
    var client_id = "144397320967-e52ort5bvcoork7os2dc2j0s4ooq4mvg.apps.googleusercontent.com"
    var client_secret = "AIzaSyChk0hL5Bb26mFggZ_p4PFRqxE21sSzI14"

    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest", "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/gmail.readonly"

    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: client_secret,
        clientId: client_id,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        console.log('intiated client')
        var user = gapi.auth2.getAuthInstance().currentUser.get();
        console.log(user)

        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          // User is authorized and has clicked "Sign out" button.
          console.log('logged in already')

          this.getApiData(gapi)

        }

        else {
          gapi.auth2.getAuthInstance().signIn()
            .then(() => {
              console.log('authenticated')

              user = gapi.auth2.getAuthInstance().currentUser.get();
              console.log(user)

              this.getApiData(gapi)
            })
        }
      })
    })
  }

  getApiData(gapi) {

    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 20,
      'orderBy': 'startTime'
    }).then(response => {
      const events = response.result.items
      this.setState({
        calendar_events: events
      })
    })

    gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'maxResults': 15
    }).then(response => {
      var messages = response.result.messages;

      var email_list = []

      messages.forEach(message => {
        gapi.client.gmail.users.messages.get({
          'userId': 'me',
          'id': message.id
        }).then(response => {
          email_list.push(response.result)
          this.setState({
            emails: email_list
          })
        })
      });
    })
  }

  handleClick() {
    var gapi = window.gapi
    var client_id = "144397320967-e52ort5bvcoork7os2dc2j0s4ooq4mvg.apps.googleusercontent.com"
    var client_secret = "AIzaSyChk0hL5Bb26mFggZ_p4PFRqxE21sSzI14"

    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest", "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/gmail.readonly"

    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: client_secret,
        clientId: client_id,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        console.log('intiated client')
        var user = gapi.auth2.getAuthInstance().currentUser.get();
        console.log(user)

        gapi.auth2.getAuthInstance().signIn()
          .then(() => {
            console.log('authenticated')

            user = gapi.auth2.getAuthInstance().currentUser.get();
            console.log(user)

            this.getApiData(gapi)
          })

      })
    })
  }

  render() {
    return (
      <div className="App" >
        YOLO
        < button style={{ width: 100, height: 50 }} onClick={this.handleClick} > Sign In</button >
        <div className='main-wrapper'>
          <CalendarView events={this.state.calendar_events} />
          <EmailView emails={this.state.emails} />
        </div>
      </div >
    );
  }

}

export default App;
