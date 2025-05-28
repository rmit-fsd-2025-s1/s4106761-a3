export interface FormData {
    name: string;
    email: string;
    age: number;
    product: string;
    customPrice?: number;
    isPaid?: boolean;
}

export async function fetchPrice(formData: FormData): Promise<number> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (formData.product === "A") resolve(99.99);
            else if (formData.product === "B") resolve(149.99);
            else reject("Invalid product");
        }, 1500);
    });
}