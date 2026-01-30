import { createContext, useContext, useReducer, useCallback, useEffect } from 'react'
import { loadBirthPlanDraft, saveBirthPlanDraft, clearBirthPlanDraft } from '../lib/storage'

const BirthPlanContext = createContext(null)

const initialState = {
  currentSection: 0,
  pin: null,
  isLoading: false,
  isSaved: false,
  lastSaved: null,
  responses: {
    aboutYou: {},
    laborPreferences: {},
    painManagement: {},
    deliveryPreferences: {},
    cesareanPreferences: {},
    newbornCare: {},
    postpartum: {}
  }
}

function birthPlanReducer(state, action) {
  switch (action.type) {
    case 'SET_RESPONSE':
      return {
        ...state,
        isSaved: false,
        responses: {
          ...state.responses,
          [action.section]: {
            ...state.responses[action.section],
            [action.field]: action.value
          }
        }
      }
    case 'SET_SECTION_RESPONSES':
      return {
        ...state,
        isSaved: false,
        responses: {
          ...state.responses,
          [action.section]: {
            ...state.responses[action.section],
            ...action.data
          }
        }
      }
    case 'SET_CURRENT_SECTION':
      return {
        ...state,
        currentSection: action.section
      }
    case 'NEXT_SECTION':
      return {
        ...state,
        currentSection: Math.min(state.currentSection + 1, 6)
      }
    case 'PREV_SECTION':
      return {
        ...state,
        currentSection: Math.max(state.currentSection - 1, 0)
      }
    case 'SET_PIN':
      return {
        ...state,
        pin: action.pin
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      }
    case 'SET_SAVED':
      return {
        ...state,
        isSaved: true,
        lastSaved: new Date().toISOString()
      }
    case 'LOAD_PLAN':
      return {
        ...state,
        pin: action.data.pin,
        responses: action.data.responses,
        isLoading: false,
        isSaved: true
      }
    case 'RESET':
      return {
        ...initialState
      }
    default:
      return state
  }
}

export function BirthPlanProvider({ children }) {
  const [state, dispatch] = useReducer(birthPlanReducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadBirthPlanDraft()
    if (saved?.responses) {
      dispatch({ type: 'LOAD_PLAN', data: saved })
    }
  }, [])

  // Auto-save to localStorage on changes
  useEffect(() => {
    saveBirthPlanDraft({
      pin: state.pin,
      responses: state.responses
    })
  }, [state.responses, state.pin])

  const setResponse = useCallback((section, field, value) => {
    dispatch({ type: 'SET_RESPONSE', section, field, value })
  }, [])

  const setSectionResponses = useCallback((section, data) => {
    dispatch({ type: 'SET_SECTION_RESPONSES', section, data })
  }, [])

  const setCurrentSection = useCallback((section) => {
    dispatch({ type: 'SET_CURRENT_SECTION', section })
  }, [])

  const nextSection = useCallback(() => {
    dispatch({ type: 'NEXT_SECTION' })
  }, [])

  const prevSection = useCallback(() => {
    dispatch({ type: 'PREV_SECTION' })
  }, [])

  const setPIN = useCallback((pin) => {
    dispatch({ type: 'SET_PIN', pin })
  }, [])

  const setLoading = useCallback((isLoading) => {
    dispatch({ type: 'SET_LOADING', isLoading })
  }, [])

  const setSaved = useCallback(() => {
    dispatch({ type: 'SET_SAVED' })
  }, [])

  const loadPlan = useCallback((data) => {
    dispatch({ type: 'LOAD_PLAN', data })
  }, [])

  const reset = useCallback(() => {
    clearBirthPlanDraft()
    dispatch({ type: 'RESET' })
  }, [])

  const value = {
    ...state,
    setResponse,
    setSectionResponses,
    setCurrentSection,
    nextSection,
    prevSection,
    setPIN,
    setLoading,
    setSaved,
    loadPlan,
    reset
  }

  return (
    <BirthPlanContext.Provider value={value}>
      {children}
    </BirthPlanContext.Provider>
  )
}

export function useBirthPlan() {
  const context = useContext(BirthPlanContext)
  if (!context) {
    throw new Error('useBirthPlan must be used within a BirthPlanProvider')
  }
  return context
}
