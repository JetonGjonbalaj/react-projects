import React, { Component } from 'react';
import Form from '../Form/Form';
import image from './image.svg';

class App extends Component {
  render() {
    return (
      <section className="py-4 min-vh-100 d-flex flex-column justify-content-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-sm-4 col-md-6 px-5">
              <img alt="This is an svg" className="img-fluid rounded-0" src={image} />
            </div>

            <Form />
          </div>
        </div>
      </section>
    );
  }
}

export default App;
