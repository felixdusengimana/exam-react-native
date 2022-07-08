import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import tw from 'twrnc'
import Button from '../../../components/button'
import { getProfile, isLoggedIn, _getToken } from '../../../services/auth'

const Onboard = ({ navigation }) => {
  const [user, setUser] = useState({})
  const [isAdmin, setisAdmin] = useState(false)
  const [refetch, setRefetch] = useState(false)
  
  const getUserProfile = async () => {
    const profile = await getProfile();
    setUser(profile?.data?.user);
    if(profile?.data?.user.isAdmin) {
      setisAdmin(true)
      // navigation.navigate('AdminHome')
    }
  }

  useEffect(() => {
    // return to login if no token found
    const checkLoggedIn = async () => {
      let log = await isLoggedIn();
      if(!log) return navigation.navigate('Login');
    }
   checkLoggedIn()
   getUserProfile()
   setRefetch(!refetch)
  }, [])
  
  useEffect(() => {
   getUserProfile()
  }, [isAdmin, refetch])

  const handleLogout = () => {
    SecureStore.deleteItemAsync('token')
    navigation.navigate('Login')
  }

  return (
    <View style={tw`h-full flex justify-around items-center`}>
      <View>
        <Text style={tw`font-normal text-sm`}>Welcome {user?.names}</Text>
        <Text style={tw`font-bold text-xl text-center`}>What do you want to see?</Text>
      {!isAdmin?
      <View style={tw`mt-8`}>
          <Pressable onPress={()=> navigation.navigate("VoteContain")}>
            <Button style={tw`bg-black text-white w-full rounded-[10px]`}>
              VOTE
            </Button>
          </Pressable>
        </View>
        :<View style={tw`mt-8`}>
        <Pressable onPress={()=> navigation.navigate("AddCandidate")}>
          <Button style={tw`bg-black text-white w-full rounded-[10px]`}>
            Add Candidate
          </Button>
        </Pressable>

        <View style={tw`mt-8`}>
          <Pressable onPress={()=>navigation.navigate("VoteContain")}>
            <Button style={tw`bg-black text-white w-full rounded-[10px]`}>
              VIEW RESULTS
            </Button>
          </Pressable>
        </View>
      </View>
      }
      </View>
    </View>
  )
}

export default Onboard
