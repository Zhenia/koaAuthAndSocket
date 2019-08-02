// @flow
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import { bindActionCreators } from 'redux'
import components from './components'
import { selectPageData, selectError, selectLoader } from './selectors'
import { compose, lifecycle, withHandlers,withStateHandlers} from 'recompose'

const withMessageData = lifecycle({
  state: { 
    messages:[],
    newMessage:''
  },
  componentDidMount() {
    this.props.actions.loadUpListMessages();
    socket.on('messagesList',(data)=>{
        this.setState({messages:data})
    });  
  }
})

const withHandlersForMessage = withHandlers({
  sendMessage: props => event => {
    const textMessage = props.newMessage;
    alert(textMessage);
    if (textMessage){
        socket.emit("addMessage", textMessage);
    }
  },
  handleChange: props => event => {
     props.handleChangeMessage(event.target.value)
  }   
})
const withStateHandlersForMessage = withStateHandlers(
  { 
    newMessage: '' 
  },
  {
    handleChangeMessage: (state) => (value) => ({ newMessage: value })  
  }
)

const enhance = compose(
  withMessageData,
  withStateHandlersForMessage,
  withHandlersForMessage
  
)

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhance(components));
