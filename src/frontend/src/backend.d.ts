import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    id: string;
    service: ServiceType;
    name: string;
    email: string;
    message: string;
    preferredDate: string;
    timestamp: Time;
    phone: string;
}
export type Time = bigint;
export enum ServiceType {
    ppf = "ppf",
    carAccessories = "carAccessories",
    polishing = "polishing",
    bikeWash = "bikeWash",
    carWashing = "carWashing",
    detailing = "detailing",
    wrapping = "wrapping",
    windowFilm = "windowFilm",
    ceramicCoating = "ceramicCoating"
}
export interface backendInterface {
    getAllBookings(): Promise<Array<Booking>>;
    getBookingById(id: string): Promise<Booking>;
    submitBooking(name: string, email: string, phone: string, service: ServiceType, preferredDate: string, message: string): Promise<string>;
}
