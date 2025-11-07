import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform

} from 'react-native'
import React from 'react'

const NewChatScreen = () => {

  //FlatList - chat list
  //Input - new chat
  //Button - create message
  //Bu ekran direkt bir mesajlaşma ekranıdır. Kullanıcı bu ekranda AI ile direkt mesajlaşabilir. Ekrandaki elementler şunlardır:
  //1. FlatList: Kullanıcının önceki mesajlaşmalarını gösterir.
  //2. Input: Kullanıcının yeni mesaj yazabileceği bir metin girişi alanı.
  //3. Button: Kullanıcının yazdığı mesajı gönderebileceği bir buton.
  return <>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={90}

    >
      <View style={styles.container}>
        <View style={styles.flatList}>
          {/* FlatList component to show previous chats */}
        </View>
        <View style={styles.inputContainer}>

          <TextInput
            style={styles.input}
            placeholder="Type your message..."
          />

          <TouchableOpacity style={styles.button}>
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