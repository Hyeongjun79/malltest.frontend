import { useEffect } from 'react'
import useCustomLogin from '../hooks/useCustomLogin'
import BasicLayout from '../layouts/BasicLayouts'

const AboutPage = () => {
  const { isLogin, moveToLogin } = useCustomLogin()

  useEffect(() => {
    if (!isLogin) moveToLogin()
  }, [isLogin])

  return (
    <BasicLayout>
      {isLogin && (
        <div className="pt-16">
          <span className="block mb-3 ibm-e-14">About</span>
          <h1 className="ibm-dlg-60 text-ibm-ink">About this site</h1>
          <p className="max-w-2xl mt-6 ibm-blg-18 text-ibm-ink-muted">
            A reference implementation of Carbon Design System for marketing
            surfaces.
          </p>
        </div>
      )}
    </BasicLayout>
  )
}

export default AboutPage
