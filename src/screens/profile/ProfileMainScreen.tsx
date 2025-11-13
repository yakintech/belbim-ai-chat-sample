import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContextType, userContext } from '../../context/UserContext';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';

const ProfileMainScreen = () => {

  const { logout, user } = useContext(userContext) as AuthContextType;
  const [profileImage, setProfileImage] = useState<string | null>(null);


  const handleImagePick = () => {
    ImageCropPicker.openPicker({
      mediaType: 'any',
      quality: 1,
    }).then(image => {
      setProfileImage(image.path);
    }).catch(error => {
      console.log('ImagePicker Error: ', error);
    });
  };

  return (
    // Profile Page
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     

      {/* //profile image, email(readonly),name, surname, logout button */}
      <TouchableOpacity 
        onPress={async () => {
          const result = await launchImageLibrary({
            mediaType: 'mixed',
            quality: 1,
          });

          if (result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0];
            setProfileImage(selectedImage.uri || null);
          }
        }}
      >
      <Image
        source={{ uri: profileImage || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' }}
        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
        
      />
      </TouchableOpacity>
     
{/* 
      <TouchableOpacity onPress={handleImagePick}>
        <Image
          source={{ uri: profileImage || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
        />
      </TouchableOpacity> */}

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Email: {user?.email}</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Name: </Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Surname: </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#ff3b30',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
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



//media type: 'photo' | 'video' | 'mixed'
//quality: number (0 to 1) kalite ayarı
//saveToPhotos: boolean (seçilen medyayı cihazın fotoğraf galerisine kaydetme)
//durationlimit : number (video için maksimum süre sınırı saniye cinsinden)
//videoquality: 'low' | 'medium' | 'high' (video kalitesi)
//selectionLimit: number (seçilebilecek maksimum medya sayısı, 1 için tek seçim)
//presentationStyle: 'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen' (iOS için sunum stili)