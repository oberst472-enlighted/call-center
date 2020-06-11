export default function auth ({ next, store }){
  if(store.state.userStatus !== 'operator'){
    return next({
      path: '/dashboard'
    })
  }
  return next()
}
