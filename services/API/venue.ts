import { API_BASE_URL } from "../../config";
import { BookingInfo } from "../../types/booking";
import { BookingRequest, Challenge } from "../../types/challenge";
import { AcceptBooking, BookingSubmit, PaginationRequest, RegisterVenueRequest } from "../../types/request";
import { PaginatedResponse, ValidationError } from "../../types/response";
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


export async function getVenueBookingList(venueId: number, request: PaginationRequest): Promise<PaginatedResponse<BookingRequest>> {
    const { page = 1, size = 10 } = request
    return baseFetcher(`/venues/${venueId}/booking_list?page=${page}&size=${size}`);
}


export async function getBookingInfo(booking_id: number): Promise<BookingInfo> {
    return baseFetcher(`/bookings/${booking_id}`);
}

export async function addBooking(payload: BookingSubmit): Promise<BookingInfo> {
    return baseFetcher(`/bookings`,{
        method: "POST",
        body: JSON.stringify(payload)
    });
}

export async function updateBooking(booking_id: number, payload: BookingSubmit): Promise<any> {
    return baseFetcher(`/bookings/${booking_id}`,{
        method: "PUT",
        body: JSON.stringify(payload)
    });
}

export async function deleteBooking(booking_id: number): Promise<any> {
    return baseFetcher(`/bookings/${booking_id}`,{
        method: "DELETE"
    });
}

export async function registerVenue(payload: RegisterVenueRequest): Promise<any | ValidationError> {    
    const form = new FormData();
    
    for (const field_name in payload) {
        if (field_name === "profile_picture") {
            continue;
        }
        form.append(field_name, payload[field_name])
    }

    form.append("profile_picture",payload.profile_picture);



    return fetch(`${API_BASE_URL}/auth/venue/register`, {
        method: "POST",
        body: form,
        headers: {
            "accept": "application/json"
        }
    }).then(res => res.json())
}

export async function updateVenue(payload: Partial<VenueInfo | {profil_picture: string | File}>): Promise<any | ValidationError> {
    const form = new FormData();
    
    for (const field_name in payload) {
        form.append(field_name, payload[field_name])
    }

    return baseFetcher(`/me/venue`, {
        method: "POST",
        body: form,
    })
}