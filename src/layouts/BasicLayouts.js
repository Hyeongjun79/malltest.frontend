import BasicMenu from '../components/menus/BasicMenu'
import CartComponent from '../components/menus/CartComponent'

const BasicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-ibm-canvas text-ibm-ink">
      <BasicMenu />

      <div className="max-w-[1584px] mx-auto flex flex-col w-full bg-ibm-canvas md:flex-row">
        <main className="px-8 py-16 md:w-3/4 md:border-r md:border-ibm-hairline">
          {children}
        </main>
        <aside className="px-8 py-16 md:w-1/4 bg-ibm-surface-1">
          <span className="block mb-3 ibm-e-14">
            <CartComponent />
          </span>
        </aside>
      </div>

      <footer className="mt-24 bg-ibm-inverse-canvas text-ibm-inverse-ink-muted">
        <div className="max-w-[1584px] mx-auto px-8 py-16">
          <div className="mb-4 ibm-be-14 text-ibm-inverse-ink">
            IBM Cloud Native Dev base AI agent 4
          </div>
          <p className="ibm-bsm-14 text-ibm-inverse-ink-muted">
            © 2026 IBM. Built with Carbon Design System principles. IBM Agent
            4th class KWON HYEONG JUN
          </p>
        </div>
      </footer>
    </div>
  )
}

export default BasicLayout
