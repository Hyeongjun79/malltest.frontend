import { useEffect, useState, useRef } from 'react'
import { deleteOne, getOne, putOne } from '../../api/productsApi'
import useCustomMove from '../../hooks/useCustomMove'
import ResultModal from '../common/ResultModal'
import FetchingModal from '../common/FetchingModal'
import { API_SERVER_HOST } from '../../api/todoApi'

const host = API_SERVER_HOST

const initState = {
  pno: 0,
  pname: '',
  desc: '',
  price: 0,
  delFlag: false,
  uploadFileNames: [],
}

const ModifyComponent = ({ pno }) => {
  const [product, setProduct] = useState({ ...initState })
  const [result, setResult] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [newFiles, setNewFiles] = useState([])
  const uploadRef = useRef()
  const { moveToList, moveToRead } = useCustomMove()

  useEffect(() => {
    setFetching(true)
    getOne(pno).then((data) => setProduct(data), setFetching(false))
  }, [pno])

  const handleClickModify = () => {
    const formData = new FormData()
    newFiles.forEach((entry) => formData.append('files', entry.file))
    formData.append('pname', product.pname)
    formData.append('pdesc', product.pdesc)
    formData.append('price', product.price)
    formData.append('delFlag', product.delFlag)
    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append('uploadFileNames', product.uploadFileNames[i])
    }
    setFetching(true)
    putOne(pno, formData).then((data) => {
      setResult('Modified')
      setFetching(false)
    })
  }

  const triggerFileInput = () => uploadRef.current?.click()

  const handleFilesSelected = (e) => {
    const selected = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setNewFiles((prev) => [...prev, ...selected])
    e.target.value = ''
  }

  const removeNewFile = (idx) => {
    setNewFiles((prev) => {
      URL.revokeObjectURL(prev[idx].preview)
      return prev.filter((_, i) => i !== idx)
    })
  }
  const handleClickDelete = () => {
    setFetching(true)
    deleteOne(pno).then((data) => {
      setResult('Deleted')
      setFetching(false)
    })
  }
  const colseModal = () => {
    if (result === 'Modified') {
      moveToRead(pno)
    } else if (result === 'Deleted') {
      moveToList({ page: 1 })
    }
    setResult(null)
  }

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value
    setProduct({ ...product })
  }

  const deleteOldImages = (imageName) => {
    const resultFileNames = product.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    )
    product.uploadFileNames = resultFileNames
    setProduct({ ...product })
  }

  return (
    <div className="mt-8 border border-ibm-hairline bg-ibm-canvas">
      {fetching ? <FetchingModal /> : <></>}

      {result ? (
        <ResultModal
          title={`${result}`}
          content={'정상적으로 처리되었습니다.'}
          callbackFn={colseModal}
        ></ResultModal>
      ) : (
        <></>
      )}

      <FormRow label="PNO">
        <div className="ibm-b-16 text-ibm-ink-muted">{product.pno}</div>
      </FormRow>
      <FormRow label="PNAME">
        <input
          className="ibm-input"
          name="pname"
          type="text"
          value={product.pname}
          onChange={handleChangeProduct}
        />
      </FormRow>
      <FormRow label="PRICE">
        <input
          className="ibm-input"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChangeProduct}
        />
      </FormRow>
      <FormRow label="DELETE">
        <select
          name="delFlag"
          className="w-1/5 p-4 border border-solid shadow-md ibm-rounded-md bg-ibm-hairline"
          onChange={handleChangeProduct}
          value={product.delFlag}
        >
          <option value={false}>사용</option>
          <option value={true}>삭제</option>
        </select>
      </FormRow>
      <FormRow label="IMAGE">
        <div className="flex flex-wrap gap-3">
          {product.uploadFileNames.map((imgFile) => (
            <div
              key={imgFile}
              className="flex flex-col w-[calc(33.333%-0.5rem)] gap-2"
            >
              <img alt="img" src={`${host}/api/products/view/s_${imgFile}`} />
              <button
                type="button"
                className="py-2 text-white ibm-bsm-14 bg-ibm-blue hover:bg-ibm-blue-hover"
                onClick={() => deleteOldImages(imgFile)}
              >
                DELETE
              </button>
            </div>
          ))}
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

      <div className="flex justify-end gap-px p-6 border-t bg-ibm-hairline border-ibm-hairline">
        <button
          type="button"
          className="ibm-btn ibm-btn-danger min-w-[160px]"
          onClick={handleClickDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="ibm-btn ibm-btn-primary min-w-[160px]"
          onClick={handleClickModify}
        >
          Modify
        </button>
        <button
          type="button"
          className="ibm-btn ibm-btn-primary min-w-[160px]"
          onClick={moveToList}
        >
          List
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
