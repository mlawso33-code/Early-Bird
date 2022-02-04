import React from 'react';
import Cards from 'react-credit-cards';

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div id="PaymentForm">
        <div className="cardImg">
          <Cards
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
          />
        </div>

        <form>
          <input
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input
            type="tel"
            name="name"
            placeholder="Name"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input
            type="text"
            name="expiry"
            placeholder="Valid Thru"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
        </form>
      </div>
    );
  }
}