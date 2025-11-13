import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContextType, userContext } from '../../context/UserContext';
import storageHelper from '../../utils/storageHelper';

const ProfileMainScreen = () => {

  const { logout, user } = useContext(userContext) as AuthContextType;

  // const [user, setuser] = useState<any>({})

  // useEffect(() => {

  //   storageHelper.getItem("user").then((res) => {
      
  //     //JSON parser
  //     let user = JSON.parse(res);

  //     setuser(user);
  //   })
  //   .catch((err) => {
  //     console.log("Error retrieving user:", err);
  //   });

  // }, [])




  return (
    // Profile Page
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{ fontSize: 20, fontWeight: 'bold' }}
      >Welcome, {user?.email}!</Text>

      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: '#6200ee',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 4,
        }}
        onPress={() => {
          logout();
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileMainScreen