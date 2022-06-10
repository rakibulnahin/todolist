import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true
        }
    }
})

async function checkPermission() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    console.log("existance ",existingStatus);
    const finalstatus = existingStatus
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalstatus = status
        console.log("permission ", status);
    }

    return finalstatus
    
}


const triggerNotifications = async (Title, Body, Data) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You’ve got mail!",
            body: "Here is the notification body",
            data: { data: "goes here" },
        },
            trigger: { seconds: 2 },
    });
}

export {checkPermission, triggerNotifications}