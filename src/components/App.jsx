import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { ContactList } from './ContactList/ContactList';
import localStorage from 'storage.js';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = contact => {
    const contacts = this.state.contacts;
    const names = contacts.map(elem => elem.name.toLowerCase());
    if (names.includes(contact.name.toLowerCase())) {
      window.alert('The name ' + contact.name + ' already exists');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };

    this.setState({ contacts: [...contacts, newContact] });
  };

  setFilter = name => {
    this.setState({
      filter: name.toLowerCase(),
    });
  };

  findContact = () => {
    const filter = this.state.filter;
    const contacts = this.state.contacts;
    return contacts.filter(el => {
      const curName = el.name;
      let temp = curName.substr(0, filter.length);
      return filter.toLowerCase() === temp.toLowerCase();
    });
  };

  deleteContact = id => {
    const contacts = this.state.contacts.filter(elem => elem.id !== id);
    this.setState({
      contacts: contacts,
    });
  };
  componentDidMount() {
    const contacts = localStorage.getItem('phoneBook');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('phoneBook', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <div
        style={{
          width: 400,
          marginLeft: '8px',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <ContactFilter handleFiltering={this.setFilter} />
        <ContactList
          contacts={this.findContact()}
          handleDelete={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;