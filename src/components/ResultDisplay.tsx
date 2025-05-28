import { useFormContext } from "../context/FormContext";

export default function ResultDisplay() {
    const { result } = useFormContext();

    if (result === null) return null;

    return (
        <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded mt-4">
            ✅ The price is <strong>${result.toFixed(2)}</strong>
        </div>
    );
}
