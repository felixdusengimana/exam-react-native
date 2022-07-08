import React from 'react'
import {View, Pressable } from 'react-native'
import tw from 'twrnc'
import Button from '../components/button'
import * as SecureStore from 'expo-secure-store'

const Settings = ({navigation})=>{

  const handleLogout = () => {
    SecureStore.deleteItemAsync('token')
    navigation.navigate('Login')
  }

    return (
      <View style={tw`h-full flex justify-around items-center`}>
      <View style={tw`mt-8`}>
                <View style={tw`mt-8`}>
          <Pressable onPress={handleLogout}>
            <Button style={tw`bg-black text-white w-full rounded-[10px]`}>
              LOGOUT
            </Button>
          </Pressable>
        </View>
      </View>
      </View>
    )
}
export default Settings