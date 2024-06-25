export default function AddNewItemBtn({showCreatePopupFn}) {
  return (
    <>
      <button onClick={showCreatePopupFn} className="create-btn">
        <div>
          +
        </div>
      </button>
    </>
  )
}