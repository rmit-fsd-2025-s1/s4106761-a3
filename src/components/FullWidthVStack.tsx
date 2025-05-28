import { ReactNode } from "react";

export default function FullWidthVStack({ children }: { children: ReactNode }) {
    return <div className="space-y-4 w-full">{children}</div>;
}