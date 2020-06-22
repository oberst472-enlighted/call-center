export default function auth ({ next, store }){
  if((sessionStorage.getItem('userType') && sessionStorage.getItem('userType')) !== 'operator'){
    return next({
      path: '/dashboard'
    })
  }
  return next()
}
