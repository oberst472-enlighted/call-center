export default function auth ({ next, store }){
  if(!(sessionStorage.getItem('isUserLoggedIn') || localStorage.getItem('isUserLoggedIn'))){
    console.log('Not allowed access for not logged in user')
    return next({
      path: '/login'
    })
  }
  return next()
}
