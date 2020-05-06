import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
const NOTIFICATION_KEY = 'UdacityFlashCards:notifications'

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
      title: 'Hey there!',
      body: "👋 Get back in here and learn something",
      ios: {
        sound: true
      },
      android: {
          sound: true,
          vibrate: true,
          priority: 'high',
          sticky: false,
      }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
        if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync()
  
                    let tomorrow = new Date()
                    console.log(tomorrow)
                    tomorrow.setDate(tomorrow.getDate() + 1)
  
                    Notifications.scheduleLocalNotificationAsync(
                        createNotification(),
                        {
                            time: tomorrow,
                            repeat: 'day',
                        }
                    )
  
                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
            })
        }
    })
}