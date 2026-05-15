import { useRef, useState } from 'react'
import ResultModal from '../common/ResultModal'
import useCustomMove from '../../hooks/useCustomMove'
import { postAdd } from '../../api/productsApi'
import FetchingModal from '../common/FetchingModal'
import { useQueryClient, useMutation } from '@tanstack/react-query'

const initState = {
  pname: '',
  pdesc: '',
  price: 0,
  files: [],
}

const AddComponent = () => {
  const [product, setProduct] = useState({ ...initState })
  const [newFiles, setNewFiles] = useState([])
  const { moveToList } = useCustomMove()
  const uploadRef = useRef()
  const queryClient = useQueryClient()

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value
    setProduct({ ...product })
  }
  const addMutation = useMutation({
    mutationFn: (product) => postAdd(product),
  }) //react-query

  const handleClickAdd = (e) => {
    const formData = new FormData()

    newFiles.forEach(({ file }) => {
      formData.append('files', file)
    })

    formData.append('pname', product.pname)
    formData.append('pdesc', product.pdesc)
    formData.append('price', product.price)

    addMutation.mutate(formData)
  }
  const closeModal = () => {
    addMutation.reset()
    queryClient.invalidateQueries('products/list')
    moveToList({ page: 1 })
  }

  const triggerFileInput = () => uploadRef.current?.click()

  const removeNewFile = (idx) => {
    setNewFiles((prev) => {
      URL.revokeObjectURL(prev[idx].preview)
      return prev.filter((_, i) => i !== idx)
    })
  }
  const handleFilesSelected = (e) => {
    const selected = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setNewFiles((prev) => [...prev, ...selected])
    e.target.value = ''
  }

  return (
    <div className="mt-8 border border-ibm-hairline bg-ibm-canvas">
      {addMutation.isPending ? <FetchingModal /> : <></>}
      {addMutation.isSuccess ? (
        <ResultModal
          title={'Product Add Result'}
          content={`${addMutation.data.result}번 등록 완료`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <FormRow label="Product Name">
        <input
          className="ibm-input"
          name="pname"
          type="text"
          value={product.pname}
          onChange={handleChangeProduct}
        />
      </FormRow>
      <FormRow label="Desc">
        <input
          className="ibm-input"
          name="pdesc"
          type="text"
          value={product.pdesc}
          onChange={handleChangeProduct}
        />
      </FormRow>
      <FormRow label="Price">
        <input
          className="ibm-input"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChangeProduct}
          onWheel={(e) => e.target.blur()}
        />
      </FormRow>
      <FormRow label="IMAGE">
        <div className="flex flex-wrap gap-3">
          {newFiles.map((entry, i) => (
            <div
              key={`new-${i}`}
              className="flex flex-col w-[calc(33.333%-0.5rem)] gap-2"
            >
              <img alt="new" src={entry.preview} />
              <button
                type="button"
                className="py-2 text-white ibm-bsm-14 bg-ibm-blue hover:bg-ibm-blue-hover"
                onClick={() => removeNewFile(i)}
              >
                DELETE
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={triggerFileInput}
            className="flex flex-col items-center justify-center w-[calc(33.333%-0.5rem)] min-h-[140px] border-2 border-dashed text-ibm-ink-muted hover:bg-ibm-surface-1 border-ibm-ink-subtle"
          >
            <span className="leading-none ibm-h-32">+</span>
            <span className="mt-2 ibm-bsm-14">이미지 추가</span>
          </button>
          <input
            ref={uploadRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesSelected}
            className="hidden"
          />
        </div>
      </FormRow>

      <div className="flex justify-end p-6 border-t border-ibm-hairline">
        <button
          type="button"
          className="ibm-btn ibm-btn-primary min-w-[160px]"
          onClick={handleClickAdd}
        >
          Add
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
export default AddComponent
