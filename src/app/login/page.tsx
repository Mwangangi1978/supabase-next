"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Input, FormLabel, FormControl, Button, Box,useToast , Text} from "@chakra-ui/react";
import { useRouter } from "next/navigation";


export default function Login() {
    const toast = useToast();
    const router = useRouter(); 


    const [resetPassword, setResetPassword] = useState(false)

    const [data, setData] = useState<{
        email: string,
        password: string
    }>({
        email: '',
        password: ''
    })

   
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    }
    
    const login = async () => {
        try {
          let { data: dataUser, error } = await supabase
            .auth
            .signInWithPassword({
              email: data.email,
              password: data.password
            })
    
          if (dataUser) {
            toast({
                title: 'Success',
                description: 'Logged in successfully. Welcome!.',
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
            
            router.push('/')
          }
    
        } catch (error) {
          console.log(error)
          toast({
            title: 'Error',
            description: 'There was an error logging in. Please try again later.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
    }

    const sendResetPassword = async () => {
        try {
          const { data: resetData, error } = await supabase
            .auth
            .resetPasswordForEmail(data.email, {
              redirectTo: `${window.location.href}reset`
            })

            if (resetData) {
                // Password reset succeeded, show success toast
                toast({
                  title: 'Password Reset Email Sent',
                  description: 'Please check your email for further instructions.',
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });
            }
    
          console.log(resetData)
          console.log(error)
    
          
        } catch (error) {
          console.log(error)
          toast({
            title: 'Error',
            description: 'There was an error sending the password reset email. Please try again later.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }
    
    
    

    return(
        <>
            
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
                        {!resetPassword &&
                        <>  
                            <Text fontSize={'2xl'} fontStyle={'bold'} marginBottom={'20px'} color={'teal'}>Mwangangi Supabase!</Text>
                            <FormControl id="email" marginBottom={"10px"}>
                                <FormLabel textAlign={"center"}>Email</FormLabel>
                                <Input
                                
                                    variant='outline'
                                    placeholder="Enter your email"
                                    name="email"
                                    type="text"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="password" mt={4} marginBottom={"10px"}>
                                <FormLabel textAlign={"center"}>Password</FormLabel>
                                <Input
                                    
                                    variant='outline'
                                    placeholder="Enter your password"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <Button mt={6} colorScheme="teal" alignSelf={'center'} onClick={login}>
                                Log in
                            </Button>
                        </>
                        }
                        {resetPassword &&
                            <>
                            <Text fontSize={'2xl'} fontStyle={'bold'} marginBottom={'20px'} color={'teal'}>Enter email to reset password</Text>
                            <FormControl id="email" marginBottom={"10px"}>
                                <FormLabel textAlign={"center"}>Email</FormLabel>
                                <Input
                                
                                    variant='outline'
                                    placeholder="Enter your email"
                                    name="email"
                                    type="text"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <Button mt={6} colorScheme="teal" alignSelf={'center'} onClick={sendResetPassword} >
                                Reset Password
                            </Button>
                            </>
                        }

                    <Button mt={6} colorScheme="teal" alignSelf={'center'} onClick={() => setResetPassword(!resetPassword)} marginLeft={'10px'}>
                        {resetPassword ? 'Login' : 'Reset my password'}
                    </Button>
                        
                    </Box>
                </Box>
            {resetPassword &&
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
                        
                            <FormControl id="email" marginBottom={"10px"}>
                                <FormLabel textAlign={"center"}>Email</FormLabel>
                                <Input
                                
                                    variant='outline'
                                    placeholder="Enter your email"
                                    name="email"
                                    type="text"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <Button mt={6} colorScheme="teal" alignSelf={'center'} onClick={sendResetPassword} >
                                Reset Password
                            </Button>
                        
                    </Box>
                </Box>
                

            }
            

        </>
    );
}