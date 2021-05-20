import React, {Component, useEffect, useState} from 'react';
import { View,Text,StyleSheet,Alert,TouchableWithoutFeedback,Keyboard  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getWeather } from '../store/actions/WeatherActions';
import Form from "../components/Form";
import Weather from "../components/Weather";
import PushNotification, { Importance } from "react-native-push-notification";



const  App = () =>  {
  const [ search, setSearch ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();
  const { data,error } = useSelector(state => state.weather)

  PushNotification.createChannel(
      {
        channelId: "111",
        channelName: "My channel",
        channelDescription: "A channel to categorise your notifications",
        playSound: true,
        soundName: "default",
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
  );


  const searchSubmitHandler = () => {
    if (search === ''){
      return Alert.alert('Validation','City name is required!', [{text: 'OK'}]);
    }
    setLoading(true);
    dispatch(getWeather(search, () => setLoading(false), () => setLoading(false)));
    setSearch('');
    Keyboard.dismiss()
      PushNotification.localNotificationSchedule({
          channelId: "111",
          message: "Hello Ruben!",
          vibrate:true,
          channelName: "My channel",
          date: new Date(Date.now() + 5 * 1000),
          allowWhileIdle: false,
      });
  };
  return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Form search={search} onSetSearch={setSearch} onSubmit={searchSubmitHandler} />
          <Weather loading={loading} data={data} error={error} />
        </View>
      </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'lightblue'
  },
})

export default App;
