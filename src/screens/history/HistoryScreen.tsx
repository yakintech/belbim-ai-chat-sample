import { View, FlatList, Text, RefreshControl, Touchable, TouchableOpacity, Linking } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import baseService from '../../api/baseService'
import { AuthContextType, userContext } from '../../context/UserContext'
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import Share, { ShareOptions } from 'react-native-share';
import Icon from '@react-native-vector-icons/evil-icons';



interface ChatHistory {
  chatId: string;
  lastMessage: string;
  updatedAt: string;
}

const HistoryScreen = () => {

  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([])
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(userContext) as AuthContextType

  const navigation = useNavigation<any>();

  const onRefresh = () => {
    setRefreshing(true);
    loadChatHistories();
  }

  const loadChatHistories = () => {
    baseService.get('/chat-histories/' + user?.id)
      .then(response => {
        setChatHistories(response);
      })
      .catch(error => {
        console.log('Error fetching chat histories: ', error);
      });
    setRefreshing(false);
  }

  useEffect(() => {
    loadChatHistories();
  }, [])

  return <>
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Chat History</Text>
    </View>

    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={chatHistories}
        keyExtractor={(item) => item.chatId}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}
              onPress={() => {
                navigation.navigate('ChatStack' as never, { screen: 'NewChatScreen' as never, params: { chatId: item.chatId } } as never);

              }}
            >
              <View style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <Text style={{ fontSize: 16 }}>{item.lastMessage.substring(0, 50)}...</Text>
                <Text style={{ fontSize: 12, color: '#666' }}>{dayjs(item.updatedAt).format('DD MMMM dddd HH:mm')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: 'absolute', right: 20, top: 25 }}
              onPress={() => {

                let shareOptions : ShareOptions = {
                  title: 'Share Chat',
                  message: `Check out this chat: ${item.lastMessage}`,
                  url: 'aichatassistant://chat/' + item.chatId
                };

                Share.open(shareOptions);
              }}
            >
              <Icon name="share-apple" size={30} color="#007AFF" />
            </TouchableOpacity>

            {/* <Button
              mode="contained"
              onPress={() => {
                Share.open({
                  title: 'Share Chat',
                  message: `Check out this chat: ${item.lastMessage}`,
                });
              }}
            >
              <Icon name="share-apple" size={30} color="#007AFF" />
            </TouchableOpacity>

            {/* <Button
              mode="contained"
              onPress={() => {
                Share.open({
                  title: 'Share Chat',
                  message: `Check out this chat: ${item.lastMessage}`,
                });
              }}
            >
              Share
            </Button> */}
          </>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>

  </>
}

export default HistoryScreen