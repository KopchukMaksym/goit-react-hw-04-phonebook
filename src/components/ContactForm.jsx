import PropTypes from 'prop-types';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import s from './FormStyles.module.css';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameValue = e => {
    const { name } = e.target;

    switch (name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    const idEl = nanoid();
    e.preventDefault();
    onSubmit({
      id: idEl,
      name,
      number,
    });
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>Name:</label>
      <input
        className={s.input}
        onChange={handleNameValue}
        type="text"
        value={name}
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label />

      <label className={s.label}>Number:</label>
      <input
        className={s.input}
        onChange={handleNameValue}
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <label />

      <button className={s.btnSubmit} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
