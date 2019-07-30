import * as actions from './actions'
import * as componentjsx from './components'
import containers from './containers'
import * as constants from './constants'
import reducer, { initialState } from './reducer'
import * as selectors from './selectors'
import * as sagas from './sagas'

const components = Object.assign(componentjsx, { })

export {
  actions,
  components,
  containers,
  constants,
  reducer,
  initialState,
  selectors,
  sagas
}
export default Object.assign(containers, { actions, components, constants, reducer, initialState, selectors, sagas })