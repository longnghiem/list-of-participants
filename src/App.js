import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import ParticipantsBook from './components/participants-book.js'
import Participant from './components/participant.js'


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      participants: ParticipantsBook,
      'id' : 1,
      'order' : 'asc',}
  };

  addAction(e){
    e.preventDefault(); //avoid refreshing the page
    let _id = this.state.id;
    this.setState({'id' : this.state.id + 1});
    let name = this.refs.name.value;
    let email = this.refs.email.value;
    let phone = this.refs.phone.value;
    this.setState({
      participants: [{_id, name, email, phone}].concat(this.state.participants),
    });
    this.refs.name.value = '';
    this.refs.email.value = '';
    this.refs.phone.value = '';
  };

  editAction(participant, name, email, phone) {
    let participants = this.state.participants;
    for (var i =0; i< participants.length; i++){
      if(participants[i]._id == participant._id){
        participants[i].name = name;
        participants[i].email = email;
        participants[i].phone = phone;
      }
    };
    this.setState({participants});
  };

  removeAction(participant){
    let participants = this.state.participants;
    for (var i =0; i< participants.length; i++){
      if(participants[i]._id == participant._id){
        participants.splice(i,1);
      }
    };
    this.setState({participants});
  };

  sortAction(arg){
    let participants = this.state.participants;
    let sortCriteria;
    let col = document.getElementById(arg);
    let y = document.getElementsByClassName('arrow');

    for(var i=0; i<y.length;i++){
        y[i].className +=(' hidden');
    }
    col.classList.remove('hidden');

     if (this.state.order == 'asc'){
       sortCriteria = arg;
       col.classList.remove('up-arrow');
       col.className +=(' down-arrow');
       this.setState({'order' : 'des' });
     } else {
       sortCriteria = '-' + arg;
       col.classList.remove('down-arrow');
       col.className +=(' up-arrow');
       this.setState({'order' : 'asc' });
     }
    participants.sort(dynamicSort(sortCriteria));
    this.setState({participants : participants});
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className="App-logo" alt="logo" />
          <div className='App-title'>Nord Software</div>
        </header>

        <div className='participants'>
          <h2>List of participants</h2>

          <div className='addNew-form'>
              <form onSubmit={this.addAction.bind(this)}>
                <input className='input-name' type='text' ref='name' placeholder='Full name' required/>
                <input className='input-email' type='email' ref='email' placeholder='E-mail address' required/>
                <input className='input-phone' type='tel' ref='phone' placeholder='Phone number' required/>
                <button type='submit'>Add new</button>
              </form>
          </div>

          <table className='table'>
            <thead>
              <tr>
                <th className='th-name' onClick={this.sortAction.bind(this, "name")}>
                  Name <span className="arrow hidden" id='name'></span>
                </th>
                <th className='th-email' onClick={this.sortAction.bind(this, "email")}>
                  E-mail address <span className="arrow hidden" id='email'></span></th>
                <th className='th-phone' onClick={this.sortAction.bind(this, "phone")}>
                  Phone number <span className="arrow hidden" id='phone'></span></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* ParticipantsBook is an array of participants and is imported from folder components */}
              {this.state.participants.map( participant => {
                return (
                  <Participant
                    key={participant._id}
                    name={participant.name}
                    email={participant.email}
                    phone={participant.phone}
                    id={participant._id}
                    onRemove={this.removeAction.bind(this, participant)}
                    onEdit={this.editAction.bind(this, participant)}
                     />
                );
              })}
            </tbody>
          </table>

        </div>
      </div>
    );
  }

};

function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

export default App;
