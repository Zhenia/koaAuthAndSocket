// @flow
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import { bindActionCreators } from 'redux'
import components from './components'
import { compose, lifecycle} from 'recompose'
import { selectPageData, selectError, selectLoader } from './selectors'

const withUserData = lifecycle({
  state: { loading: true, users:[] },
  componentDidMount() {
    this.props.actions.loadUpListUsers();
  }
});

const enhance = compose(
  withUserData
);

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


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhance(components));
