// @flow
import { connect} from 'react-redux'
import * as actionCreators from './actions'
import { bindActionCreators } from 'redux'
import components from './components'
import { selectPageData, selectError, selectLoader } from './selectors'
import { compose, withHandlers, lifecycle} from 'recompose'
import withContext from '../../utils/context/HOC/withContext'

const mapStateToProps = (state: any) =>{
  return  ({
      pageData: selectPageData(state),
      errorData: selectError(state),
      isLoad: selectLoader(state)
  });
}

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default compose(
  connect(
   mapStateToProps,
   mapDispatchToProps,
  )
)(withContext(components));


