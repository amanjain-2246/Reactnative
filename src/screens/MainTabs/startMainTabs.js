import { Navigation } from "react-native-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-share-alt" : "ios-share-alt", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)

    ]).then(source => {
        Navigation.setRoot({
            root: {
                bottomTabs: {
                    sideMenu: {
                        left: {
                            component: {
                                name: 'myapp-place.SideMenu'

                            }
                        }
                    },

                    children: [{

                        stack: {
                            children: [{
                                component: {
                                    name: 'myapp-place.FindPlaceScreen',
                                    passProps: {
                                        text: 'This is tab 1'
                                    }
                                }
                            }],
                            options: {
                                topBar: {
                                    leftButtons: [
                                        {
                                            icon: source[2],
                                            title: "Menu"


                                        }
                                    ],
                                    title: {
                                        text: 'Find Places',
                                        color: 'red',
                                        fontFamily: 'Helvetica',
                                        fontSize: 18
                                    }
                                },
                                bottomTab: {
                                    text: 'Find Place',
                                    icon: source[0],
                                    testID: 'FIRST_TAB_BAR_BUTTON'
                                }
                            }
                        }

                    },
                    {

                        component: {
                            name: 'myapp-place.SharePlaceScreen',
                            passProps: {
                                text: 'This is tab 2'
                            },
                            options: {
                                topBar: {
                                    leftButtons: [
                                        {
                                            icon: source[2],
                                            title: "Menu"


                                        }
                                    ],
                                    visible: true,
                                    title: {
                                        text: 'Share Places',
                                        color: 'red',
                                        fontFamily: 'Helvetica',
                                        fontSize: 18
                                    }
                                },
                                bottomTab: {
                                    text: 'Share Place',
                                    icon: source[1],
                                    testID: 'SECOND_TAB_BAR_BUTTON'
                                }
                            }
                        }
                    }]
                }
            }
        });

    });


};

export default startTabs;