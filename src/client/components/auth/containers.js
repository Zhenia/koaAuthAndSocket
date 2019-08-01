// @flow
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import { bindActionCreators } from 'redux'
import components from './components'
import { selectPageData, selectError, selectLoader } from './selectors'
const mapStateToProps = (state: any) =>{
    return  ({
        pageData: selectPageData(state),
        errorData: selectError(state),
        isLoad: selectLoader(state)
      });
}

const mapDispatchToProps = (dispatch: any) => ({
  // можно добавить экщены из других компонентов
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(components);
