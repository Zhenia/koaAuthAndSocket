import { connect } from 'react-redux';
import * as actionCreators from './actions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import withContext from './../../utils/context/HOC/withContext';

import { selectPageData, selectError, selectLoader } from './selectors';

const mapStateToProps = (state) => ({
  pageData: selectPageData(state),
  errorData: selectError(state),
  isLoad: selectLoader(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withContext()));
