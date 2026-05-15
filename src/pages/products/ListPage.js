import ListComponent from '../../components/products/ListComponent'
const ListPage = () => {
  return (
    <div className="w-full pt-12">
      <span className="block mb-3 ibm-e-14">Product</span>
      <h1 className="ibm-dmd-42 text-ibm-ink">Product list</h1>
      <p className="max-w-2xl mt-3 ibm-blg-18 text-ibm-ink-muted"></p>
      <ListComponent />
    </div>
  )
}
export default ListPage
