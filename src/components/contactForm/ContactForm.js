import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ContactFormStyled } from './ContactFormStyled';

const initialState= { 
  name: '',
  number: '',
 }

class ContactForm extends Component {
  state = {
    ...initialState,
  }

  onHandleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]:value,
    })
  }
  
  onHandleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({...this.state, id: uuidv4()});
    this.setState({
      ...initialState,
    })
  }
  
  render() {
    const {name, number} = this.state;
    return (
        <ContactFormStyled onSubmit={this.onHandleSubmit}>
          <label>
           Name 
           <br/>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={this.onHandleChange}
            value={name}
          />
          </label>
          <label>
           Number
           <br/>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={this.onHandleChange}
            value={number}
          />
          </label>
          <button type='submit' onClick={this.onHandleSubmit}>Add contact</button>
        </ContactFormStyled>
    );
  }
}

export default ContactForm;