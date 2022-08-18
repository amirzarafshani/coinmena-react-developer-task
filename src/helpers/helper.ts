const noEmptyFields = (fields: any) => {
  for (const item in fields) {
    const value = fields[item];
    if (value.trim().length < 1) {
      return false;
    }
  }
  return true;
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export { noEmptyFields, formatter };