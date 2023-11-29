import { InputProps, Select, SelectProps } from '@chakra-ui/react'
import * as _chakra_ui_system from '@chakra-ui/system';
import React, { useMemo } from 'react'

type Props = {
    value: string;
    w?: string;
    my?: string;
    onChange?: (e: any) => void;
    disabled?: boolean;
    placeholder?: string;
};

function TimePicker(props: Props) {
    
    const options = useMemo(() => {
        let result = [];
        for (let i = 0; i < 24; i++) {
            result.push(
                `${i.toString().padStart(2,"0")}:00`
            )
        }

        return result;
    },[])

    return (
        <Select {...props} >
            {
                options.map(option => {
                    return (
                        <option selected={option === props.value} key={option} value={option}>{option}</option>
                    )
                })
            }
        </Select>
    )
}

export default TimePicker