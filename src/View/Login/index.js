import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLOR} from '../../Styles/color';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

export default function Login({navigation}) {
  const api = 'https://stunting.fihaa-app.com/login';

  const [data,setData] = useState({
    email: '',
    password: '',
  })
    


  const ButtonLogin = () =>{
    if(cekNull(data.email) || cekNull(data.password))
      return alert('data tidak boleh kosong');
    
  

  fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify({
      username: data.email.toLowerCase(),
      password: data.password.toLowerCase(),
    }),
  })
  .then(res => res.json())
  .then(res => {
    if(res.message == 'Success'){
      return navigation.navigate('Home');
    }
    return alert('user atau password salah');
  });
};





  const [icon, setIcon] = useState({
    icon: 'eye',
    status: true,
  });
  const showPass = () => {
    if (icon.icon == 'eye') {
      setIcon({
        ...icon,
        icon: 'eye-off',
        status: false,
      });
    } else {
      setIcon({
        ...icon,
        icon: 'eye',
        status: true,
      });
    }
  };
  const cekNull = e => {
    if (e == '') {
      return true;
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            width: wp(100),
            backgroundColor: COLOR.WHITE,
            height: hp(110),
          }}>

          {/* Image Start */}
          <View style={[styles.ContainerImage]}>
            {/* <Image
              style={[styles.Image]}
              // source={require('../../Assets/logo_footer.png')}
            /> */}
          </View>
          {/* Image End */}

          {/* Login Text Start */}
          <View style={[styles.LoginContainer]}>
            <Text
              style={{fontSize: wp(7), fontWeight: 'bold', color: COLOR.BLACK}}>
              LOGIN
            </Text>
          </View>
          {/* Login Text End */}

          {/* TextInput Start */}
          <View
            style={{
              width: '100%',
              paddingVertical: wp(4),
              marginTop: 20,
              backgroundColor: '#c0c0c0',
            }}>
            <TextInput
              placeholder="email"
              underlineColor="transparent"
              theme={{colors: {primary: COLOR.BLUE}}}
              style={{
                height: wp(14),
                width: wp(95),
                borderBottomWidth: wp(0.2),
                borderRadius: wp(2),
                paddingHorizontal: wp(2),
                fontSize: wp(5),
                marginBottom: wp(4),
                borderColor: COLOR.BLUE,
                backgroundColor: '#fff',
                alignSelf: 'center',
              }}
              left={
                <TextInput.Icon name="account" color={COLOR.BLUE} />
              }
              onChangeText={e => setData({...data,email:e})}
              ></TextInput>

            <TextInput
              placeholder="Password"
              underlineColor="transparent"
              secureTextEntry={icon.status}
              theme={{colors: {primary: COLOR.BLUE}}}
              style={{
                height: wp(14),
                borderBottomWidth: wp(0.2),
                borderRadius: wp(2),
                paddingHorizontal: wp(2),
                fontSize: wp(5),
                marginBottom: wp(4),
                borderColor: COLOR.BLUE,
                backgroundColor: '#fff',
                width: wp(95),
                alignSelf: 'center',
              }}
              left={<TextInput.Icon name="lock" color={COLOR.GREY} />}
              right={
                <TextInput.Icon
                  name={icon.icon}
                  color={COLOR.GREY}
                  onPress={showPass}
                />
              }
              onChangeText={e => setData({...data,password:e})}
              ></TextInput>

            <TouchableOpacity
              style={{alignItems: 'flex-end', paddingRight: wp(4)}}>
              <Text style={{color: COLOR.BLUE}}>Lupa Kata Sandi ?</Text>
            </TouchableOpacity>
          </View>
          {/* TextInput End */}
          <TouchableOpacity
            style={[styles.ButtonMasuk]}
            onPress={ButtonLogin}>
            <Text style={{fontWeight: 'bold', color: COLOR.WHITE}}>MASUK</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Image: {
    justifyContent: 'center',
    width: wp(50),
    height: hp(25),
  },
  ContainerImage: {
    width: wp(50),
    height: hp(25),
    backgroundColor: COLOR.WHITE,
    alignSelf: 'center',
    top: wp(10),
  },
  LoginContainer: {
    width: wp(50),
    height: hp(5),
    // backgroundColor: COLOR.BLUE,
    marginLeft: wp(5),
    marginTop: wp(20),
  },
  ButtonMasuk: {
    backgroundColor: COLOR.BLUE,
    height: wp(10),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(80),
    alignSelf: 'center',
    top: wp(10),
  },
});
