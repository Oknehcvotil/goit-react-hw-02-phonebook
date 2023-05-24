import { Component } from 'react';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import { nanoid } from 'nanoid';
import Filter from '../Filter';
import { Section, Title, TitleMain } from './App.styled';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  createContact = data => {
    const { name, number } = data;
    const { contacts } = this.state;
    const id = nanoid();

    const duplicate = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() &&
        contact.number === number
    );

    if (duplicate) {
      return alert(`${name} is already in contacts`);
    }

    const updatedContacts = [...contacts];
    updatedContacts.unshift({ id, name, number });

    this.setState({ contacts: updatedContacts });
  };

  changeFilter = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filtredContacts = this.getVisibleContacts();

    return (
      <>
        <Section title="Phonebook">
          <TitleMain>Phonebook</TitleMain>
          <ContactForm createContact={this.createContact} />
        </Section>
        <Section title="Contacts">
          <Title>Contacts</Title>
          {contacts.length > 0 && (
            <Filter value={filter} onChange={this.changeFilter} />
          )}
          {contacts.length > 0 && (
            <ContactList
              contacts={filter === '' ? contacts : filtredContacts}
              deleteContact={this.deleteContact}
            />
          )}
        </Section>
      </>
    );
  }
}

export default App;
