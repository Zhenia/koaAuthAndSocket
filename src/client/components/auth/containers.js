// @flow
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import { bindActionCreators } from 'redux'
import components from './components'
import { selectPageData, selectError, selectLoader } from './selectors'
import { compose, withHandlers, lifecycle} from 'recompose'
import withContext from '../../utils/context/HOC/withContext';

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
  ),
  lifecycle({
    componentDidUpdate() {
      const isUserInContext = this.props.userContext && this.props.userContext.user && this.props.userContext.user.name && (!this.props.pageData || !this.props.pageData.name)
      if (isUserInContext){
        this.props.actions.updatePageData({
            name: this.props.userContext.user.name,
            email: this.props.userContext.user.email
        });
      }
    }
  }),
  withHandlers({
    logout: props => event => {
      props.userContext.toggleUser({});
      props.actions.logoutFormUser();
    }  
  }),
  

)(withContext(components));


