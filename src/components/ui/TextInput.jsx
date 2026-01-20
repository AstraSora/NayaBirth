export function TextInput({
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  className = '',
  ...props
}) {
  return (
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className={`input-field ${className}`}
      {...props}
    />
  )
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
  className = '',
  ...props
}) {
  return (
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`input-field resize-none ${className}`}
      {...props}
    />
  )
}

export function DateInput({
  value,
  onChange,
  required,
  className = '',
  ...props
}) {
  return (
    <input
      type="date"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={`input-field ${className}`}
      {...props}
    />
  )
}
