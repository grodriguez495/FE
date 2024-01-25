const baseURL = process.env.REACT_APP_API_URL;

export const urlLogin = `${baseURL}/api/Login`
export const urlGetAvailableRoles = `${baseURL}/api/Role/list`
export const urlNewUser = `${baseURL}/api/User`
export const urlGetAvailableUsers = `${baseURL}/api/User/list`
export const urlPutEditUSer = `${baseURL}/api/User/{id}`
export const urlDeleteUSer = `${baseURL}/api/User/`
export const urlGetUser = `${baseURL}/api/User/`
export const urlGetSensorValues = `${baseURL}/api/Sensor/list`
export const urlGetSensorValuesByDatesAndVariable = `${baseURL}/api/Sensor/By-dates-and-variable`
export const urlGetSensorIds = `${baseURL}/api/Sensor/sensorIds-list`
export const urlGetSensorValueBySensor = `${baseURL}/api/Sensor/By-sensor`
export const urlGetNotificationSend = `${baseURL}/api/Notification/By-emil-and-phone?`
export const urlGetActiveNotificationSend = `${baseURL}/api/Notification/Active-notification?`
export const urlDeleteNotification = `${baseURL}/api/Notification/`
export const urlGetSensorGeographicInformation = `${baseURL}/api/Sensor/Sensor-geographic-information`
export const urlGetSensorValuesByDatesAndVariableAndSensor = `${baseURL}/api/Sensor/By-dates-and-variable-and-sensor`
