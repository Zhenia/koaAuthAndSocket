// @flow
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import { bindActionCreators } from 'redux'
import components from './components'
import { selectPageData, selectError, selectLoader } from './selectors'
import { compose, withHandlers, withState,withPropsOnChange, withProps,lifecycle} from 'recompose'

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
  withHandlers({
    handleChange: props => event => {
          props.actions.updatePageData(event.target.name,event.target.value);
    },
    validateForm: props => event => {
      return props.pageData.email.length > 0 && props.pageData.password.length > 0;
    },
    sendForm:  props => event => {
        if (true){
            const values = {
                email: props.pageData.email,
                password:  props.pageData.password
            };
            props.actions.loginFormUser(values);
        }
        return false;
    },
    logout: props => event => {
      props.actions.logoutFormUser();
    }  
  })
)(components);


