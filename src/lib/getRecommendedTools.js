/**
 * Returns recommended tools based on the user's pregnancy stage.
 * @param {Object} params - The parameters object
 * @param {number|null} params.trimester - 1, 2, or 3 (or null if unknown)
 * @param {string|null} params.stage - 'pregnant', 'postpartum', or 'planning' (or null)
 * @returns {Array} Array of recommended tool objects
 */
export function getRecommendedTools({ trimester = null, stage = null }) {
  const allTools = {
    timeline: {
      id: 'timeline',
      name: 'Pregnancy Timeline',
      description: 'Track milestones, tests, and baby development week by week',
      icon: '📅',
      route: '/pregnancy-timeline',
    },
    birthPlan: {
      id: 'birthPlan',
      name: 'Birth Plan Builder',
      description: 'Create your personalized birth plan to share with your care team',
      icon: '📝',
      route: '/birth-plan',
    },
    assessment: {
      id: 'assessment',
      name: 'Postpartum Self-Assessment',
      description: 'Quick screening to check in on your emotional wellbeing',
      icon: '💭',
      route: '/assessment',
    },
    kickCounter: {
      id: 'kickCounter',
      name: 'Kick Counter',
      description: 'Track your baby\'s movements',
      icon: '👶',
      route: '/kick-counter',
    },
    contractionTimer: {
      id: 'contractionTimer',
      name: 'Contraction Timer',
      description: 'Time and track your contractions',
      icon: '⏱️',
      route: '/contraction-timer',
    },
    hospitalChecklist: {
      id: 'hospitalChecklist',
      name: 'Hospital Bag Checklist',
      description: 'Everything you need to pack for delivery',
      icon: '🎒',
      route: '/hospital-checklist',
    },
    resources: {
      id: 'resources',
      name: 'Resources',
      description: 'Evidence-based information from UCI Health',
      icon: '📚',
      route: '/resources',
    },
  }

  // Handle postpartum stage
  if (stage === 'postpartum') {
    return [
      {
        ...allTools.assessment,
        relevanceText: 'Check in on your emotional wellbeing after delivery',
        isPrimary: true,
      },
      {
        ...allTools.resources,
        relevanceText: 'Access postpartum recovery and feeding guides',
        isPrimary: false,
      },
    ]
  }

  // Handle planning stage (pre-conception)
  if (stage === 'planning') {
    return [
      {
        ...allTools.resources,
        relevanceText: 'Learn about preparing for pregnancy',
        isPrimary: true,
      },
      {
        ...allTools.timeline,
        relevanceText: 'Preview what to expect during pregnancy',
        isPrimary: false,
      },
    ]
  }

  // Handle pregnant stage by trimester
  if (trimester === 1) {
    return [
      {
        ...allTools.timeline,
        relevanceText: 'Track your early pregnancy milestones and upcoming appointments',
        isPrimary: true,
      },
      {
        ...allTools.resources,
        relevanceText: 'Learn about first trimester symptoms and care',
        isPrimary: false,
      },
    ]
  }

  if (trimester === 2) {
    return [
      {
        ...allTools.birthPlan,
        relevanceText: 'Start planning your birth preferences early',
        isPrimary: true,
      },
      {
        ...allTools.timeline,
        relevanceText: 'Track your baby\'s growth and development',
        isPrimary: false,
      },
      {
        ...allTools.kickCounter,
        relevanceText: 'Begin tracking fetal movements',
        isPrimary: false,
      },
    ]
  }

  if (trimester === 3) {
    return [
      {
        ...allTools.birthPlan,
        relevanceText: 'Finalize your birth plan before delivery',
        isPrimary: true,
      },
      {
        ...allTools.hospitalChecklist,
        relevanceText: 'Pack your hospital bag',
        isPrimary: false,
      },
      {
        ...allTools.contractionTimer,
        relevanceText: 'Be ready to time contractions when labor begins',
        isPrimary: false,
      },
    ]
  }

  // Default fallback - show general tools
  return [
    {
      ...allTools.timeline,
      relevanceText: 'Track your pregnancy journey',
      isPrimary: true,
    },
    {
      ...allTools.birthPlan,
      relevanceText: 'Create your personalized birth plan',
      isPrimary: false,
    },
    {
      ...allTools.resources,
      relevanceText: 'Access trusted pregnancy resources',
      isPrimary: false,
    },
  ]
}
