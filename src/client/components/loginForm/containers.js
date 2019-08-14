// @flow
import { connect } from 'react-redux'
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
  ),
  lifecycle({
    componentDidUpdate() {
      const isUserInPageData = this.props.userContext && (!this.props.userContext.user || !this.props.userContext.user.name) && this.props.pageData && this.props.pageData.name
      if (isUserInPageData){
        this.props.userContext.toggleUser({
          name: this.props.pageData.name,
          email: this.props.pageData.email
        });
      }
    }
  }),

  withHandlers({
    validateForm: props => (data) => {
      return data && data.email && data.password;
    },
  }),
  withHandlers({
    sendForm: (props) => (data) => {
        if (props.validateForm(data)){
            props.actions.loginFormUser(data);
        }
        return false;
    }  
  }),

)(withContext(components));


