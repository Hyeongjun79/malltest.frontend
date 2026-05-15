const PageComponent = ({ serverData, movePage }) => {
  return (
    <div className="flex justify-center mt-12 border-t border-ibm-hairline">
      {serverData.prev ? (
        <button
          type="button"
          className="px-4 h-12 ibm-bsm-14 text-ibm-blue hover:bg-ibm-surface-1 border-r border-ibm-hairline"
          onClick={() => movePage({ page: serverData.prevPage })}
        >
          Prev
        </button>
      ) : null}

      {serverData.pageNumList.map((pageNum) => {
        const selected = serverData.current === pageNum
        return (
          <button
            key={pageNum}
            type="button"
            className={`w-12 h-12 ibm-bsm-14 border-r border-ibm-hairline transition-colors ${
              selected
                ? 'bg-ibm-ink text-ibm-inverse-ink font-semibold'
                : 'bg-ibm-canvas text-ibm-ink hover:bg-ibm-surface-1'
            }`}
            onClick={() => movePage({ page: pageNum })}
          >
            {pageNum}
          </button>
        )
      })}

      {serverData.next ? (
        <button
          type="button"
          className="px-4 h-12 ibm-bsm-14 text-ibm-blue hover:bg-ibm-surface-1"
          onClick={() => movePage({ page: serverData.nextPage })}
        >
          Next
        </button>
      ) : null}
    </div>
  )
}
export default PageComponent
