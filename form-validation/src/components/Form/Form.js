import React, { Component } from 'react';

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
        companyName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: '',
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formIsValid(this.state.formErrors)) {
      // TODO 
      // when form is validated
    } else {
      // TODO
      // when form is not validated
    }
  }

  render() {
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
            <input type="text" className="form-control" placeholder="Company Name" name="companyName" noValidate/>
          </div>
        </div>
        <div className="row align-items-center mt-4">
          <div className="col">
            <input type="email" className="form-control" placeholder="Email" name="email" noValidate/>
          </div>
        </div>
        <div className="row align-items-center mt-4">
          <div className="col-12 col-md-6">
            <input type="password" className="form-control" placeholder="Password" name="password" noValidate/>
          </div>
          <div className="col-12 col-md-6 mt-4 mt-md-0">
            <input type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" noValidate/>
          </div>
        </div>
        <div className="row justify-content-start mt-4">
          <div className="col">
            <div className="form-check">
              <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" name="acceptedTerms" noValidate/>
                  I Read and Accept <a href="#">Terms and Conditions</a>
                </label>
            </div>

            <button className="btn btn-primary mt-4">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;