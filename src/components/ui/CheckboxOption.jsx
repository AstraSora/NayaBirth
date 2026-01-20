export function CheckboxOption({
  value,
  label,
  checked,
  onChange,
  className = '',
}) {
  return (
    <label
      className={`
        option-card
        ${checked ? 'option-card-selected' : ''}
        ${className}
      `}
    >
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`
          w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0
          transition-all duration-200
          ${checked
            ? 'border-coral-400 bg-coral-400'
            : 'border-gray-300 bg-white'
          }
        `}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={`text-base ${checked ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
        {label}
      </span>
    </label>
  )
}

export function CheckboxGroup({
  options,
  values = [],
  onChange,
  className = '',
}) {
  const handleChange = (optionValue, isChecked) => {
    if (isChecked) {
      onChange([...values, optionValue])
    } else {
      onChange(values.filter(v => v !== optionValue))
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {options.map((option) => (
        <CheckboxOption
          key={option.value}
          value={option.value}
          label={option.label}
          checked={values.includes(option.value)}
          onChange={(e) => handleChange(option.value, e.target.checked)}
        />
      ))}
    </div>
  )
}
