export async function generatePDF(responses, sections) {
  // Dynamically import html2pdf.js
  const html2pdf = (await import('html2pdf.js')).default

  // Build HTML content
  const html = buildPDFContent(responses, sections)

  // Create a temporary container
  const container = document.createElement('div')
  container.innerHTML = html
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.style.top = '0'
  document.body.appendChild(container)

  // Generate PDF
  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: 'my-birth-plan.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak: { mode: 'avoid-all', before: '.page-break' }
  }

  try {
    await html2pdf().set(opt).from(container).save()
  } finally {
    // Clean up
    document.body.removeChild(container)
  }
}

function buildPDFContent(responses, sections) {
  const styles = `
    <style>
      * { font-family: 'Helvetica', 'Arial', sans-serif; }
      body { color: #1f2937; line-height: 1.5; }
      .header { text-align: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #F8A5A5; }
      .header h1 { color: #F8A5A5; font-size: 28px; margin: 0 0 8px 0; }
      .header p { color: #6b7280; margin: 0; font-size: 14px; }
      .section { margin-bottom: 20px; }
      .section-title { font-size: 16px; font-weight: bold; color: #F8A5A5; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb; }
      .question { margin-bottom: 12px; }
      .question-label { font-size: 12px; color: #6b7280; margin-bottom: 4px; }
      .question-answer { font-size: 14px; color: #1f2937; }
      .not-answered { color: #9ca3af; font-style: italic; }
      .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 11px; color: #9ca3af; }
    </style>
  `

  let content = `
    ${styles}
    <div class="header">
      <h1>🌸 My Birth Plan</h1>
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
          <div class="question-label">${question.question}</div>
          <div class="question-answer">${displayValue}</div>
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
