import React, { Component } from 'react';

const emailRegex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

const formIsValid = formErrors => {
  let valid = true;
  
  // For each value in
  Object.values(formErrors).forEach(formError => {
    // If formError's length is greater than 0, then valid will become false
    if (formError === null) valid = false;
    else if (formError.length) valid = false;
  });

  return valid;
}

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: '',
      formErrors: {
        companyName: null,
        email: null,
        password: null,
        confirmPassword: null,
        acceptedTerms: null,
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formIsValid(this.state.formErrors)) {
      // when form is validated
      console.log(`
        ~~ SEND AJAX REQUEST FROM HERE WITH VALUES ~~

        Company Name: ${this.state.companyName}
        Email: ${this.state.email}
        Password: ${this.state.password}
        Accepted Terms: ${this.state.acceptedTerms}
      `);
    } else {
      // when form is not validated
      console.log("Form is invalid!");
    }
  }

  handleChange = e => {
    const { name, value, checked } = e.target;
    let { formErrors } = this.state;

    switch(name) {
      case "companyName":
        // If it doesn't contain numbers
        if (!/\d/.test(value)) formErrors.companyName = '';
        else formErrors.companyName = 'Only letters allowed!';
        break;
      case "email":
        if (emailRegex.test(value)) formErrors.email = '';
        else formErrors.email = 'Invalid e-mail!';
        break;
      case "password":
        if (value.length >= 6) formErrors.password = '';
        else formErrors.password = 'Password should be at least 6 characters long!';
        break;
      case "confirmPassword":
        if (value.length >= 6 && value === this.state.password) formErrors.confirmPassword = '';
        else formErrors.confirmPassword = 'Did you write the same password?';
        break;
      case "acceptedTerms":
        if (checked) formErrors.acceptedTerms = '';
        else formErrors.acceptedTerms = 'You didn\'t accept our Terms and Conditions!';
        this.setState({
          formErrors,
          [name]: checked
        });
        return;
      default: break;
    }
    this.setState({
      formErrors,
      [name]: value
    }, () => console.log(name, value));
  }

  render() {
    const { companyName, email, password, confirmPassword, acceptedTerms } = this.state.formErrors;

    return (
      <form method="POST" className="col-12 col-md-6" onSubmit={this.handleSubmit} noValidate>
        <div className="row">
          <div className="col text-center">
            <h1>Register</h1>
            <p className="lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. </p>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col mt-4">
            <input type="text" className={"form-control " + (companyName ? 'is-invalid' : '')} placeholder="Company Name" name="companyName" onChange={this.handleChange} noValidate/>
            {companyName ? <small className='text-danger'>{companyName}</small> : ''}
          </div>
        </div>
        <div className="row align-items-center mt-4">
          <div className="col">
            <input type="email" className={"form-control " + (email ? 'is-invalid' : '')} placeholder="Email" name="email" onChange={this.handleChange} noValidate/>
            {email ? <small className='text-danger'>{email}</small> : ''}
          </div>
        </div>
        <div className="row align-items-center mt-4">
          <div className="col-12 col-md-6">
            <input type="password" className={"form-control " + (password ? 'is-invalid' : '')} placeholder="Password" name="password" onChange={this.handleChange} noValidate/>
            {password ? <small className='text-danger'>{password}</small> : ''}
          </div>
          <div className="col-12 col-md-6 mt-4 mt-md-0">
            <input type="password" className={"form-control " + (confirmPassword ? 'is-invalid' : '')} placeholder="Confirm Password" name="confirmPassword" onChange={this.handleChange} noValidate/>
            {confirmPassword ? <small className='text-danger'>{confirmPassword}</small> : ''}
          </div>
        </div>
        <div className="row justify-content-start mt-4">
          <div className="col">
            <div className="form-check">
              <label className={"form-check-label " + (acceptedTerms ? 'text-danger' : '')}>
                <input type="checkbox" className="form-check-input" name="acceptedTerms" onChange={this.handleChange} checked={this.state.acceptedTerms} noValidate/>
                I Read and Accept <span className="text-primary">Terms and Conditions</span>
              </label>
              {acceptedTerms ? <small className='text-danger'>{acceptedTerms}</small> : ''}
            </div>

            <button className="btn btn-primary mt-4">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;