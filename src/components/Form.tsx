import { useEffect, useState, FormEvent } from "react";
import { useFormContext } from "../context/FormContext";
import { resolvePrice, FormData } from "../lib/usePriceResolver";
import FullWidthButton from "./FullWidthButton";
import FullWidthVStack from "./FullWidthVStack";

const STORAGE_KEY = "assignment3_formData";
const SUBMISSIONS_KEY = "assignment3_submissions";

export default function Form() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        age: 0,
        product: "",
        customPrice: undefined,
        isPaid: false,
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const [submissions, setSubmissions] = useState<FormData[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const { setResult } = useFormContext();

    useEffect(() => {
        const storedForm = localStorage.getItem(STORAGE_KEY);
        if (storedForm) setFormData(JSON.parse(storedForm));

        const storedSubmissions = localStorage.getItem(SUBMISSIONS_KEY);
        if (storedSubmissions) setSubmissions(JSON.parse(storedSubmissions));
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }, [formData]);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.includes("@")) newErrors.email = "Invalid email format";
        if (formData.age <= 0) newErrors.age = "Age must be greater than 0";
        if (!formData.product.trim()) newErrors.product = "Product is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value, type } = target;
        setFormData((prev: FormData) => ({
            ...prev,
            [name]: type === "checkbox"
                ? (target as HTMLInputElement).checked
                : name === "age" || name === "customPrice"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const price = await resolvePrice(formData);
            setResult(price);
            const updatedSubmissions = [formData, ...submissions];
            setSubmissions(updatedSubmissions);
            localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updatedSubmissions));
            setFormData({
                name: "",
                email: "",
                age: 0,
                product: "",
                customPrice: undefined,
                isPaid: false,
            });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            setApiError("");
        } catch {
            setApiError("Failed to fetch price. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const togglePaid = (index: number) => {
        const updated = [...submissions];
        updated[index] = {
            ...updated[index],
            isPaid: !updated[index].isPaid,
        };
        setSubmissions(updated);
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    };

    const removeSubmission = (indexToRemove: number) => {
        const updated = submissions.filter((_, index) => index !== indexToRemove);
        setSubmissions(updated);
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    };

    return (
        <>
            {showSuccess && (
                <div className="p-2 bg-green-100 border border-green-400 text-green-700 rounded mb-4">
                    ✅ Submission saved!
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <FullWidthVStack>
                    <div>
                        <label>Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border p-2"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-2"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label>Age</label>
                        <input
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full border p-2"
                        />
                        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                    </div>

                    <div>
                        <label>Product</label>
                        <select
                            name="product"
                            value={formData.product}
                            onChange={handleChange}
                            className="w-full border p-2"
                        >
                            <option value="">Select one</option>
                            <option value="A">Product A</option>
                            <option value="B">Product B</option>
                        </select>
                        {errors.product && <p className="text-red-500 text-sm">{errors.product}</p>}
                    </div>

                    <div>
                        <label>
                            Custom Price <span className="text-gray-500 text-sm">(optional)</span>
                        </label>
                        <input
                            name="customPrice"
                            type="number"
                            value={formData.customPrice ?? ""}
                            onChange={handleChange}
                            className="w-full border p-2"
                        />
                    </div>

                    {loading ? (
                        <p className="text-blue-500">Calculating...</p>
                    ) : (
                        <FullWidthButton type="submit">Submit</FullWidthButton>
                    )}

                    {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
                </FullWidthVStack>
            </form>

            {submissions.length > 0 && (
                <div className="mt-6 space-y-4">
                    <h2 className="text-xl font-bold">Submitted Entries</h2>
                    {submissions.map((entry, index) => (
                        <div
                            key={index}
                            className="border rounded-md p-4 mb-4 shadow-sm space-y-2"
                        >
                            <div className="space-y-1">
                                <p><strong>Name:</strong> {entry.name}</p>
                                <p><strong>Email:</strong> {entry.email}</p>
                                <p><strong>Age:</strong> {entry.age}</p>
                                <p><strong>Product:</strong> {entry.product}</p>
                                {entry.customPrice !== undefined && (
                                    <p><strong>Custom Price:</strong> ${entry.customPrice.toFixed(2)}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-4 pt-2">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={entry.isPaid}
                                        onChange={() => togglePaid(index)}
                                        className="w-4 h-4"
                                    />
                                    <span>Paid?</span>
                                </label>
                                <button
                                    onClick={() => removeSubmission(index)}
                                    className="text-red-600 underline hover:text-red-800"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
