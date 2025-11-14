import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { TextInput } from 'react-native-paper';
import { AuthContextType, userContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import baseService from '../../api/baseService';


const ConfirmCodeScreen = ({ route }: any) => {

  const { email } = route.params;
  const [confirmationCodeInputs, setConfirmationCodeInputs] = useState(Array(6).fill(''));
  const { login } = useContext(userContext) as AuthContextType


  const navigation = useNavigation<any>();



  const confirmCode = () => {
    const confirmationCode = confirmationCodeInputs.join('');
    baseService.post("/confirm-code", { email, confirmationCode })
      .then((response) => {
        login(email, response.token, response.id);
        navigation.navigate('HistoryStack');
      })
      .catch((error) => {
        console.error("Error during /confirm-code:", error);
      });
  }

  return <>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Confirm Code</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            style={{ width: '15%', marginRight: 5 }}
            keyboardType="numeric"
            maxLength={1}
            value={confirmationCodeInputs[index]}
            onChangeText={(text) => {
              const newInputs = [...confirmationCodeInputs];
              newInputs[index] = text;
              setConfirmationCodeInputs(newInputs);
            }}
            onSubmitEditing={() => {
              if (index < 5) {
                // Focus the next input
              }
            }}
          />
        ))}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#6200ee',
          paddingVertical: 12,
          borderRadius: 4,
          alignItems: 'center',
          marginTop: 20,
          width: '100%',
        }}
        onPress={confirmCode}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>Submit</Text>
      </TouchableOpacity>
    </View>
  </>
}

export default ConfirmCodeScreen