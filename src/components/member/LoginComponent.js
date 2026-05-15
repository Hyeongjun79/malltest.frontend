import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { closeLoginModal, loginPostAsync } from '../../slices/loginSlice'
import { login } from '../../slices/loginSlice'
import useCustomLogin from '../../hooks/useCustomLogin'
import KakaoLoginComponent from './KakaoLoginComponent'
import GoogleLoginComponent from './GoogleLoginComponent'
import NaverLoginComponent from './NaverLoginComponent.js'

const initState = {
  email: '',
  pw: '',
}

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState })
  const dispatch = useDispatch()
  const { doLogin, moveToPath } = useCustomLogin()

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value

    setLoginParam({ ...loginParam })
  }
  const handleClickLogin = (e) => {
    dispatch(loginPostAsync(loginParam))
      .unwrap()
      .then((data) => {
        console.log('after unwrap.')

        if (data.error) {
          alert('이메일과 패스워드를 확인하시오')
        } else {
          alert('로그인 성공')
          moveToPath('/')
        }
      })
  }

  const handleClose = () => {
    dispatch(closeLoginModal())
  }

  return (
    <div className="relative p-4 m-2 mt-10 bg-white border-2 border-sky-200">
      <button
        type="button"
        onClick={handleClose}
        className="absolute text-2xl font-bold text-gray-500 top-2 right-3 hover:text-gray-800"
        aria-label="Close"
      >
        ×
      </button>
      <div className="flex justify-center">
        <div className="p-4 m-4 text-4xl font-extrabold text-blue-500">
          Login
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-full p-3 font-bold text-left">Email</div>
          <input
            className="w-full p-3 border border-solid rounded-r shadow-md border-neutral-500"
            name="email"
            type={'text'}
            value={loginParam.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-full p-3 font-bold text-left">Password</div>
          <input
            className="w-full p-3 border border-solid rounded-r shadow-md border-neutral-500"
            name="pw"
            type={'password'}
            value={loginParam.pw}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative flex justify-center w-full mb-4">
          <div className="flex justify-center w-2/5 p-6 font-bold">
            <button
              className="p-4 text-xl text-white bg-blue-500 rounded w-36"
              onClick={handleClickLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <KakaoLoginComponent />
      <GoogleLoginComponent />
      <NaverLoginComponent />
    </div>
  )
}

export default LoginComponent
