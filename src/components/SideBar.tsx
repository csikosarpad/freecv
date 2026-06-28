interface SideBarProps {
  isSaving: boolean
  onReset: () => void
}

const SideBar = ({ isSaving, onReset }: SideBarProps) => {
    const handlePDFExport = () => {
        const element = document.querySelector('.cv-frame')
        if (!element || !(element instanceof HTMLElement)) {
            alert('CV frame not found')
            return
        }

        // Dynamic import to avoid issues with SSR
        import('html2pdf.js').then((html2pdf) => {
            const options = {
                margin: 0,
                filename: 'my-cv.pdf',
                image: { type: 'png' as const, quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { format: 'a4', orientation: 'portrait' as const },
            }
            html2pdf.default().set(options).from(element).save()
        })
    }
    return (
        <aside className="sidebar frame-container" aria-label="Editor actions">
            <h1>FREE CV Editor</h1>
            
            <div className="sidebar-status">
                {isSaving && (
                    <output className="saving-status">
                        <span className="saving-dot">●</span>
                        {' Saving...'}
                    </output>
                )}
                {!isSaving && (
                    <output className="saved-status">
                        {'✓ Saved'}
                    </output>
                )}
            </div>

            {/* <ul>
                <li>Edit sections</li>
                <li>Reorder blocks</li>
                <li>Print CV</li>
            </ul> */}

            <div className="sidebar-actions">
                <button 
                    onClick={() => globalThis.print()} 
                    className="button-print" 
                    title="Print your CV"
                >
                    🖨️ Print CV
                </button>
                <button 
                    onClick={handlePDFExport} 
                    className="button-pdf" 
                    title="Export CV as PDF"
                >
                    📄 Export PDF
                </button>
                <button onClick={onReset} className="button-reset" title="Reset all CV data">
                    Reset All
                </button>
            </div>
        </aside>
    )
}

export default SideBar