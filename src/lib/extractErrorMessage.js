export const extractErrorMessage = (err, custom = '') => {
  if (
    err?.response?.data?.errors &&
    typeof err.response.data.errors === 'object'
  ) {
    return Object.values(err.response.data.errors).join('\n');
  }

  if (err?.response?.data?.message) {
    return err.response.data.message;
  }

  if (err?.message) {
    return err.message;
  }

  return custom !== ''
    ? custom
    : 'An unexpected error occurred. Please try again.';
};
