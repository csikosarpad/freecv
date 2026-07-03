interface SectionDeleteDialogProps {
  onCancel: () => void
  onConfirm: () => void
}

const SectionDeleteDialog = ({ onCancel, onConfirm }: SectionDeleteDialogProps) => {
  return (
    <div className="delete-confirm-modal">
      <div className="modal-content">
        <h3>Delete Section?</h3>
        <p>Are you sure you want to delete this section? This action cannot be undone.</p>
        <div className="modal-buttons">
          <button onClick={onCancel} className="modal-cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="modal-delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default SectionDeleteDialog