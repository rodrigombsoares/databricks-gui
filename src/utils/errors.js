class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

// eslint-disable-next-line import/prefer-default-export
export { ValidationError };
