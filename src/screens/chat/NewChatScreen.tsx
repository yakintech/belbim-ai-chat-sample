import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, FlatList, ActivityIndicator

} from 'react-native'
import React, { useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import dayjs from 'dayjs';



interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  date: Date;
}

const NewChatScreen = () => {

  const [message, setmessage] = useState("")
  const [messages, setmessages] = useState<Message[]>([])
  const [loading, setloading] = useState(true);

  //FlatList - chat list
  //Input - new chat
  //Button - create message
  //Bu ekran direkt bir mesajlaşma ekranıdır. Kullanıcı bu ekranda AI ile direkt mesajlaşabilir. Ekrandaki elementler şunlardır:
  //1. FlatList: Kullanıcının önceki mesajlaşmalarını gösterir.
  //2. Input: Kullanıcının yeni mesaj yazabileceği bir metin girişi alanı.
  //3. Button: Kullanıcının yazdığı mesajı gönderebileceği bir buton.


  const sendChatMessage = () => {

    let messageToSend = message.trim();

    if (messageToSend.length === 0) {
      return; // Boş mesaj gönderilmesini engelle
    }

    let userMessage: Message = {
      id: Date.now().toString(),
      text: messageToSend,
      sender: 'user',
      date: new Date(),
    };

    setmessages(prevMessages => [...prevMessages, userMessage]);
    setmessage("");

    axiosInstance.post("/generate-text", {
      prompt: messageToSend,
    }).then(response => {

      // Gelen cevabı messages array'ine ekle

      const newMessage: Message = {
        id: Date.now().toString(),
        text: response.data.generatedText,
        sender: 'ai',
        date: new Date(),
      };
      setmessages(prevMessages => [...prevMessages, newMessage]);
      setloading(false);


    }).catch(error => {
      console.error("Error sending message:", error);
      setloading(false);
    });

  }
  return <>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={90}

    >
      <View style={styles.container}>
        <View style={styles.flatList}>

          <FlatList
           style={{ padding: 10 }}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{
                alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: item.sender === 'user' ? '#DCF8C6' : '#E2E2E2',
                borderRadius: 10,
                padding: 10,
                marginVertical: 5,
                maxWidth: '80%',
              }}>
                <Text>{item.text}</Text>
                <Text style={{ fontSize: 10, color: 'gray', alignSelf: 'flex-end', marginTop: 5 }}>
                  {dayjs(item.date).format('HH:mm')}
                </Text>
              </View>
            )}
          />


        </View>
        <View style={styles.inputContainer}>

          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={message}
            onChangeText={setmessage}
          />
          {/* {
            loading && <ActivityIndicator size="small" color="#007bff" style={{ marginLeft: 10 }} />
          } */}

          <TouchableOpacity
            style={styles.button}
            onPress={sendChatMessage}
          >
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>

        </View>
      </View>
    </KeyboardAvoidingView>

  </>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  }, buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default NewChatScreen