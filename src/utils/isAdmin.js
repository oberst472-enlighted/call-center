export default () => localStorage.getItem('role') === 'administrator' || sessionStorage.getItem('token') === 'administrator'
