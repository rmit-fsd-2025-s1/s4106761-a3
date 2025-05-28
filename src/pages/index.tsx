import { FormProvider } from "../context/FormContext";
import AppFooter from "../components/app/AppFooter";
import AppHeader from "../components/app/AppHeader";
import ResultDisplay from "../components/ResultDisplay";
import HomeLoanForm from "@/components/HomeLoanForm";

export default function Home() {
  return (
    <FormProvider>
      <div className="min-h-screen flex flex-col">
        <AppHeader />

        <main className="flex flex-col items-center p-4">
          <img
            src="bank.jpg"
            alt="ZZZ Bank"
            className="w-full max-w-sm mb-6 rounded shadow"
          />
          <HomeLoanForm />
          <ResultDisplay />
        </main>

      </div>
      <AppFooter />
    </FormProvider>
  );
}
