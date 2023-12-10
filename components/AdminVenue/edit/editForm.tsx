import React, { useEffect, useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  HStack,
  Text,
  Center,
  Button,
  Box
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form';
import TimePicker from '../../Commons/TimePicker';
import { useSelector } from 'react-redux';
import { AccountType, VenueInfo } from '../../../types/user';
import { RootState } from '../../../store';
import { updateVenue } from '../../../services/API/venue';
import { useAlert } from "react-alert";
import { useRouter } from 'next/router';
import { ValidationError } from '../../../types/response';


type EditForm = {
  name: string;
  address: string;
  est_year: number;
  owner_name: string;
  phone: string;
  opening_hour: number;
  closing_hour: number;
  profil_picture: string | File
}

function EditForm() {

  const [isLoading, setLoading] = useState(false)
  const alert = useAlert()
  const router = useRouter()

  const venue: VenueInfo | null = useSelector((state: RootState) => {
    if (state.account.userInfo?.type === AccountType.VENUE) {
      return state.account.userInfo.data
    }
    return null
  })

  const { register, handleSubmit, setValue, getValues, control, setError, formState } = useForm<EditForm>({
    defaultValues: {
      name: venue.name,
      address: venue.address,
      est_year: venue.est_year,
      owner_name: venue.owner_name,
      phone: venue.phone,
      opening_hour: venue.opening_hour,
      closing_hour: venue.closing_hour,
      profil_picture: venue.profil_picture
    }
  });

  const { errors } = formState


  const onSubmit = async (values: EditForm) => {
    setLoading(true);

    const res = await updateVenue(values)

    if (res?.errors) {
      const errRes = res as ValidationError;
      for (const key in errRes.errors) {
        setError(`root.${key}`, {
          message: errRes.errors[key].join("\n\r")
        });
      }
    }else{
      alert.show("Data berhasil disimpan",{
        type: "success",
      });
      router.push("/venue_admin");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired >
        <FormLabel>Nama tempat</FormLabel>
        <Input placeholder='Nama tempat' {...register("name")} />
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
        <FormLabel>Nama Pemilik</FormLabel>
        <Input placeholder='Nama Pemilik' {...register("owner_name")} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Nomor telepon</FormLabel>
        <Input placeholder='Nomor telepon' {...register("phone")} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Jam Buka</FormLabel>
        <HStack>
          <Controller
            control={control}
            name='opening_hour'
            render={({ field }) => (
              <TimePicker w={"100%"}
                value={`${field.value?.toString().padStart(2, "0")}:00`}
                onChange={e => {
                  const [hour] = e.target.value.split(":")
                  field.onChange(parseInt(hour));
                }}
              />
            )}
          />
          <Text>Sampai</Text>
          <Controller
            control={control}
            name='closing_hour'
            render={({ field }) => (
              <TimePicker w={"100%"}
                value={`${field.value?.toString().padStart(2, "0")}:00`}
                onChange={e => {
                  const [hour] = e.target.value.split(":")
                  field.onChange(parseInt(hour))
                }}
              />
            )}
          />

        </HStack>
      </FormControl>
      <FormControl>
        <FormLabel>Foto</FormLabel>
        <Controller 
          control={control}
          name='profil_picture'
          render={({field}) => (
            <Input type="file" onChange={(e) => {
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