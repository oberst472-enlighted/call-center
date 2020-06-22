export default function auth ({ next, store }){
  if((sessionStorage.getItem('userType') && sessionStorage.getItem('userType')) !== 'admin'){
    return next({
      path: '/dashboard'
    })
  }
  return next()
}
