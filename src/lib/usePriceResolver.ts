export interface FormData {
    name: string;
    email: string;
    age: number;
    product: string;
    customPrice?: number;
    isPaid: boolean;
}

export async function resolvePrice(formData: FormData): Promise<number> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (formData.customPrice !== undefined && formData.customPrice > 0) {
                resolve(formData.customPrice);
            } else if (formData.product === "A") {
                resolve(99.99);
            } else if (formData.product === "B") {
                resolve(149.99);
            } else {
                reject("Invalid product or price");
            }
        }, 1000); // simulate network delay
    });
}
