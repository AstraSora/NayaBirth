import { useBirthPlan } from '../../context/BirthPlanContext'
import { Card, CardContent } from '../ui/Card'
import { RadioGroup } from '../ui/RadioOption'
import { CheckboxGroup } from '../ui/CheckboxOption'
import { TextInput, TextArea, DateInput } from '../ui/TextInput'
import { LearnMore } from '../ui/LearnMore'

export function QuestionRenderer({ question, sectionId, value }) {
  const { setResponse, responses } = useBirthPlan()

  // Check conditional visibility
  if (question.condition) {
    const { field, includes, notEquals } = question.condition
    const fieldValue = responses[sectionId]?.[field]

    if (includes && !fieldValue?.includes?.(includes)) {
      return null
    }
    if (notEquals && fieldValue === notEquals) {
      return null
    }
  }

  const handleChange = (newValue) => {
    setResponse(sectionId, question.id, newValue)
  }

  // Info type - just display content
  if (question.type === 'info') {
    return (
      <Card color="sky">
        <CardContent className="pt-5">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <p className="text-gray-600">{question.content}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card color="white">
      <CardContent className="pt-5">
        <label className="block">
          <span className="text-base font-medium text-gray-800 mb-3 block">
            {question.question}
            {question.required && <span className="text-coral-500 ml-1">*</span>}
          </span>

          {question.type === 'text' && (
            <TextInput
              value={value}
              onChange={handleChange}
              placeholder={question.placeholder}
              required={question.required}
            />
          )}

          {question.type === 'date' && (
            <DateInput
              value={value}
              onChange={handleChange}
              required={question.required}
            />
          )}

          {question.type === 'textarea' && (
            <TextArea
              value={value}
              onChange={handleChange}
              placeholder={question.placeholder}
            />
          )}

          {question.type === 'radio' && (
            <RadioGroup
              name={`${sectionId}-${question.id}`}
              options={question.options}
              value={value}
              onChange={handleChange}
            />
          )}

          {question.type === 'checkbox' && (
            <CheckboxGroup
              options={question.options}
              values={value || []}
              onChange={handleChange}
            />
          )}
        </label>

        {question.learnMore && (
          <LearnMore>{question.learnMore}</LearnMore>
        )}
      </CardContent>
    </Card>
  )
}
