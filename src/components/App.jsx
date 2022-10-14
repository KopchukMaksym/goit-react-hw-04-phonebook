import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import s from './FormStyles.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (!!savedContacts?.length) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = contact => {
    const isExist = contacts.filter(el => contact.name === el.name);
    if (!!isExist.length) {
      alert(`${contact.name} is already in contacts`);
    } else {
      setContacts([...contacts, contact]);
    }
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const handleDelete = id => {
    const newContacts = contacts.filter(el => el.id !== id);
    setContacts(newContacts);
  };

  const filterItems = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <div className={s.section}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter filter={filter} onFilter={handleFilter} />
      {!!contacts.length && (
        <ContactList contacts={filterItems} onDelete={handleDelete} />
      )}
    </div>
  );
};
