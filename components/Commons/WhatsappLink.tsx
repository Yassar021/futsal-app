import { Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useMemo } from 'react'

type Props = {
    phone: string;
    message?: string;
}

function WhatsappLink({phone, message}: Props) {

    const waPhone = useMemo(() => {
        const regex = /^(0|\+62|\(.+\))/gm;

        return phone.replace(regex,"62").replace(/\s/g,"");
    },[phone])

    return (
        <Link href={`https://wa.me/${waPhone}`} as={"a"} target='_blank'>
            <Stack direction={'row'}>
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="23" fill="white" />
                    <path d="M6.67962 3.32038L7.29289 2.70711C7.68342 2.31658 8.31658 2.31658 8.70711 2.70711L11.2929 5.29289C11.6834 5.68342 11.6834 6.31658 11.2929 6.70711L9.50048 8.49952C9.2016 8.7984 9.1275 9.255 9.31653 9.63307C10.4093 11.8186 12.1814 13.5907 14.3669 14.6835C14.745 14.8725 15.2016 14.7984 15.5005 14.4995L17.2929 12.7071C17.6834 12.3166 18.3166 12.3166 18.7071 12.7071L21.2929 15.2929C21.6834 15.6834 21.6834 16.3166 21.2929 16.7071L20.6796 17.3204C18.5683 19.4317 15.2257 19.6693 12.837 17.8777L11.6286 16.9714C9.88504 15.6638 8.33622 14.115 7.02857 12.3714L6.12226 11.163C4.33072 8.7743 4.56827 5.43173 6.67962 3.32038Z" fill="#2DCC70" />
                </svg>
                <Text>Whatsapp</Text>
            </Stack>
        </Link>
    )
}

export default WhatsappLink