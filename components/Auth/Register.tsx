import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Flex, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, Link, Stack, Text, Textarea } from "@chakra-ui/react"
import React, { useState } from "react"
import LayoutRegister from "../../layout/LayoutRegister"
import { useForm } from "react-hook-form";
import { registerTeam } from "../../services/API/team";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";


type RegisterForm = {
    name: string;
    address: string;
    est_year: string;
    description: string;
    coach_name: string;
    phone: string;
    email: string;
    password: string;
    profile_picture: FileList;
}

const Register = () => {
    const { register, handleSubmit, watch} = useForm<RegisterForm>();

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)


    const router = useRouter()
    const alert = useAlert();



    const handleRegister = async (values: RegisterForm) => {
        setError("")
        setLoading(true);
        const response = await registerTeam({
            ...values,
            profile_picture: values.profile_picture[0]
        })

        if (response.errors) {
            setError(response.message);
        }else{
            alert.show("Registrasi Berhasil, Silahkan login",{
                type: "success",
              });
            
            router.push("/Login");
            
        }
        setLoading(false);
    }

    return (
        <LayoutRegister pageTitle={'Register Tim'}>
            <form onSubmit={handleSubmit(handleRegister)}>
                <Flex direction={'column'} gap='20px' alignItems={'center'}>
                    <Text mb='20px' fontSize={{ base: '24px', sm: '32px', md: '40px' }} fontWeight='700' color={'#000'}>Registrasi Tim</Text>
                    {
                        error && <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    }
                    <Stack direction={{ base: 'column', md: 'row' }} spacing='40px'>
                        <Stack direction={'column'} spacing='20px'>
                            <Text fontSize={'24px'} fontWeight='500'>Informasi Umum</Text>

                            <Input {...register("name")} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' placeholder='Nama Tim' />
                            <Input {...register("address")} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' placeholder='Alamat' />
                            <Input {...register("est_year")} type="number" height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' placeholder='Tahun Terbentuk' />
                            <Input {...register("coach_name")} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' placeholder='Nama Pelatih' />
                            <Textarea {...register("description")} height={'140px'} placeholder='Deskripsi Tim' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' />
                            <FormControl>
                                <FormLabel>Logo Tim</FormLabel>
                                <Input accept="image/*" {...register("profile_picture")} type='file' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' />
                            </FormControl>
                        </Stack>
                        <Stack direction={'column'} spacing='20px'>
                            <Text fontSize={'24px'} fontWeight='500'>Informasi Akun</Text>
                            <Input {...register("phone")} width={{ base: '280px', md: '350px' }} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' placeholder='Nomor Telepon' />
                            <Input {...register("email")} width={{ base: '280px', md: '350px' }} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C' placeholder='Email' />
                            <InputGroup size='md'>
                                <Input
                                    {...register("password")}
                                    width={{ base: '280px', md: '350px' }} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C'
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
                                    width={{ base: '280px', md: '350px' }} height='60px' borderColor={'2px solid #1B262C'} focusBorderColor='#1B262C'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Konfirmasi Password'
                                />
                                <InputRightElement width='4.5rem' mt='8px'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
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
                        type="submit"
                        isDisabled={isLoading}
                        isLoading={isLoading}
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
            </form>
        </LayoutRegister>
    )
}

export default Register