import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { useChecklist } from '../context/ChecklistContext'

function CheckboxItem({ item, isChecked, onToggle, onRemove }) {
  return (
    <div
      className="flex items-center gap-3 py-3 px-4 min-h-[44px] hover:bg-gray-50 rounded-lg transition-colors group"
      role="listitem"
    >
      <button
        onClick={() => onToggle(item.id)}
        className={`
          w-6 h-6 rounded-md border-2 flex-shrink-0 flex items-center justify-center
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-1
          ${isChecked
            ? 'bg-teal-500 border-teal-500'
            : 'border-gray-300 hover:border-teal-400'
          }
        `}
        aria-label={`${isChecked ? 'Uncheck' : 'Check'} ${item.label}`}
        aria-checked={isChecked}
        role="checkbox"
      >
        {isChecked && (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <span
        className={`
          flex-1 text-gray-800 transition-all duration-200
          ${isChecked ? 'line-through text-gray-400' : ''}
        `}
      >
        {item.label}
        {item.essential && (
          <span className="ml-2 text-xs bg-coral-100 text-coral-600 px-2 py-0.5 rounded-full">
            Essential
          </span>
        )}
      </span>
      {item.id.startsWith('custom-') && (
        <button
          onClick={() => onRemove(item.id)}
          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all focus:outline-none focus:ring-2 focus:ring-red-300 rounded"
          aria-label={`Remove ${item.label}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

function AddItemForm({ categoryId, onAdd }) {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) {
      onAdd(categoryId, value.trim())
      setValue('')
      setIsOpen(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 py-3 px-4 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors w-full text-left"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-sm font-medium">Add custom item</span>
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 py-2 px-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter item name"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 text-sm"
        autoFocus
      />
      <button
        type="submit"
        className="px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium"
      >
        Add
      </button>
      <button
        type="button"
        onClick={() => {
          setIsOpen(false)
          setValue('')
        }}
        className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors text-sm"
      >
        Cancel
      </button>
    </form>
  )
}

function CategorySection({ category, isExpanded, onToggle, isItemChecked, onToggleItem, onAddItem, onRemoveItem, customItems }) {
  const allItems = [...category.items, ...customItems]
  const checkedCount = allItems.filter(item => isItemChecked(item.id)).length
  const totalCount = allItems.length

  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => onToggle(category.id)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-300"
        aria-expanded={isExpanded}
        aria-controls={`category-${category.id}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">{category.icon}</span>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">{category.title}</h3>
            <p className="text-sm text-gray-500">{checkedCount} of {totalCount} packed</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {checkedCount === totalCount && totalCount > 0 && (
            <span className="text-teal-500 text-xl" aria-label="All items packed">✓</span>
          )}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div
          id={`category-${category.id}`}
          className="border-t border-gray-100 animate-fade-in"
          role="list"
          aria-label={`${category.title} items`}
        >
          {allItems.map((item) => (
            <CheckboxItem
              key={item.id}
              item={item}
              isChecked={isItemChecked(item.id)}
              onToggle={onToggleItem}
              onRemove={onRemoveItem}
            />
          ))}
          <AddItemForm categoryId={category.id} onAdd={onAddItem} />
        </div>
      )}
    </Card>
  )
}

export function HospitalChecklist() {
  const navigate = useNavigate()
  const {
    categories,
    hospitalProvides,
    toggleItem,
    addCustomItem,
    removeCustomItem,
    toggleCategory,
    reset,
    getTotalItems,
    getCheckedCount,
    isItemChecked,
    isCategoryExpanded,
    getCustomItems
  } = useChecklist()

  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showHospitalInfo, setShowHospitalInfo] = useState(false)

  const totalItems = getTotalItems()
  const checkedCount = getCheckedCount()
  const progressPercent = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0

  const handleReset = useCallback(() => {
    reset()
    setShowResetConfirm(false)
  }, [reset])

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex flex-col">
      <Header showBack onBack={() => navigate('/')} title="Hospital Bag Checklist" />

      <main className="flex-1 max-w-lg mx-auto px-4 py-6 w-full">
        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                {checkedCount} of {totalItems} items packed
              </span>
              <span className="text-sm font-medium text-teal-600">
                {progressPercent}%
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${progressPercent}% packed`}
              />
            </div>
            {progressPercent === 100 && (
              <div className="mt-3 text-center text-teal-600 font-medium animate-fade-in">
                All packed and ready to go!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tip Card */}
        <Card className="mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">💡</span>
              <div>
                <h2 className="font-medium text-gray-800 mb-1">Pack around 36 weeks</h2>
                <p className="text-sm text-gray-700">
                  Have your bag ready early, just in case! Items checked are saved automatically.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="space-y-4 mb-6">
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              isExpanded={isCategoryExpanded(category.id)}
              onToggle={toggleCategory}
              isItemChecked={isItemChecked}
              onToggleItem={toggleItem}
              onAddItem={addCustomItem}
              onRemoveItem={removeCustomItem}
              customItems={getCustomItems(category.id)}
            />
          ))}
        </div>

        {/* Hospital Provides Section */}
        <Card className="mb-6">
          <button
            onClick={() => setShowHospitalInfo(!showHospitalInfo)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-300"
            aria-expanded={showHospitalInfo}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">🏥</span>
              <span className="font-semibold text-gray-800">UCI Hospital Provides</span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showHospitalInfo ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showHospitalInfo && (
            <div className="border-t border-gray-100 p-4 animate-fade-in">
              <p className="text-sm text-gray-600 mb-3">
                No need to pack these - the hospital will provide:
              </p>
              <ul className="space-y-2">
                {hospitalProvides.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-teal-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        {/* Reset Button */}
        {checkedCount > 0 && (
          <div className="mb-8">
            {!showResetConfirm ? (
              <Button
                variant="secondary"
                onClick={() => setShowResetConfirm(true)}
                className="w-full"
              >
                Reset Checklist
              </Button>
            ) : (
              <Card className="animate-fade-in">
                <CardContent className="pt-5">
                  <p className="text-center text-gray-700 mb-4">
                    Are you sure you want to reset the checklist? This will uncheck all items.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => setShowResetConfirm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleReset}
                      className="flex-1 bg-red-500 hover:bg-red-600"
                    >
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
