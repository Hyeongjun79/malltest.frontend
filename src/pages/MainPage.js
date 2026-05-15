import BasicLayout from '../layouts/BasicLayouts'
import { Link } from 'react-router-dom'

const MainPage = () => {
  return (
    <BasicLayout>
      <div className="pt-16">
        <span className="block mb-3 ibm-e-14">Welcome</span>
        <h1 className="max-w-4xl ibm-dxl-76 text-ibm-ink">
          IBM Cloud Native Dev base AI agent 4
        </h1>
        <p className="max-w-2xl mt-8 ibm-blg-18 text-ibm-ink-muted">
          A faithful application of Carbon Design System — flat geometry,
          light-weight type, and a single confident accent.
        </p>

        <div className="flex gap-4 mt-10">
          <Link to="/todo/" className="ibm-btn ibm-btn-primary">
            Go to Todo
          </Link>
          <Link to="/about" className="ibm-btn ibm-btn-tertiary">
            Learn more
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px mt-24 border md:grid-cols-3 bg-ibm-hairline border-ibm-hairline">
          <div className="p-8 bg-ibm-canvas">
            <div className="mb-3 ibm-e-14 text-ibm-ink-muted">01</div>
            <h3 className="font-light ibm-ct-24 text-ibm-ink">Sample</h3>
            <p className="mt-3 ibm-bsm-14 text-ibm-ink-muted">
              Every CTA, card and input keeps a 0px corner.
            </p>
          </div>
          <div className="p-8 bg-ibm-canvas">
            <div className="mb-3 ibm-e-14 text-ibm-ink-muted">02</div>
            <h3 className="font-light ibm-ct-24 text-ibm-ink">Sample</h3>
            <p className="mt-3 ibm-bsm-14 text-ibm-ink-muted">
              IBM Plex Sans at weight 300 is the brand voice.
            </p>
          </div>
          <div className="p-8 bg-ibm-canvas">
            <div className="mb-3 ibm-e-14 text-ibm-ink-muted">03</div>
            <h3 className="font-light ibm-ct-24 text-ibm-ink">Sample</h3>
            <p className="mt-3 ibm-bsm-14 text-ibm-ink-muted">
              IBM Blue marks links, primary CTAs, and focus rings.
            </p>
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}

export default MainPage
