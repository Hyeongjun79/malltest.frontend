const ResultModal = ({ title, content, callbackFn }) => {
  return (
    <div
      className="fixed inset-0 z-[1055] flex items-center justify-center bg-black bg-opacity-40"
      onClick={() => {
        if (callbackFn) {
          callbackFn()
        }
      }}
    >
      <div
        className="relative bg-ibm-canvas border border-ibm-hairline w-full max-w-[640px] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-4 border-b border-ibm-hairline">
          <div className="mb-2 ibm-e-14 text-ibm-ink-muted">Notification</div>
          <h2 className="font-light ibm-ct-24 text-ibm-ink">{title}</h2>
        </div>

        <div className="px-6 py-8 ibm-ct-24 text-ibm-ink-muted">{content}</div>

        <div className="flex justify-end border-t border-ibm-hairline">
          <button
            className="ibm-btn ibm-btn-primary min-w-[200px]"
            onClick={() => {
              if (callbackFn) {
                callbackFn()
              }
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultModal
