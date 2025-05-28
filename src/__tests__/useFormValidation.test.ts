import { validateForm } from "../hooks/useFormValidation";
import { FormData } from "../lib/api";

describe("validateForm", () => {
    it("returns no errors for valid input", () => {
        const validData: FormData = {
            name: "Aaron",
            email: "aaron@example.com",
            age: 25,
            product: "A",
            customPrice: 100,
        };

        const result = validateForm(validData);
        expect(result).toEqual({});
    });

    it("detects all validation errors", () => {
        const invalidData: FormData = {
            name: "",
            email: "invalidemail",
            age: 0,
            product: "",
            customPrice: undefined,
        };

        const result = validateForm(invalidData);
        expect(result.name).toBe("Name is required");
        expect(result.email).toBe("Invalid email format");
        expect(result.age).toBe("Age must be greater than 0");
        expect(result.product).toBe("Product is required");
    });
});
