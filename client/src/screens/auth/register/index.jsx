import React, { useEffect, useState } from "react";
import { Text, Touchable, View, Pressable, ScrollView } from "react-native";
import { MaterialIcons, Feather, AntDesign, Entypo } from "@expo/vector-icons";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import tw from 'twrnc';

import Button from "../../../components/button";
import { isLoggedIn, register } from "../../../services/auth";
import Input from "../../../components/input";

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [authError,setAuthError] = useState("");

  const initialValues = {
    names: '',
    email:'',
    address: '',
    phone: '',
    nationalId: '',
    password: ''
  }
  const validationSchema = Yup.object().shape({
    names: Yup.string().required('Name is required'),
    email: Yup.string().email("Invalid email").required('Email is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string().min(10, 'Phone number is at least 10 numbers').required('Phone is required'),
    nationalId: Yup.number().min(16, 'Minimun National Id characters is 16').required('National ID is required'),
    password: Yup.string().required('Password is required'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema
  })

  const { handleChange, handleBlur, values, errors, touched, isValid, getFieldProps } = formik;

  const handleSubmit = async () => {
    setLoading(true);
    setAuthError("");
    const res = await register(values);
    setLoading(false);
    if(!res?.success) return setAuthError(res?.message || "Something went wrong");
    navigation.navigate('Login');
  }
  
  useEffect(() => {
    const checkLoggedIn = async () => {
      let log = await isLoggedIn();
      if(log) navigation.navigate('Onboard');
    }
   checkLoggedIn()
  }, [])

    return (
      <ScrollView>
        <View style={tw`h-[100%] bg-white  justify-end items-center`}>
        <View style={tw`h-[85%] w-full bg-white `}>
            <View style={tw`w-full`}>
                <Text style={tw`text-center font-extrabold text-xl`}>NEC</Text>
                <Text style={tw`text-center font-extrabold text-xl mt-2`}>Create Account</Text>
            </View>
        
         <View style={tw`mt-8`}>

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
              Icon={<Feather name="mail" size={24} color="silver" />}
              placeholder="Your Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              borderColor={touched.email && errors.email ? 'red' : 'gray'}
              />
            {touched.email && errors.email && <Text style={tw`text-red-500`}>{errors.email}</Text>}
            </View>

            <View style={tw`mt-4`}>
            <Input
              Icon={<Feather name="phone" size={24} color="silver" />}
              placeholder="Your Phone Number"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              borderColor={touched.phone && errors.phone ? 'red' : 'gray'}
              />
            {touched.phone && errors.phone && <Text style={tw`text-red-500`}>{errors.phone}</Text>}
            </View>

            <View style={tw`mt-4`}>
            <Input
              Icon={<Entypo name="address" size={24} color="silver" />}
              placeholder="Your Address"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              borderColor={touched.address && errors.address ? 'red' : 'gray'}
              />
            {touched.address && errors.address && <Text style={tw`text-red-500`}>{errors.address}</Text>}
            </View>

            <View style={tw`mt-4`}>
            <Input
              Icon={<AntDesign name="idcard" size={24} color="silver" />}
              placeholder="Your National ID"
              onChangeText={handleChange('nationalId')}
              onBlur={handleBlur('nationalId')}
              value={values.nationalId}
              borderColor={touched.nationalId && errors.nationalId ? 'red' : 'gray'}
              />
            {touched.nationalId && errors.nationalId && <Text style={tw`text-red-500`}>{errors.nationalId}</Text>}
            </View>

            <View style={tw`mt-4`}>
            <Input
              Icon={<Feather name="lock" size={24} color="silver" />}
              placeholder="Password"
              security={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              borderColor={touched.password && errors.password ? 'red' : 'gray'}
            />
            {touched.password && errors.password && <Text style={tw`text-red-500`}>{errors.password}</Text>}
            </View>
            
            <View style={tw`mt-4 mb-40`}>
            {authError.length > 0 && <Text style={tw`text-red-500 text-center`}>{authError}</Text>}
            <Button
              mode={"contained"}
              style={tw`bg-black w-full p-[10] mt-4`}
              onPress={handleSubmit}
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            <Pressable onPress={() => navigation.navigate('Login')}>
            <View style={tw`mt-4`}>
              <Text style={tw`text-xl underline text-gray-500`}>Have account? Login</Text>
            </View>
            </Pressable>
            </View>


          </View>
        </View>
      </View>
        </View>
     </ScrollView>
    )
}

export default SignUp;