import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { modifyMember } from '../../api/memberApi'
import useCustomLogin from '../../hooks/useCustomLogin'
import ResultModal from '../common/ResultModal'

const initState = {
  email: '',
  pw: '',
  nickname: '',
}

const ModifyComponent = () => {
  const [member, setMember] = useState(initState)
  const loginInfo = useSelector((state) => state.loginSlice)
  const { moveToLogin, doLogout } = useCustomLogin()
  const [result, setResult] = useState()

  useEffect(() => {
    setMember({ ...loginInfo, pw: 'ABCD' })
  }, [loginInfo])

  const handleChange = (e) => {
    member[e.target.name] = e.target.value
    setMember({ ...member })
  }

  const handleClickModify = () => {
    modifyMember(member).then((result) => {
      setResult('Modified')
    })
  }

  const closeModal = () => {
    setResult(null)
    doLogout()
    moveToLogin()
  }

  return (
    <div className="mt-8 border border-ibm-hairline bg-ibm-canvas">
      {result ? (
        <ResultModal
          title={'회원정보'}
          content={'정보수정완료'}
          callbackFn={closeModal}
        ></ResultModal>
      ) : (
        <></>
      )}
      <FormRow label="EMAIL">
        <div className="ibm-b-16 text-ibm-ink-muted">{member.email}</div>
      </FormRow>
      <FormRow label="PASSWORD">
        <input
          className="ibm-input"
          name="pw"
          type="password"
          value={member.pw}
          onChange={handleChange}
        />
      </FormRow>
      <FormRow label="NICKNAME">
        <input
          className="ibm-input"
          name="nickname"
          type="text"
          value={member.nickname}
          onChange={handleChange}
        />
      </FormRow>

      <div className="flex justify-end gap-px p-6 border-t bg-ibm-hairline border-ibm-hairline">
        <button
          type="button"
          className="ibm-btn ibm-btn-primary min-w-[160px]"
          onClick={handleClickModify}
        >
          Modify
        </button>
      </div>
    </div>
  )
}

const FormRow = ({ label, children }) => (
  <div className="flex border-b border-ibm-hairline">
    <div className="w-1/4 px-6 py-5 border-r ibm-e-14 text-ibm-ink-muted bg-ibm-surface-1 border-ibm-hairline">
      {label}
    </div>
    <div className="w-3/4 px-6 py-4 ibm-b-16 text-ibm-ink">{children}</div>
  </div>
)

export default ModifyComponent
