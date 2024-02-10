import React, { Component } from 'react';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  // Для всіх інпутів створюємо один обробник
  // Розрізняти інпути будемо за атрибутом name
  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
    //console.log(this.state[name]);
  };

  handleSubmit = evt => {
    evt.preventDefault();
    // const { name, number } = this.state;
    // console.log(`name: ${name}, numb: ${number}`);
    this.props.addContact({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    return (
      <div>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <br />
          <input
            id="name"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <br />
          <label htmlFor="number">Number</label>
          <br />
          <input
            id="number"
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            required
          />
          <br />
          <button className={css.btn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
export default ContactForm;