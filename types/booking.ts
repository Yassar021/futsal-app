import { ChallengeStatus } from "./challenge";
import { Field } from "./field";

export type BookingInfo = {
    id: number,
	venue_id: number,
	field_id: number,
	date_start: string,
	date_end: string,
	description: string,
	status: ChallengeStatus,
	by_name: string,
	by_phone: string,
    created_at: string,
	updated_at: string,
    field: Field
}