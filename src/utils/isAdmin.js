export default () => localStorage.getItem('role') === 'admin' ||
        sessionStorage.getItem('token') === 'admin'
