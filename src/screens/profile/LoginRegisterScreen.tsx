import { View, Text, Touchable, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import baseService from '../../api/baseService';


const LoginRegisterScreen = () => {

  const [email, setEmail] = useState('cagatay@mail.com');

  const navigation = useNavigation<any>();

  const goToConfirmCodeScreen = () => {

    baseService.post("/login-register", { email })
      .then((response) => {
        navigation.navigate('ConfirmCodeScreen', { email });
      })
      .catch((error) => {
        console.error("Error during /login-register:", error);
      });


  }


  return <>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>


      {/* LogoArea */}
      <Image
        source={require('../../assets/logo.png')}
        style={{ width: 150, height: 150, marginBottom: 30 }}
        resizeMode="contain"
    />

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Welcome to AI Chat Assistant</Text>
      <View style={{ width: '100%' }}>


      <TextInput
        label="Email"
        mode="outlined"
        style={{ width: '100%', marginBottom: 20 }}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#6200ee',
            paddingVertical: 12,
            borderRadius: 4,
            alignItems: 'center',
          }}
          onPress={goToConfirmCodeScreen}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>

  </>
}

export default LoginRegisterScreen