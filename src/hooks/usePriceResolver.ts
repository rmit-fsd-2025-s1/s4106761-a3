import { FormData } from "../lib/api";
import { fetchPrice } from "../lib/api";


export async function resolvePrice(formData: FormData): Promise<number> {
    if (formData.customPrice !== undefined && formData.customPrice !== null && formData.customPrice > 0) {
        return formData.customPrice;
    }
    return await fetchPrice(formData);
}
