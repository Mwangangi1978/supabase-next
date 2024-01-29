"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Input ,FormLabel,  FormControl, Button} from '@chakra-ui/react'

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
        <div>
            <FormControl id="email">
                <FormLabel >First Name</FormLabel>
                <Input 
                    placeholder='Basic usage'
                    name="email"
                    type="text"
                    value={data?.email}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl id="password">
                <FormLabel >Password</FormLabel>
                <Input 
                    placeholder='Basic usage'
                    name="password"
                    type="password"
                    value={data?.password}
                    onChange={handleChange}
                />
            </FormControl>
            <Button onClick={login}>Log in</Button>
            
        </div>
    )
}