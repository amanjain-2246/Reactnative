import { Navigation } from "react-native-navigation";
import AuthScreen from './src/screens/Auth/Auth';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import SideMenu from './src/screens/SideMenu/SideMenu';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

//Register Screens
const store = configureStore();
Navigation.registerComponentWithRedux("myapp-place.AuthScreen", () => AuthScreen, Provider, store);
Navigation.registerComponentWithRedux("myapp-place.FindPlaceScreen", () => FindPlaceScreen, Provider, store);
Navigation.registerComponentWithRedux("myapp-place.SharePlaceScreen", () => SharePlaceScreen, Provider, store);
Navigation.registerComponentWithRedux("myapp-place.PlaceDetailScreen", () => PlaceDetailScreen, Provider, store);
Navigation.registerComponentWithRedux("myapp-place.SideMenu", () => SideMenu,Provider,store);
//Start a App

export default () => Navigation.setRoot({
  root: {
    stack: {
      children: [{
        component: {
          name: 'myapp-place.AuthScreen'

        }
      }],
      options: {
        topBar: {
          title: {
            text: 'Login Here',
            color: 'red',
            fontFamily: 'Helvetica',
            fontSize: 18
          }
        }
      }
    }
  }
});