import { useDispatch } from 'react-redux'
import { logout, closeLogoutModal } from '../../slices/loginSlice'

const LogoutComponent = () => {
  const dispatch = useDispatch()

  const handleClickConfirm = () => {
    dispatch(logout())
  }

  const handleClickCancel = () => {
    dispatch(closeLogoutModal())
  }

  return (
    <div className="bg-ibm-canvas border border-ibm-hairline shadow-lg w-[400px]">
      <div className="px-6 py-5 border-b border-ibm-hairline">
        <h2 className="ibm-be-14 text-ibm-ink">Logout</h2>
      </div>
      <div className="px-6 py-6">
        <p className="ibm-bsm-14 text-ibm-ink">
          정말 로그아웃 하시겠습니까?
        </p>
      </div>
      <div className="flex border-t border-ibm-hairline">
        <button
          type="button"
          onClick={handleClickCancel}
          className="flex-1 h-12 ibm-bsm-14 text-ibm-ink border-r border-ibm-hairline hover:bg-ibm-surface-1"
        >
          아니요
        </button>
        <button
          type="button"
          onClick={handleClickConfirm}
          className="flex-1 h-12 ibm-bsm-14 text-white bg-blue-600 hover:bg-blue-700"
        >
          예
        </button>
      </div>
    </div>
  )
}

export default LogoutComponent
