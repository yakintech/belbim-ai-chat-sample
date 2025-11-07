import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';


const ConfirmCodeScreen = ({ params }: any) => {
  // const { email } = params;


  //burası konfirmation code ekranı olacak. Kullanıcıdan email ile gönderilen onay kodunu girmesi istenecek. Toplamda yan yana" 6 adet TextInput olacak. otomatik olarak bir sonraki inputa geçecek şekilde olacak. Altta bir buton olacak. Butona basıldığında kod doğrulanacak.

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
        onPress={() => {
          // Validate code
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>Submit</Text>
      </TouchableOpacity>
    </View>
  </>
}

export default ConfirmCodeScreen