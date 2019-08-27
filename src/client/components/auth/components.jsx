import React, { useEffect  } from "react"
import OAuth from "../googleAuth"
import LoginForm from "../loginForm"
import {Button} from "./../../styles/customStyleComponents"
import * as actions from './actions'
import * as selector from './selectors'
import { useDispatch, useSelector } from 'react-redux'

const logout = (props, logoutAction)=>() => { 
  if (props.userContext.user.name){
    new Promise(function(resolve, reject) {
      props.userContext.toggleUser({});
      logoutAction(); 
      return resolve();
    })
  }
} 

export default (props: any): React.ReactElement => {
  const { errorData } = props
  const dispatch = useDispatch()

  const updateData =(data) => dispatch(actions.updatePageData(data))
  const logoutAction = ()  => dispatch(actions.logoutFormUser())

  useEffect(() => {
      const isUserInContext = props.userContext && props.userContext.user && props.userContext.user.name && (!pageData || !pageData.name)
      if (isUserInContext){
        updateData({
          name: props.userContext.user.name,
          email: props.userContext.user.email
        });
      }
    debugger
      console.log('useEffect content', props.userContext);
      console.log('useEffect page-data',pageData);
  })

  const pageData = useSelector( state =>(selector.selectPageData(state)));

  let content
 
  if (pageData && pageData.name) {
    const { name } = pageData
    content = (
      <div>
        <h1>{`Hello ${name}`}</h1>
        <Button size="0.5em" onClick={logout(props, logoutAction)}>
          Logout
        </Button>
      </div>
    )
  } else {
    content = (
      <div>
          <LoginForm userContext={props.userContext} /> 
          <OAuth provider="google" key="google" userContext={props.userContext} socket={socket}/>
      </div>
    )
            
  }
  return (content);
}
  