import React from 'react'
import { View, Text, Image } from 'react-native'
import tw from 'twrnc';

export default function CandidateView ({navigation, route}) {
    const { candidate, votes } = route.params;

    return (
    <View style={tw`bg-white flex flex-col justify-start my-2 px-3 py-6`}>
        <Image
          source={{
            uri: 'https://via.placeholder.com/150',
          }}
         style={tw`w-full h-40 mr-2 rounded-sm`}
        />

       <View>
        <Text style={tw`font-bold text-lg`}>{candidate.names}</Text>
        <Text style={tw`text-md`}>Gender: {candidate.gender}</Text>

        <View style={tw`mb-4 mt-2`}>
          <Text style={tw`text-sm`}>Mission</Text>
          <Text style={tw`font-bold`}>{candidate.mission}</Text>
        </View>
        <Text style={tw`font-bold text-lg`}>Total votes: {votes}</Text>
       </View>
      </View>
    )
}