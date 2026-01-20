export async function generatePDF(responses, sections) {
  // Build HTML content
  const html = buildPrintContent(responses, sections)

  // Open a new window with the print content
  const printWindow = window.open('', '_blank', 'width=800,height=600')

  if (!printWindow) {
    alert('Please allow popups to print your birth plan')
    return
  }

  printWindow.document.write(html)
  printWindow.document.close()

  // Wait for content to load, then trigger print
  printWindow.onload = () => {
    printWindow.focus()
    printWindow.print()
  }

  // Fallback for browsers where onload doesn't fire reliably
  setTimeout(() => {
    printWindow.focus()
    printWindow.print()
  }, 250)
}

function buildPrintContent(responses, sections) {
  const styles = `
    <style>
      * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 20px;
        color: #1f2937;
        line-height: 1.6;
        background: white;
      }
      .header {
        text-align: center;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 2px solid #F8A5A5;
      }
      .header h1 {
        color: #F8A5A5;
        font-size: 28px;
        margin: 0 0 8px 0;
      }
      .header p {
        color: #6b7280;
        margin: 4px 0;
        font-size: 14px;
      }
      .section {
        margin-bottom: 24px;
        page-break-inside: avoid;
      }
      .section-title {
        font-size: 18px;
        font-weight: bold;
        color: #F8A5A5;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid #e5e7eb;
      }
      .question {
        margin-bottom: 12px;
        page-break-inside: avoid;
      }
      .question-label {
        font-size: 12px;
        color: #6b7280;
        margin-bottom: 2px;
      }
      .question-answer {
        font-size: 14px;
        color: #1f2937;
      }
      .footer {
        margin-top: 32px;
        padding-top: 16px;
        border-top: 1px solid #e5e7eb;
        text-align: center;
        font-size: 11px;
        color: #9ca3af;
      }
      .footer p {
        margin: 4px 0;
      }
      @media print {
        body {
          padding: 0;
        }
        .section {
          page-break-inside: avoid;
        }
        .no-print {
          display: none;
        }
      }
    </style>
  `

  let content = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>My Birth Plan - UCI Health</title>
      ${styles}
    </head>
    <body>
      <div class="header">
        <h1>My Birth Plan</h1>
        <p>Created with NayaBirth for UCI Health</p>
        <p>Generated: ${new Date().toLocaleDateString()}</p>
      </div>
  `

  for (const section of sections) {
    const sectionResponses = responses[section.id] || {}
    const hasAnyResponse = Object.values(sectionResponses).some(v =>
      v !== undefined && v !== null && v !== '' && (!Array.isArray(v) || v.length > 0)
    )

    if (!hasAnyResponse) continue

    content += `<div class="section"><div class="section-title">${section.title}</div>`

    for (const question of section.questions) {
      if (question.type === 'info') continue

      const value = sectionResponses[question.id]
      const displayValue = getDisplayValue(question, value)

      if (!displayValue) continue

      content += `
        <div class="question">
          <div class="question-label">${escapeHtml(question.question)}</div>
          <div class="question-answer">${escapeHtml(displayValue)}</div>
        </div>
      `
    }

    content += '</div>'
  }

  content += `
      <div class="footer">
        <p>This birth plan represents my preferences for labor, delivery, and newborn care.</p>
        <p>I understand that circumstances may require flexibility and I trust my care team to make decisions in the best interest of my baby and me.</p>
      </div>
    </body>
    </html>
  `

  return content
}

function getDisplayValue(question, value) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null
  }

  if (question.type === 'checkbox' && Array.isArray(value)) {
    const labels = value.map(v => {
      const opt = question.options?.find(o => o.value === v)
      return opt?.label || v
    })
    return labels.join(', ')
  }

  if (question.type === 'radio') {
    const opt = question.options?.find(o => o.value === value)
    return opt?.label || value
  }

  return value
}

function escapeHtml(text) {
  if (typeof text !== 'string') return text
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}
