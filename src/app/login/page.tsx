"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Input, FormLabel, FormControl, Button, Box } from "@chakra-ui/react";


export default function page() {
    const [data, setData] = useState<{
        email: string,
        password: string
    }>({
        email: '',
        password: ''
    })

    const login = async()=>{
        try{
            let { data, error } = await supabase
            .auth.
            signInWithPassword({
                email: 'someone@email.com',
                password: 'RlEeENIKpkPVQJVLaeKm'
            })
        }
        catch(error){

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
                <Button onClick={login} mt={6} colorScheme="teal" alignSelf={'center'}>
                    Log in
                </Button>
            </Box>
        </Box>
    );
}