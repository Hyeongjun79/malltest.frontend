import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { openLoginModal, openLogoutModal } from '../../slices/loginSlice'
import LoginComponent from '../member/LoginComponent'
import LogoutComponent from '../member/LogoutComponent'

const BasicMenu = () => {
  const loginState = useSelector((state) => state.loginSlice)
  const dispatch = useDispatch()

  return (
    <>
      <header className="w-full">
        {/* Utility bar */}
        <div className="w-full border-b bg-ibm-surface-1 border-ibm-hairline">
          <div className="flex items-center justify-end max-w-[1584px] mx-auto h-8 px-4 ibm-c-12 text-ibm-ink-muted">
            <span className="px-3">South korea</span>
            <span className="px-3 border-l border-ibm-hairline">Contact</span>
            <span className="px-3 border-l border-ibm-hairline">Support</span>
          </div>
        </div>

        {/* Top nav */}
        <nav
          id="navbar"
          className="w-full border-b bg-ibm-canvas border-ibm-hairline"
        >
          <div className="flex items-center justify-between max-w-[1584px] mx-auto h-12 px-4">
            <div className="flex items-center h-full">
              <Link
                to={'/'}
                className="ibm-be-14 text-ibm-ink pr-8 tracking-[0.2px]"
              >
                IBM Mall
              </Link>
              <ul className="flex items-center h-full">
                <li className="h-full">
                  <Link
                    to={'/'}
                    className="flex items-center h-full px-4 ibm-bsm-14 text-ibm-ink hover:bg-ibm-surface-1"
                  >
                    Main
                  </Link>
                </li>
                <li className="h-full">
                  <Link
                    to={'/about'}
                    className="flex items-center h-full px-4 ibm-bsm-14 text-ibm-ink hover:bg-ibm-surface-1"
                  >
                    About
                  </Link>
                </li>
                {loginState.email ? (
                  <>
                    <li className="h-full">
                      <Link
                        to={'/todo/'}
                        className="flex items-center h-full px-4 ibm-bsm-14 text-ibm-ink hover:bg-ibm-surface-1"
                      >
                        Todo
                      </Link>
                    </li>
                    <li className="h-full">
                      <Link
                        to={'/products/'}
                        className="flex items-center h-full px-4 ibm-bsm-14 text-ibm-ink hover:bg-ibm-surface-1"
                      >
                        Products
                      </Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </ul>
            </div>

            <div className="flex items-center h-full">
              {!loginState.email ? (
                <button
                  type="button"
                  onClick={() => dispatch(openLoginModal())}
                  className="flex items-center h-full px-4 ibm-bsm-14 text-ibm-ink hover:bg-ibm-surface-1"
                >
                  Login
                </button>
              ) : (
                <></>
              )}
              {loginState.email ? (
                <>
                  <button
                    type="button"
                    onClick={() => dispatch(openLogoutModal())}
                    className="flex items-center h-full px-4 ibm-bsm-14 text-ibm-error hover:bg-ibm-surface-1"
                  >
                    Logout
                  </button>
                  <Link
                    to="/member/modify"
                    className="flex items-center justify-center w-8 h-8 mx-2 border rounded-full bg-ibm-surface-1 border-ibm-hairline hover:bg-ibm-hairline"
                    aria-label="회원 정보 수정"
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </nav>
      </header>
      {loginState.isModalOpen && (
        <div className="fixed inset-0 z-[1055] flex items-center justify-center bg-black/50">
          <LoginComponent />
        </div>
      )}
      {loginState.isLogoutModalOpen && (
        <div className="fixed inset-0 z-[1055] flex items-center justify-center bg-black/50">
          <LogoutComponent />
        </div>
      )}
    </>
  )
}

export default BasicMenu
