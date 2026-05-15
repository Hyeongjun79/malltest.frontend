const FetchingModal = () => {
  return (
    <div
      className={`fixed top-0 left-0 z-[1055] flex h-full w-full place-items-center justify-center bg-black bg-opacity-20`}
    >
      <div className="flex items-center justify-center w-1/4 bg-white opacity-100 h-1/4 ibm-rounded-md">
        <div className="mb-1 ibm-h-32 text-ibm-ink-muted">Loading...</div>
      </div>
    </div>
  )
}
export default FetchingModal
