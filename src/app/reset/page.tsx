'use client';

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, FormLabel, FormControl, Button, Box,useToast, IconButton, Text } from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'

export default function Reset() {

    const toast = useToast(); 

  const [data, setData] = useState<{
    password: string,
    confirmPassword: string
  }>({
    password: '',
    confirmPassword: ''
  })

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const confirmPasswords = async () => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) return alert(`Your passwords are incorrect`);

    const { data: resetData, error } = await supabase
      .auth
      .updateUser({
        password: data.password
      })

    if (resetData) {
        toast({
            title: 'Success',
            description: 'Your password rest was successfull.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
        router.push('/')
    }
    if (error) {
        console.log(error)
        toast({
            title: 'Error',
            description: 'There was an error restting your password . Please try again later.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  return(
    <Box
                
                    backgroundSize="cover"
                    backgroundPosition="center"
                    height="100vh"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"        
                >
                    
                    <Box
                        p={6}
                        borderRadius="md"
                        boxShadow="md"
                        textAlign="center"
                        width={'50vw'}
                    >
                            <Text fontSize={'2xl'} fontStyle={'bold'} marginBottom={'20px'} color={'teal'}>Reset Your Password</Text>
                            
                            <FormControl id="password" mt={4} marginBottom={"10px"}>
                                <FormLabel textAlign={"center"}>Enter your new password</FormLabel>
                                <Input
                                    
                                    variant='outline'
                                    placeholder="Enter your new password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl id="email" marginBottom={"10px"}>
                                <FormLabel textAlign={"center"}>Confirm your new password</FormLabel>
                                <Input
                                
                                    variant='outline'
                                    placeholder="Confirm your password"
                                    type={showPassword ? 'text' : 'password'}
                                    name='confirmPassword'
                                    value={data?.confirmPassword}
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <IconButton aria-label='Show or hide password' mt={6} colorScheme="teal" alignSelf={'center'} onClick={() => setShowPassword(!showPassword)} marginRight={'10px'}>
                                {showPassword ? <ViewOffIcon/> :  <ViewIcon/>}
                            </IconButton>
                            
                            <Button mt={6} colorScheme="teal" alignSelf={'center'} onClick={() => confirmPasswords()} marginLeft={'10px'}>
                                Reset
                            </Button>
                        
                    </Box>
                </Box>
  )
}
