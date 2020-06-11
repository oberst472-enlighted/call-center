export default function auth ({ next, store }){
  if(sessionStorage.getItem('isUserLoggedIn') || localStorage.getItem('isUserLoggedIn')){
    return next({
      path: '/dashboard'
    })
  }
  return next()
}
