import { Box, Button, Center, Flex, HStack, Image, Input, InputGroup, InputRightElement, Link, Stack, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import LayoutLogin from "../../layout/LayoutLogin"
import { useLogin } from "../../services/AuthProvider/hooks"
import { AccountType } from "../../types/user"

const LoginVenue = () => {
    const [show, setShow] = useState(false)
    const [isLoading,setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleClick = () => setShow(!show)
    const login = useLogin()


    const loginHandler = async () => {
        setLoading(true)
        setError("")
        const loginResult = await login(email,password, AccountType.VENUE)

        if (loginResult?.errors) {
            setError(loginResult.message)    
        }

        if (loginResult?.error) {
            setError(loginResult?.error)    
        }
        setLoading(false)
    }

    return(
        <LayoutLogin pageTitle={"Login"}>
            <Flex direction={'column'} gap='40px' alignItems={'center'}>
                <Text fontSize={{base:'24px',sm:'32px',md:'40px'}} fontWeight='700' color={'#000'}>Bulukumba Futsal</Text>

                
                <Image maxWidth={'200px'} height={'200px'} src='/bg-login.png' alt='bg-login' />
                
                <Text fontSize={{base:'14px',sm:'22px',md:'30px'}} fontWeight='700' color={'#000'}>Login Venue</Text>
                
                {
                    error ? <Text color={"red"}>{error}</Text> : null
                }
                
                <Stack direction={'column'} spacing='20px' alignItems={'center'}>
                    <Input 
                        width={{base:'280px',md:'350px'}} 
                        height='60px' 
                        borderColor={'2px solid #1B262C'} 
                        focusBorderColor='#1B262C' 
                        placeholder='Email' 
                        value={email}
                        onChange={e => setEmail(e.target.value)}    
                    />
                    <InputGroup size='md'>
                        <Input
                            width={{base:'280px',md:'350px'}} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <InputRightElement width='4.5rem' mt='8px'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    
                        <Button
                            height='61px'
                            width='246px'
                            bgColor={'#0F4C75'}
                            color='#fff'
                            fontSize={'18px'}
                            fontWeight='700'
                            _hover={{ bg: '#0F4C75' }}
                            _active={{
                                bg: '#0F4C75',
                                transform: 'scale(0.98)',
                            }}
                            disabled={isLoading}
                            onClick={loginHandler}
                        >
                            {
                                isLoading ?
                                "Loading"
                                :
                                "Login"
                            }
                        </Button>
                    <Stack direction={'column'} spacing='4px'>
                        <Text textAlign={'center'} color={'#1B262C'} fontSize='16px' fontWeight={'700'}>
                            Belum punya akun? 
                        </Text>
                        <HStack spacing='4px'>
                            <Link href='/Register' >
                                <Text color='#0F4C75' fontSize='16px' fontWeight={'700'}>Registrasi Tim</Text>
                            </Link>
                            <Text>||</Text>
                            <Link href='/' >
                                <Text color='#0F4C75' fontSize='16px' fontWeight={'700'}>Login Team</Text>
                            </Link>
                            <Text>||</Text>
                            <Link href='/venue_admin/register' >
                                <Text color='#0F4C75' fontSize='16px' fontWeight={'700'}>Registrasi Venue</Text>
                            </Link>
                        </HStack>
                    </Stack>
                    
                </Stack>
            </Flex>
        </LayoutLogin>
    )
}

export default LoginVenue