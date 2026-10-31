import { axiosInstance } from "../../../../lib/axiosInstance";
import type { InquiryData } from "../types";

export async function handleForm(payload:InquiryData) {
    try {
        console.log(payload)
        const {data} = await axiosInstance.post("/inquiries/submit", {payload})
        return data
        
    } catch (error) {
        
    }
}