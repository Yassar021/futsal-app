import { Challenge } from "../../types/challenge";
import { AcceptBooking, PaginationRequest } from "../../types/request";
import { PaginatedResponse } from "../../types/response";
import { BookingSlot, VenueField } from "../../types/type";
import { VenueInfo } from "../../types/user";
import { baseFetcher } from "../fetcher";

export async function getVenueList(request: PaginationRequest): Promise<PaginatedResponse<VenueInfo>> {
    const { page = 1, size = 10 } = request
    return baseFetcher(`/venues?page=${page}&size=${size}`)
}

export async function getVenueBookingSlots(venueId: string | number,fieldId: string | number): Promise<BookingSlot[]> {
    return baseFetcher(`/venues/${venueId}/bookings?field_id=${fieldId}`)
}

export async function getFieldVenue(venueId: number): Promise<VenueField[]> {
    return baseFetcher(`/venues/${venueId}/fields`)
}

export async function getVenueBookingRequests(venueId: number): Promise<Omit<Challenge,"venue">[]> {
    return baseFetcher(`/venues/${venueId}/booking_request`)
}


export async function acceptVenueBookingRequests(venueId: number, challenge_id: number, payload: AcceptBooking) {
    return baseFetcher(`/venues/${venueId}/booking_request/${challenge_id}/accept`,{
        method: "POST",
        body: JSON.stringify(payload)
    })
}

export async function rejectVenueBookingRequests(venueId: number, challenge_id: number) {
    return baseFetcher(`/venues/${venueId}/booking_request/${challenge_id}/reject`,{
        method: "PUT"
    })
}