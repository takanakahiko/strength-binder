import { useContext } from 'react'
import firebase from '../utils/Firebase'
import { AuthContext } from '../contexts/Auth'

export default function Login(): JSX.Element {
  const { currentUser } = useContext(AuthContext)

  // useEffect(() => {
  //   currentUser && Router.push('/')
  // }, [currentUser]);

  const login = () => {
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }
  const logout = () => {
    firebase.auth().signOut()
  }

  return (
    <div className="container">
      <p>{currentUser ? currentUser.displayName : ''}</p>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}
