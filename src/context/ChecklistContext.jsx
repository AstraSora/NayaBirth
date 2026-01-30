import { createContext, useContext, useReducer, useCallback, useEffect } from 'react'
import checklistData from '../data/hospitalChecklist.json'
import { loadChecklistState, saveChecklistState, clearChecklistState } from '../lib/storage'

const ChecklistContext = createContext(null)

// Get all item IDs from the checklist data
const getAllItemIds = () => {
  return checklistData.categories.flatMap(category =>
    category.items.map(item => item.id)
  )
}

const initialState = {
  checkedItems: [],
  customItems: {},
  expandedCategories: checklistData.categories.map(c => c.id)
}

function checklistReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      const isChecked = state.checkedItems.includes(action.itemId)
      return {
        ...state,
        checkedItems: isChecked
          ? state.checkedItems.filter(id => id !== action.itemId)
          : [...state.checkedItems, action.itemId]
      }
    }
    case 'ADD_CUSTOM_ITEM': {
      const categoryItems = state.customItems[action.categoryId] || []
      const newItem = {
        id: `custom-${action.categoryId}-${Date.now()}`,
        label: action.label
      }
      return {
        ...state,
        customItems: {
          ...state.customItems,
          [action.categoryId]: [...categoryItems, newItem]
        }
      }
    }
    case 'REMOVE_CUSTOM_ITEM': {
      const categoryId = Object.keys(state.customItems).find(catId =>
        state.customItems[catId]?.some(item => item.id === action.itemId)
      )
      if (!categoryId) return state
      return {
        ...state,
        customItems: {
          ...state.customItems,
          [categoryId]: state.customItems[categoryId].filter(item => item.id !== action.itemId)
        },
        checkedItems: state.checkedItems.filter(id => id !== action.itemId)
      }
    }
    case 'TOGGLE_CATEGORY': {
      const isExpanded = state.expandedCategories.includes(action.categoryId)
      return {
        ...state,
        expandedCategories: isExpanded
          ? state.expandedCategories.filter(id => id !== action.categoryId)
          : [...state.expandedCategories, action.categoryId]
      }
    }
    case 'LOAD_STATE':
      return {
        ...state,
        checkedItems: action.data.checkedItems || [],
        customItems: action.data.customItems || {},
        expandedCategories: action.data.expandedCategories || checklistData.categories.map(c => c.id)
      }
    case 'RESET':
      return {
        ...initialState,
        expandedCategories: checklistData.categories.map(c => c.id)
      }
    default:
      return state
  }
}

export function ChecklistProvider({ children }) {
  const [state, dispatch] = useReducer(checklistReducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadChecklistState()
    if (saved) {
      dispatch({ type: 'LOAD_STATE', data: saved })
    }
  }, [])

  // Save to localStorage on changes
  useEffect(() => {
    saveChecklistState({
      checkedItems: state.checkedItems,
      customItems: state.customItems,
      expandedCategories: state.expandedCategories
    })
  }, [state.checkedItems, state.customItems, state.expandedCategories])

  const toggleItem = useCallback((itemId) => {
    dispatch({ type: 'TOGGLE_ITEM', itemId })
  }, [])

  const addCustomItem = useCallback((categoryId, label) => {
    dispatch({ type: 'ADD_CUSTOM_ITEM', categoryId, label })
  }, [])

  const removeCustomItem = useCallback((itemId) => {
    dispatch({ type: 'REMOVE_CUSTOM_ITEM', itemId })
  }, [])

  const toggleCategory = useCallback((categoryId) => {
    dispatch({ type: 'TOGGLE_CATEGORY', categoryId })
  }, [])

  const reset = useCallback(() => {
    clearChecklistState()
    dispatch({ type: 'RESET' })
  }, [])

  // Calculate progress
  const getTotalItems = useCallback(() => {
    const baseItems = getAllItemIds().length
    const customItemsCount = Object.values(state.customItems)
      .reduce((acc, items) => acc + items.length, 0)
    return baseItems + customItemsCount
  }, [state.customItems])

  const getCheckedCount = useCallback(() => {
    return state.checkedItems.length
  }, [state.checkedItems])

  const isItemChecked = useCallback((itemId) => {
    return state.checkedItems.includes(itemId)
  }, [state.checkedItems])

  const isCategoryExpanded = useCallback((categoryId) => {
    return state.expandedCategories.includes(categoryId)
  }, [state.expandedCategories])

  const getCustomItems = useCallback((categoryId) => {
    return state.customItems[categoryId] || []
  }, [state.customItems])

  const value = {
    ...state,
    categories: checklistData.categories,
    hospitalProvides: checklistData.hospitalProvides,
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
  }

  return (
    <ChecklistContext.Provider value={value}>
      {children}
    </ChecklistContext.Provider>
  )
}

export function useChecklist() {
  const context = useContext(ChecklistContext)
  if (!context) {
    throw new Error('useChecklist must be used within a ChecklistProvider')
  }
  return context
}
