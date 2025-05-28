import { FormData } from "../lib/api";

export function validateForm(formData: FormData): Partial<Record<keyof FormData, string>> {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email format";
    if (formData.age <= 0) newErrors.age = "Age must be greater than 0";
    if (!formData.product.trim()) newErrors.product = "Product is required";

    return newErrors;
}
