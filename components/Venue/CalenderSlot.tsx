import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import ReactTimeslotCalendar from '../Timeslots/src/js/react-timeslot-calendar';

type Props = {
	slots: {date_start: string, by?: string, booking_id?: number}[]
    onSelect?: (selecteds: [], selected: any, data: {booking_id: number} | undefined) => void
}

const openingHours = "09:00";
const closingHours = "20:00";

function CalenderSlot({ slots: bookedSlots, onSelect }: Props) {

    const slots = useMemo(() => {
        const startHour = parseInt(openingHours.split(":")[0]);
        const endHour = parseInt(closingHours.split(":")[0]);
        const slots: number[][] = [];

        for (let i = startHour; i <= endHour; i++) {
            slots.push([i, i + 1]);
        }

        return slots
    },[])

    return (
        <ReactTimeslotCalendar
            initialDate={moment().format()}
            timeslots={slots}
            disabledTimeslots={bookedSlots.map(item => ({
                startDate: item.date_start,
                format: 'YYYY-MM-DD h:mm:ss',
                by: item.by,
                booking_id: item.booking_id
            }))}
            timeslotProps={{
                showFormat: 'H:mm'
            }}
            onSelectTimeslot={onSelect}
        />
    )
}

export default CalenderSlot