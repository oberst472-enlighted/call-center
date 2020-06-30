export default function auth ({ next, store }){
  if((localStorage.getItem('userType') || sessionStorage.getItem('userType')) !== 'admin'){
    return next({
      path: '/dashboard'
    })
  }
  return next()
}
