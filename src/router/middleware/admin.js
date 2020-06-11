export default function auth ({ next, store }){
  if(store.state.userStatus !== 'admin'){
    return next({
      path: '/dashboard'
    })
  }
  return next()
}
