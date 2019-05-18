import React, { Component } from 'react';
import StackTrace from 'stacktrace-js';

import CopyButton from './copy-button';

import ErrorShape from '../utils/error-shape';

class ErrorDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stackframes: null,
    };
  }

  componentDidMount() {
    const { error } = this.props;

    StackTrace.fromError(error)
      .then(stackframes => this.setState({ stackframes }))
      .catch(err => console.error(err));
  }

  render() {
    const { error } = this.props;
    const { stackframes } = this.state;

    if (!stackframes) return null;

    const stack = stackframes.map(sf => sf.toString()).join('\n');
    const info = [error.message, stack].join('\n\n');

    return (
      <div className="p-2 text-left">
        <p className="font-weight-bold">{error.message}</p>
        <pre className="overflow-auto">
          <code>{stack}</code>
        </pre>
        <CopyButton value={info}>Copy error details</CopyButton>
      </div>
    );
  }
}

ErrorDetails.propTypes = {
  error: ErrorShape.isRequired,
};

export default ErrorDetails;
