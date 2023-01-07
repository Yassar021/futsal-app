import { Button, Flex, Input, InputGroup, InputRightElement, Link, Stack, Text, Textarea } from "@chakra-ui/react"
import { useState } from "react"
import LayoutRegister from "../../layout/LayoutRegister"

const Register = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return(
        <LayoutRegister pageTitle={'Register'}>
            <Flex direction={'column'} gap='20px' alignItems={'center'}>
                <Text mb='20px' fontSize={{base:'24px',sm:'32px',md:'40px'}} fontWeight='700' color={'#000'}>Registrasi Tim</Text>

                <Stack direction={{base:'column',md:'row'}} spacing='40px'>
                    <Stack direction={'column'} spacing='20px'>
                        <Text fontSize={'24px'} fontWeight='500'>Informasi Umum</Text>

                        <Input width={{base:'280px',md:'350px'}} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' placeholder='Nama Tim' />
                        <Input width={{base:'280px',md:'350px'}} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' placeholder='Alamat' />
                        <Input type={'date'} width={{base:'280px',md:'350px'}} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' placeholder='Tanggal Berdiri' />
                        <Textarea height={'140px'} placeholder='Here is a sample placeholder'borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' />
                    </Stack>
                    <Stack direction={'column'} spacing='20px'>
                        <Text fontSize={'24px'} fontWeight='500'>Identitas Diri</Text>

                        <Input width={{base:'280px',md:'350px'}} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' placeholder='Email' />
                        <InputGroup size='md'>
                            <Input
                                width={{base:'280px',md:'350px'}} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C'
                                type={show ? 'text' : 'password'}
                                placeholder='Password'
                            />
                            <InputRightElement width='4.5rem' mt='8px'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup size='md'>
                            <Input
                                width={{base:'280px',md:'350px'}} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C'
                                type={show ? 'text' : 'password'}
                                placeholder='Konfirmasi Password'
                            />
                            <InputRightElement width='4.5rem' mt='8px'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Input width={{base:'280px',md:'350px'}} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' placeholder='Nama Pelatih' />
                        <Input width={{base:'280px',md:'350px'}} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' placeholder='Nomor Telepon' />
                    </Stack>
                </Stack>
                
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
                    Registrasi
                </Button>
                <Stack direction={'row'} spacing='4px'>
                    <Text color={'#1B262C'} fontSize='16px' fontWeight={'700'}>
                        Sudah punya akun? 
                    </Text>
                    <Link href='/' >
                        <Text color='#0F4C75' fontSize='16px' fontWeight={'700'}>Login</Text>
                    </Link>
                </Stack>
            </Flex>
        </LayoutRegister>
    )
}

export default Register