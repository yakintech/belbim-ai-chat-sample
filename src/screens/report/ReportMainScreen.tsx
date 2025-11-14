import { View, Text, Touchable, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContextType, userContext } from '../../context/UserContext';
import baseService from '../../api/baseService';
import { useNavigation } from '@react-navigation/native';


interface ChatTokenModel {
  chatId: string;
  totalTokens: number;
  chatTitle: string;
}

const ReportMainScreen = () => {

  const [tokenReports, settokenReports] = useState<ChatTokenModel[]>([])
  const [refreshing, setRefreshing] = useState(false);


  const { user } = useContext(userContext) as AuthContextType

  const navigation = useNavigation<any>()


  const onRefresh = () => { 
    setRefreshing(true);
    loadTokenReports();
  }

  useEffect(() => {
    loadTokenReports();
  }, [])

  const loadTokenReports = () => {

    baseService.get(`/all-chats-tokens/${user?.id}`)
      .then(response => {
        settokenReports(response as ChatTokenModel[])

      })
      .catch(error => {
        console.error("Error fetching token reports:", error);
      });
    setRefreshing(false);
  }


  return <View style={{
    flex: 1,
    padding: 20

  }}>
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

    <FlatList
      data={tokenReports}
      keyExtractor={(item) => item.chatId}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ReportDetail', { chatId: item.chatId })}
        >
          <View style={{ marginBottom: 10 }}>
            <Text>Chat Title: {item.chatTitle}</Text>
            <Text>Total Tokens: {item.totalTokens}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>

}

export default ReportMainScreen