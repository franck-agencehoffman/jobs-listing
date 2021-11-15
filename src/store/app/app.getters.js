import { isNil } from 'lodash'

export default {
  newContentAvailable: state => !isNil(state.SWRegistrationForNewContent),
  getJobs: state => filters => {
    if (filters.length === 0)
      return state.jobs

    return state.jobs.filter(item => {
      return filters.includes(item.role)
          || filters.includes(item.level)
          || filters.some(element => item.languages.includes(element))
          || filters.some(element => item.tools.includes(element))
    })
  }
}
