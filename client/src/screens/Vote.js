import { ScrollView, Text, View, Pressable, Image, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import { getProfile, isLoggedIn } from '../services/auth'
import { getAllCandidates, voteForCandidates, userVotedForCandidate } from '../services/condidates'
import tw from 'twrnc';
import Button from "../components/button";

export default function Vote ({ navigation }) {

    const [user, setUser] = useState({})
    const [allCandidates, setallCandidates] = useState([])
    const [isAdmin, setisAdmin] = useState(false)
    const [userVoted, setuserVoted] = useState(false)
    const [refetch, setRefetch] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const getUserProfile = async () => {
      const profile = await getProfile();
      setUser(profile?.data?.user);
      if(profile?.data?.user.isAdmin) {
        setisAdmin(true)
      }
    }

    const getCondidates = async () => {
      setLoading(true)
      const candidates = await getAllCandidates();
      setallCandidates(candidates?.data);
      setLoading(false)
    }

    const getUserVoted = async () => {
      setLoading(true)
      const userVoted = await userVotedForCandidate(user?._id);
      setuserVoted(userVoted?.success);
      setLoading(false)
    }

    useEffect(() => {
      // return to login if no token found
      const checkLoggedIn = async () => {
        let log = await isLoggedIn();
        if(!log) return navigation.navigate('Login');
      }
      checkLoggedIn()
      getUserProfile()
      getUserVoted()
      getCondidates()
      setRefetch(!refetch)
    }, [])
    
    useEffect(() => {     
     getUserProfile()
     getUserVoted()
     getCondidates()
    }, [isAdmin, refetch])


    const handleVote = async (userId, candidateId)=>{
      const data = {
        userId: userId,
        candidateId: candidateId
      }
      const vote = await voteForCandidates(data);
      if(vote?.success) {
        setRefetch(!refetch)
        Alert.alert('Voting Success','Voted Successfully')
      } else {
        Alert.alert('Voting error',vote?.message||"Something went wrong")
      }

    }

    return (
      <>
      {loading?
      <View style={tw`h-full flex justify-center items-center`}>
        <Text style={tw`font-normal text-sm`}>Loading...</Text>
      </View>:(
        <ScrollView style={tw`mb-24`}>
        
        {!user?._id || !allCandidates?.length?
        <View style={tw`m-4`}>
          <Pressable onPress={()=>setRefetch(!refetch)}>
              <Button style={tw`bg-blue-400 text-white w-full rounded-[10px]`}>
                Reload Data
              </Button>
        </Pressable>
        </View>:null}

        {isAdmin&&
        <View style={tw`m-4`}>
          <Pressable onPress={()=>navigation.navigate("AddCandidate")}>
              <Button style={tw`bg-blue-400 text-white w-full rounded-[10px]`}>
                Add Candidate
              </Button>
        </Pressable>
        </View>}

        {allCandidates?.map((cd, index) => (
          <Pressable 
          onPress={()=>{
            if(isAdmin) navigation.navigate("CandidateView", {candidate: cd?.candidate, votes: cd.votes})
          }}
          style={tw`bg-white flex flex-row justify-start my-2 px-3 py-6 gap-2`}>
            <Image
              source={{
                uri: 'https://via.placeholder.com/150',
              }}
              style={tw`w-32 h-32 mr-2 rounded-sm`}
            />

           <View>
            <Text style={tw`font-bold text-lg`}>{cd?.candidate.names}</Text>
            <Text style={tw`text-md`}>Gender: {cd?.candidate.gender}</Text>


            <View style={tw`mb-4 mt-2`}>
              <Text style={tw`text-sm`}>Mission</Text>
              <Text style={tw`font-bold`}>{cd?.candidate.mission}</Text>
            </View>
           
           {!isAdmin && 
           <>
           {userVoted?
             <Text style={tw`font-bold text-lg`}>Total votes: {cd?.votes}</Text>:
            <Pressable onPress={()=>handleVote(user?._id, cd?.candidate?._id)}>
              <Button style={tw`bg-blue-400 text-white w-full rounded-[10px]`}>
                Vote
              </Button>
            </Pressable>
            }</>
            }
            {isAdmin&&(
              <Text style={tw`font-bold text-lg`}>Total votes: {cd?.votes}</Text>
            )}

           </View>
          </Pressable>
        ))
        }
      </ScrollView>
      )
      }
    </>
)}