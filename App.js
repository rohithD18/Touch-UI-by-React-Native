import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import IntroScreen from './src/screens/IntroScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { Provider } from 'react-redux';
import Store from './src/redux/Store';
import PostDetailScreen from './src/screens/PostDetailScreen';

const navigator = createStackNavigator(
  {
  Intro : IntroScreen,
  Login : LoginScreen,
  Home : HomeScreen,
  PostDetails : PostDetailScreen,
  },
  {
    initialRouteName : 'Intro',
    defaultNavigationOptions: {
      title: 'Touch App'
    }
  }
);

const App = createAppContainer(navigator);

export default () =>{
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  )
}


