import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DeckLists from './Screens/DeckLists'
import AddDeck from './Screens/AddDeck'
import Deck from './Screens/Deck'
import AddCard from './Screens/AddCard'
import Quiz from './Screens/Quiz'
import reducer from './reducers'
import { Constants } from 'expo'
import { createStackNavigator } from '@react-navigation/stack';
import { setLocalNotification } from './utils/helpers'

const Stack = createStackNavigator();
const store = createStore(reducer)
const Tab = createBottomTabNavigator()

UdaciStatusBar = ({ backgroundColor, ...props }) => {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}
const TabNavigator = () =>{
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'DeckList') {
                        iconName = 'md-home'
                    } else if (route.name === 'Add') {
                        iconName = 'md-add-circle'
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="DeckList" component={DeckLists} />
            <Tab.Screen name="Add" component={AddDeck} />
        </Tab.Navigator>
    )
}

export default class App extends Component {
    componentDidMount() {
        setLocalNotification()
    }
    render() {
        
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={TabNavigator} options={{headerShown:false}}/>
                        <Stack.Screen name="Deck" component={Deck} options={({ route }) => ({ title: route.params.deckId })}/>
                        <Stack.Screen name="Quiz" component={Quiz} options={({ route }) => ({ title: route.params.deckId+' - Quiz' })}/>
                        <Stack.Screen name="AddCard" component={AddCard} options={({ route }) => ({ title: route.params.deckId+' - Add Card' })}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        )
    }
}