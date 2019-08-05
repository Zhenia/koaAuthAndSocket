// @flow
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import { bindActionCreators } from 'redux'
import components from './components'
import { selectPageData, selectError, selectLoader } from './selectors'
import { compose, withHandlers, withState,mapProps, withProps,lifecycle} from 'recompose'

const withHandlersForLogin = withHandlers({
  handleChange: props => event => {
        const newPageData = {
           ...props.pageData,
           [event.target.name] :event.target.value
        };
       props.updatePageData(
           newPageData
       );
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

const withUserData = lifecycle({
    componentWillUpdate(p, s) {
     //console.log(this.state)
    }
});


const mapStateToProps = (state: any, ownProps:any) =>{

    ownProps.pageData = selectPageData(state);
    console.log(ownProps);
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
        mapDispatchToProps
    ),
    withState('pageData', 'updatePageData', props => {
        console.log(1);
    }),
    withHandlersForLogin,
    withUserData
)(components);