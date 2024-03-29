import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactReducer';
import css from "./ContactForm.module.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(state => state.contacts.contacts);

  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleContact = (name, number) => {
    if (contacts.some(contact => contact.name === name)) {
      Notify.failure(`${name} вже є в списку контактів.`, {
        position: 'center-bottom',
        timeout: 3000,
        width: '320px',
        fontSize: '18px'
      });
      return;
    }
    const newOneContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(addContact(newOneContact));
  };

  const handleSubmit = event => {
    event.preventDefault();

    handleContact(name, number);

    setName('');
    setNumber('');
  };


  return (
    <form className={css.contactsflex} onSubmit={handleSubmit}>
      <input
        className={css.contactinput}
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Ім'я"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        required
      />
      <input
        className={css.contactinput}
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        placeholder="Номер телефону"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        required
      />
      <button className={css.contactbutton} type="submit">Додати контакт</button>
    </form>
  );
}

export default ContactForm;
