import React, { useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import { Text, View, Pressable } from "react-native";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import tw from 'twrnc';
import { addCandidate } from "../services/condidates";

export default function AddCandidate ({navigation}){

    const [loading, setLoading] = useState(false);
    const [authError,setAuthError] = useState("");
  
    const initialValues = {
        names:'',
        nationalId: '',
        profilePic: 'none',
        gender: '',
        mission: ''
    }
    const validationSchema = Yup.object().shape({
      email: Yup.string().email("Invalid email").required('Email is required'),
      password: Yup.string().required('Password is required'),
    })
  
    const formik = useFormik({
      initialValues,
      validationSchema
    })
  
    const { handleChange, handleBlur, values, errors, touched, isValid,getFieldProps } = formik;
  
    const handleSubmit = async () => {
      setLoading(true);
      setAuthError("");
      const res = await addCandidate(values);
      setLoading(false);
      if(!res?.success) {
        setAuthError(res?.message || "Something went wrong");
      }else{
        alert("Candidate added successfully");
      }
    }
  
    
    return (
        <View style={tw`h-[100%] bg-white  justify-end items-center`}>
        <View style={tw`h-[95%] w-full bg-white `}>
            <View style={tw`w-full`}>
                <Text style={tw`text-center font-extrabold text-xl`}>Add Candidate</Text>
            </View>
          
          {authError.length > 0 && <Text style={tw`mt-4 text-red-500 text-center`}>{authError}</Text>}
          <View style={tw`mt-3`}>
          <View style={tw`px-6 py-2`}>
          <Input
              Icon={
                <MaterialIcons name="person-outline" size={24} color="silver" />
              }
              placeholder="Full Name"
              onChangeText={handleChange('names')}
              onBlur={handleBlur('names')}
              value={values.names}
              borderColor={touched.names && errors.names ? 'red' : 'gray'}
            />
            {touched.names && errors.names 
            && (<Text style={tw`text-red-500`}>{errors.names}</Text>)}

          <View style={tw`mt-4`}>
            <Input
              Icon={<AntDesign name="idcard" size={24} color="silver" />}
              placeholder="National ID"
              onChangeText={handleChange('nationalId')}
              onBlur={handleBlur('nationalId')}
              value={values.nationalId}
              borderColor={touched.nationalId && errors.nationalId ? 'red' : 'gray'}
              />
            {touched.nationalId && errors.nationalId && <Text style={tw`text-red-500`}>{errors.nationalId}</Text>}
            </View>
            
            <Input
              Icon={
                <MaterialIcons name="person-outline" size={24} color="silver" />
              }
              placeholder="Gender"
              onChangeText={handleChange('gender')}
              onBlur={handleBlur('gender')}
              value={values.gender}
              borderColor={touched.gender && errors.gender ? 'red' : 'gray'}
            />
            {touched.gender && errors.gender 
            && (<Text style={tw`text-red-500`}>{errors.gender}</Text>)}

            <View style={tw`mt-4`}>
            <Input
              Icon={<Feather name="lock" size={24} color="silver" />}
              placeholder="mission"
              security={true}
              onChangeText={handleChange('mission')}
              onBlur={handleBlur('mission')}
              value={values.mission}
              borderColor={touched.mission && errors.mission ? 'red' : 'gray'}
            />
            {touched.mission && errors.mission && <Text style={tw`text-red-500`}>{errors.mission}</Text>}
            </View>

            <View style={tw`mt-8`}>
            <Button
              mode={"contained"}
              style={tw`bg-black w-full p-[10] mt-4`}
              onPress={handleSubmit}
            >
              {loading ? "Logging in ..." : "Add Candidate"}
            </Button>
            </View>

          </View>
          </View>
      </View>
        </View>
    )
}