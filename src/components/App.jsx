import React, { useState, useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import shortid from 'shortid';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const newContact = {
      id: shortid.generate(),
      ...data,
    };
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (existingContact) {
      alert(`${existingContact.name} is already in contacts`);
      return;
    }
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacs = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact}></ContactForm>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter}></Filter>
      <ContactList
        contacts={filteredContacs}
        onDeteleContact={deleteContact}
      ></ContactList>
    </>
  );
}

export default App;
