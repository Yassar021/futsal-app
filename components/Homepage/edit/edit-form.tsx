import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useAlert } from "react-alert";
import { AccountType, TeamInfo } from '../../../types/user';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { ValidationError } from '../../../types/response';
import { updateVenue } from '../../../services/API/venue';
import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, HStack, Input, Textarea } from '@chakra-ui/react';
import { updateTeam } from '../../../services/API/team';
import { useUser } from '../../../services/AuthProvider/hooks';


type EditForm = {
    name: string;
    address: string;
    est_year: number;
    description: string;
    coach_name: string;
    phone: string;
    profile_picture: string | File
}


function EditForm() {
    const [isLoading, setLoading] = useState(false)
    const alert = useAlert()
    const router = useRouter()

    const team: TeamInfo | null = useSelector((state: RootState) => {
        if (state.account.userInfo?.type === AccountType.TEAM) {
            return state.account.userInfo.data
        }
        return null
    })

    const { refetch: refetchUser } = useUser()

    const { register, handleSubmit, setValue, getValues, control, setError, formState } = useForm<EditForm>({
        defaultValues: {
            name: team.name,
            address: team.address,
            coach_name: team.coach_name,
            description: team.description,
            est_year: team.est_year,
            phone: team.phone,
            profile_picture: team.profile_picture
        }
    })

    const { errors } = formState

    const onSubmit = async (values: EditForm) => {
        setLoading(true);

        const res = await updateTeam(values)

        if (res?.errors) {
            const errRes = res as ValidationError;
            for (const key in errRes.errors) {
                setError(`root.${key}`, {
                    message: errRes.errors[key].join("\n\r")
                });
            }
        } else {
            alert.show("Data berhasil disimpan", {
                type: "success",
            });
            refetchUser();
            router.push("/");
        }

        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired >
                <FormLabel>Nama Team</FormLabel>
                <Input placeholder='Nama Team' {...register("name")} />
                {
                    errors.name?.message && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                }
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Alamat</FormLabel>
                <Input placeholder='Alamat' {...register("address")} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Tahun Berdiri</FormLabel>
                <Input type="number" placeholder='tahun berdiri' {...register("est_year")} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Deskripsi</FormLabel>
                <Textarea {...register("description")} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Nama Pelatih</FormLabel>
                <Input placeholder='Nama Pelatih' {...register("coach_name")} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Nomor telepon</FormLabel>
                <Input placeholder='Nomor telepon' {...register("phone")} />
            </FormControl>
            <FormControl>
                <FormLabel>Foto</FormLabel>
                <Controller
                    control={control}
                    name='profile_picture'
                    render={({ field }) => (
                        <Input accept='image/*' type="file" onChange={(e) => {
                            field.onChange(e.target.files[0])
                        }} />
                    )}
                />
            </FormControl>
            <Box margin={"30px"}>
                <Center>
                    <Button
                        type="submit"
                        color='#fff'
                        fontFamily={'DM Sans'}
                        bgColor={'#0F4C75'}
                        width='140px'
                        height={'40px'}
                        _hover={{ bg: '#0F4C75' }}
                        fontSize={'14px'}
                        fontWeight={'500'}
                        _active={{
                            bg: '#0F4C75',
                            transform: 'scale(0.98)',
                        }}
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        Simpan
                    </Button>
                </Center>
            </Box>

        </form>
    )
}

export default EditForm