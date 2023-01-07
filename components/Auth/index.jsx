import { Box, Button, Center, Flex, Image, Input, InputGroup, InputRightElement, Link, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"
import LayoutLogin from "../../layout/LayoutLogin"

const Login = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return(
        <LayoutLogin pageTitle={"Login"}>
            <Flex direction={'column'} gap='40px' alignItems={'center'}>
                <Text fontSize={{base:'24px',sm:'32px',md:'40px'}} fontWeight='700' color={'#000'}>MATCHMAKING FUTSAL</Text>
                
                <Image maxWidth={'200px'} height={'200px'} src='/bg-login.png' alt='bg-login' />

                <Stack direction={'column'} spacing='20px' alignItems={'center'}>
                    <Input width={{base:'280px',md:'350px'}} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' placeholder='Email' />
                    <InputGroup size='md'>
                        <Input
                            width={{base:'280px',md:'350px'}} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
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
                    >
                        Login
                    </Button>
                    <Stack direction={'row'} spacing='4px'>
                        <Text color={'#1B262C'} fontSize='16px' fontWeight={'700'}>
                            Belum punya akun? 
                        </Text>
                        <Link href='#' >
                            <Text color='#0F4C75' fontSize='16px' fontWeight={'700'}>Registrasi</Text>
                        </Link>
                    </Stack>
                    
                </Stack>
            </Flex>
        </LayoutLogin>
    )
}

export default Login