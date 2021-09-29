import React, {Component} from "react";
import ContactForm from "./contactForm/ContactForm";
import ContactList from "./contactList/ContactList";
import Filter from "./filter/Filter";
import Section from "./section/Section";


const initialState = {    
  contacts: [    
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}
  ],
  filter: ''
}

class App extends Component {

  state = {
    ...initialState,
  }

componentDidMount() {
  const toObject = JSON.parse(localStorage.getItem('contacts'));
  if(toObject) {
      this.setState({
    contacts:toObject
  })}
}

componentDidUpdate(prevState) {
  if (this.state.contacts !== prevState ) {
    const toString = JSON.stringify(this.state.contacts);
    localStorage.setItem('contacts', toString)
  }
}


onFilterChange = (e) => {
  const {name, value} = e.target;
  this.setState({
    [name]:value,
  })
} 

onSubmit = (contact) => {
  if(contact.name && contact.number) {
    this.state.contacts.some((item) => item.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()) ? alert(`${contact.name} is already in contacts.`) :
    this.setState(prev => ({
      contacts: [...prev.contacts, contact]
    }))
    return    
  }
  alert('Please, enter data !')
}

onDeleteContactById = (id) => {
  this.setState(prev => ({
    contacts: prev.contacts.filter((contact) => contact.id !== id)
  }))
}

getVisibleContacts = () => {
  const {contacts, filter} = this.state;
  return contacts.filter((contact) => contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
}

    
  render() {

    const {contacts, filter} = this.state

    return (
    <>
      <Section title='Phonebook'>
        <ContactForm onSubmit={this.onSubmit}/>
      </Section>

      <Section title="Contacts">
        <Filter onFilterChange={this.onFilterChange} filter={filter}/>
        <ContactList getVisibleContacts={this.getVisibleContacts} contacts={contacts} onDeleteContactById={this.onDeleteContactById}/>
      </Section>
    </>
    );
  }
}

export default App;


