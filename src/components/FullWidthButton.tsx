export default function FullWidthButton({
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
            {children}
        </button>
    );
}