import { useI18n } from '../i18n-context'
import type { Locale } from '../i18n-data'

interface SideBarProps {
  isSaving: boolean
    canUndo: boolean
    canRedo: boolean
    theme: 'light' | 'dark'
    locale: Locale
    onUndo: () => void
    onRedo: () => void
    onToggleTheme: () => void
    onLocaleChange: (locale: Locale) => void
  onReset: () => void
}

const SideBar = ({
    isSaving,
    canUndo,
    canRedo,
    theme,
    locale,
    onUndo,
    onRedo,
    onToggleTheme,
    onLocaleChange,
    onReset,
}: SideBarProps) => {
        const { t } = useI18n()

    const handlePDFExport = async () => {
        const element = document.querySelector('.cv-frame')
        if (!element || !(element instanceof HTMLElement)) {
            alert('CV frame not found')
            return
        }

        document.body.classList.add('is-exporting-pdf')

        try {
            await new Promise<void>((resolve) => {
                requestAnimationFrame(() => resolve())
            })

            const html2pdf = await import('html2pdf.js')
            const options = {
                margin: [6, 6, 6, 6] as [number, number, number, number],
                filename: 'my-cv.pdf',
                image: { type: 'png' as const, quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'mm' as const, format: 'a4', orientation: 'portrait' as const },
                pagebreak: { mode: ['css', 'legacy'] as const },
            }
            await html2pdf.default().set(options).from(element).save()
        } finally {
            document.body.classList.remove('is-exporting-pdf')
        }
    }
    return (
        <aside className="sidebar frame-container" aria-label="Editor actions">
            <h1>{t('appTitle')}</h1>
            
            <div className="sidebar-status">
                {isSaving && (
                    <output className="saving-status">
                        <span className="saving-dot">●</span>
                        {` ${t('saving')}`}
                    </output>
                )}
                {!isSaving && (
                    <output className="saved-status">
                        {`✓ ${t('saved')}`}
                    </output>
                )}
            </div>

            <div className="sidebar-actions">
                <div className="sidebar-preferences">
                    <button onClick={onToggleTheme} className="button-secondary" type="button">
                        {theme === 'light' ? t('darkMode') : t('lightMode')}
                    </button>
                    <label className="sidebar-select-field">
                        <span>{t('language')}</span>
                        <select
                            className="sidebar-select"
                            value={locale}
                            onChange={(event) => onLocaleChange(event.target.value as Locale)}
                        >
                            <option value="en">{t('english')}</option>
                            <option value="hu">{t('hungarian')}</option>
                        </select>
                    </label>
                </div>
                <div className="history-actions" aria-label={t('historyActions')}>
                    <button onClick={onUndo} className="button-secondary" disabled={!canUndo}>
                        {t('undo')}
                    </button>
                    <button onClick={onRedo} className="button-secondary" disabled={!canRedo}>
                        {t('redo')}
                    </button>
                </div>
                <button 
                    onClick={() => globalThis.print()} 
                    className="button-print" 
                    title={t('printCvTitle')}
                >
                    {`🖨️ ${t('printCv')}`}
                </button>
                <button 
                    onClick={handlePDFExport} 
                    className="button-pdf" 
                    title={t('exportPdfTitle')}
                >
                    {`📄 ${t('exportPdf')}`}
                </button>
                <button onClick={onReset} className="button-reset" title={t('resetAllTitleAttr')}>
                    {t('resetAll')}
                </button>
            </div>
        </aside>
    )
}

export default SideBar