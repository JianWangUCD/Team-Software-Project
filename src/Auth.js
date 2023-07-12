const username = '111';
const password = '111';

const credentials = window.btoa(username + ':' + password);

export const auth = {
  'Authorization': 'Basic ' + credentials,
  'Content-Type': 'application/json'
};