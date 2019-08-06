// @flow
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import { bindActionCreators } from 'redux'
import components from './components'
import { selectPageData, selectError, selectLoader } from './selectors'
import { compose, lifecycle, withHandlers} from 'recompose'

const mapStateToProps = (state: any) =>{
    return  ({
        pageData: selectPageData(state),
        errorData: selectError(state),
        isLoad: selectLoader(state)
    });
}

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      const { socket, provider, popup } = this.props;
    },
    componentWillUpdate() {   
      var  proccesing = ()=>{
        if (this.props.pageData && this.props.pageData.popup && this.props.pageData.popup.document && this.props.pageData.popup.document.body){
          const rex = /(<([^>]+)>)/ig;
          const answer = this.props.pageData.popup.document.body.innerHTML;
          const response = JSON.parse(answer.replace(rex , ""));
          if (response && response.token){
            window.localStorage.setItem('token', response.token);
            this.props.pageData.popup.close();
            this.props.actions.updateDataPage({ name : response.user, popup:''});
          }
        }
      }
      setTimeout(proccesing, 1000);
    }
  }),
  withHandlers({
    openPopup: props => event => {
      const { provider} = props;
      const width = 600,
        height = 600;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;
      const url = `/auth/${provider}`;
  
      return window.open(
        url,
        "",
        `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`
      );
    }
  }), 
  withHandlers({
    startAuth: props => e => {
      if ( !props.pageData || !props.pageData.disabled) {
        props.actions.updateDataPage({ popup: props.openPopup() });
      }
    }
  })
)(components);
