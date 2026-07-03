import { useI18n } from '../i18n-context'

interface SectionDeleteDialogProps {
  onCancel: () => void
  onConfirm: () => void
}

const SectionDeleteDialog = ({ onCancel, onConfirm }: SectionDeleteDialogProps) => {
  const { t } = useI18n()

  return (
    <div className="delete-confirm-modal">
      <div className="modal-content">
        <h3>{t('deleteSectionTitle')}</h3>
        <p>{t('deleteSectionDescription')}</p>
        <div className="modal-buttons">
          <button onClick={onCancel} className="modal-cancel-btn">
            {t('cancel')}
          </button>
          <button onClick={onConfirm} className="modal-delete-btn">
            {t('delete')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SectionDeleteDialog