import { View, Text, TouchableOpacity, Image, Alert, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContextType, userContext } from '../../context/UserContext';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import { TextInput } from 'react-native-paper';
import baseService from '../../api/baseService';
import DatePicker from 'react-native-date-picker'
import { check, PERMISSIONS, RESULTS, openSettings } from "react-native-permissions"


const ProfileMainScreen = () => {

  const { logout, user } = useContext(userContext) as AuthContextType;
  const [name, setname] = useState("")
  const [surname, setsurname] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date())


  const galleryPermission = Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;


  useEffect(() => {

    checkGalleryPermission();
  }, [])
  

  const checkGalleryPermission = async () => {

    const result = await check(galleryPermission);

    if(result == RESULTS.DENIED){
      // Alert.alert("Permission Denied", "Please allow gallery access from settings.",
      // [
      //   {
      //     text: "Cancel",
      //     style: "cancel"
      //   },
      //   {
      //     text: "Open Settings",
      //     onPress: () => openSettings()
      //   }
      // ]
      // );
    }
  }


  useEffect(() => {

    baseService.get('/user/profile/' + user?.id)
      .then(response => {
        const userDetails = response;
        setname(userDetails.name);
        setsurname(userDetails.surname);
        setProfileImage(userDetails.profileImage);
        setDate(new Date(userDetails.birthDate));
      })
      .catch(error => {
        console.log('Error fetching user details: ', error);
      });

  }, [])



  const updateProfile = () => {


    const updatedData = {
      name,
      surname,
      profileImage,
      birthDate: date.toISOString(),
    };

    baseService.put('/user/profile/' + user?.id, updatedData)
      .then(response => {
        Alert.alert('Success', 'Profile updated successfully');
      })
      .catch(error => {
        console.log('Error updating profile: ', error);
      });
  }

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

      <View style={{ width: '80%', marginBottom: 10 }}>
        <TextInput
          label="Email"
          value={user?.email || ''}
          mode="outlined"
          style={{ marginBottom: 10 }}
          editable={false}
        />
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setname(text)}
          mode="outlined"
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Surname"
          value={surname}
          mode="outlined"
          style={{ marginBottom: 10 }}
          onChangeText={text => setsurname(text)}
        />

        <TouchableOpacity
          style={{
            // backgroundColor: '#007aff',
            borderWidth: 1,
            borderColor: '#007aff',

            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginBottom: 20,
          }}
          onPress={() => setOpenDatePicker(true)}
        >
          <Text style={{ color: 'black', fontSize: 19 }}>Select Date of Birth</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={openDatePicker}
          date={date}
          mode="date"
          onConfirm={(selectedDate) => {
            setOpenDatePicker(false);
            setDate(selectedDate);
          }}
          onCancel={() => {
            setOpenDatePicker(false);
          }}
        />
        <Text>Date of Birth: {date.toDateString()}</Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#007aff',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginBottom: 20,
        }}
        onPress={updateProfile}
      >
        <Text style={{ color: '#fff', fontSize: 19 }}>Update</Text>
      </TouchableOpacity>

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
        <Text style={{ color: '#fff', fontSize: 19 }}>Logout</Text>
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