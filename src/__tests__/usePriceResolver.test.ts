import { resolvePrice } from "../hooks/usePriceResolver";
import { FormData } from "../lib/api";

jest.mock("../lib/api", () => ({
    fetchPrice: jest.fn().mockResolvedValue(149.99),
}));

describe("resolvePrice", () => {
    const baseData: Omit<FormData, "customPrice"> = {
        name: "Test",
        email: "test@example.com",
        age: 30,
        product: "B",
    };

    it("returns custom price if provided and valid", async () => {
        const formData: FormData = { ...baseData, customPrice: 200 };
        const result = await resolvePrice(formData);
        expect(result).toBe(200);
    });

    it("calls fetchPrice if custom price is missing", async () => {
        const formData: FormData = { ...baseData, customPrice: undefined };
        const result = await resolvePrice(formData);
        expect(result).toBe(149.99);
    });

    it("calls fetchPrice if custom price is 0", async () => {
        const formData: FormData = { ...baseData, customPrice: 0 };
        const result = await resolvePrice(formData);
        expect(result).toBe(149.99);
    });
});
