import React, { Component } from 'react';

class Participant extends Component {
  render(){
    return(
      //getting each <tr> a unique id to use in func inlineEdit.
      //Then we can retrieve the clicked <td>
      <tr className='participant' id={this.props.id}>
        <td className='participant-name' >
          <span onClick={this.inlineEdit.bind(this)}>{this.props.name}</span>
          <input className='hidden' type='text' placeholder={this.props.name} required/>
        </td>
        <td className='participant-email' >
          <span onClick={this.inlineEdit.bind(this)}>{this.props.email}</span>
          <input className='hidden' type='email' placeholder={this.props.email} required/>
        </td>
        <td className='participant-phone'>
          <span  onClick={this.inlineEdit.bind(this)}>{this.props.phone}</span>
          <input className='hidden' type='tel' placeholder={this.props.phone} required/>
        </td>

        <td>
          <div>
            <a className="remove-btn" onClick={this.props.onRemove}><span className="icon-remove"></span></a>
            <a className="edit-btn" onClick={this.inlineEdit.bind(this)}><span className='icon-edit'></span></a>
          </div>
          <div className='hidden'>
            <button className='save-btn' onClick={this.saveChange.bind(this)}>Save</button>
            <button className='cancel-btn' onClick={this.cancelEdit.bind(this)}>Cancel</button>
          </div>
        </td>
      </tr>
    );
  };

  inlineEdit(){
    let p = document.getElementById(this.props.id);
    //hide all data of clicked row then reveal the inputs and the buttons
    for (let i= 0; i < p.childNodes.length; i++){
      p.childNodes[i].childNodes[0].className += ' hidden';
      p.childNodes[i].childNodes[1].classList.remove('hidden');
    }
  };

  cancelEdit(){
    let p = document.getElementById(this.props.id);
    //assign the inputs' values back to the old data
    p.getElementsByClassName('participant-name')[0].getElementsByTagName("input")[0].value = this.props.name;
    p.getElementsByClassName('participant-email')[0].getElementsByTagName("input")[0].value = this.props.email;
    p.getElementsByClassName('participant-phone')[0].getElementsByTagName("input")[0].value = this.props.phone;
    //hide the inputs, show back the data
    for (let i= 0; i < p.childNodes.length; i++){
      p.childNodes[i].childNodes[0].classList.remove('hidden');
      p.childNodes[i].childNodes[1].className +=(' hidden');
    }
  }

  saveChange() {
    let p = document.getElementById(this.props.id);
    //get the new data from inputs then pass these as parameters to our function onEdit in the App
    let name = p.getElementsByClassName('participant-name')[0].getElementsByTagName("input")[0].value;
    let email = p.getElementsByClassName('participant-email')[0].getElementsByTagName("input")[0].value;
    let phone = p.getElementsByClassName('participant-phone')[0].getElementsByTagName("input")[0].value;
    this.props.onEdit(name, email, phone);
    //hide inputs, then show the new data
    for (let i= 0; i < p.childNodes.length; i++){
      p.childNodes[i].childNodes[0].classList.remove('hidden');
      p.childNodes[i].childNodes[1].className +=(' hidden');
    }
  };

}

export default Participant;
