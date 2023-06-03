import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../../Styles/color';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home() {
  const api = 'https://stunting.fihaa-app.com/stunting';
  const [data,setData] = useState([]);

  const getStunting = () => {
    fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
      }
    }).then(res => res.json())
    .then(res => setData(res.data))
  };

  useEffect(() => {
    getStunting();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>

      <View style={{flexDirection: 'row',justifyContent: 'space-around',}}>
      <Text style={{color: COLOR.BLACK}}>nama</Text>
      <Text style={{color: COLOR.BLACK}}>umur</Text>
      <Text style={{color: COLOR.BLACK}}>berat</Text>
      <Text style={{color: COLOR.BLACK}}>tinggi</Text>
      </View>
    {
      data.length > 0 ? (
        data.map((item,index) => (
            <View key={index} style={{flexDirection: 'row',justifyContent: 'space-around'}}>
            <Text style={{color: COLOR.BLACK}}>{item.username}</Text>
            <Text style={{color: COLOR.BLACK}}>{item.umur}</Text>
            <Text style={{color: COLOR.BLACK}}>{item.berat_badan}</Text>
            <Text style={{color: COLOR.BLACK}}>{item.tinggi_badan}</Text> 
            </View>
          ))
          ) : (
            <Text style={{color: COLOR.BLACK}}>data kosong</Text>
            )}
            </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
