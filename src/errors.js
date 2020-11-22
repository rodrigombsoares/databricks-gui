/* eslint-disable linebreak-style */
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export { ValidationError };
