"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Input, FormLabel, FormControl, Button, Box,useToast , Text} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Login() {
    const toast = useToast();
    const router = useRouter(); 


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

    const signin = ()=>{
        router.push('/login')
    }

    const login = async () => {
        try {
          let { data: dataUser, error } = await supabase
            .auth
            .signUp({
              email: data.email,
              password: data.password
            })
    
          if (dataUser) {
            toast({
                title: 'Success',
                description: 'Signed Up Successfully! Check your email to verify your account.',
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
            description: 'There was an error signing up. Please try again later.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
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
                        <>  
                            <Text fontSize={'2xl'} fontStyle={'bold'} marginBottom={'20px'} color={'teal'}>Mwangangi Supabase. SIGN UP!</Text>
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
                            <Button mt={3} colorScheme="teal" alignSelf={'center'} mb={4} onClick={login}>
                                Sign Up
                            </Button>
                        </>
                        <Text>Already have an account?</Text>
                        <Button mt={2} colorScheme="teal" alignSelf={'center'} onClick={signin}>
                                Sign in
                        </Button>
                    </Box>
                </Box>
    )
}