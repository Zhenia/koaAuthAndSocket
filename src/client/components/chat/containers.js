// @flow
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import { bindActionCreators } from 'redux'
import components from './components'
import { selectPageData, selectError, selectLoader } from './selectors'
import { compose, lifecycle, withHandlers} from 'recompose'

const withMessageData = lifecycle({
  componentDidMount() {
    this.props.actions.loadUpListMessages();

    socket.on('messageSaveSuccess',(data)=>{
        if (data == true){        
          this.props.actions.loadUpListMessages()
          this.props.actions.updateNewMessage('')
        }
          
    });  
  }
})

const withHandlersForMessage = withHandlers({
  sendMessage: props => event => {
    const textMessage = props.pageData.newMessage;
    if (textMessage){
        socket.emit("addMessage", textMessage);
    }
  },
  handleChange: props => event => {
    props.actions.updateNewMessage(event.target.value)
  }   
})

const enhance = compose(
  withMessageData,
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
