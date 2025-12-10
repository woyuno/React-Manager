import { useEffect } from 'react'
import request from '@/utils/request'
export default function Login() {
  useEffect(() => {
    request
      .post<string>('/users/login',{})
      .then(() => {
        console.log(1)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return <div>Login</div>
}
