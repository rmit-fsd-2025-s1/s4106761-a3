import { FormProvider } from "../context/FormContext";
import Form from "../components/Form";
import AppFooter from "../components/app/AppFooter";
import AppHeader from "../components/app/AppHeader";
import ResultDisplay from "../components/ResultDisplay";

export default function Home() {
  return (
    <FormProvider>

      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex flex-1">
          <aside className="w-1/4 bg-gray-100 p-4">Left Column</aside>
          <section className="flex-1 p-4">
            <Form />
            <ResultDisplay />
          </section>
          <aside className="w-1/4 bg-gray-100 p-4">Right Column</aside>
        </main>
        <footer className="bg-gray-200 text-center p-4">Footer</footer>
      </div>
      <AppFooter />
    </FormProvider>

  );
}