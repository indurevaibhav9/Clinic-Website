export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border bg-white p-6 text-center shadow-sm sm:p-10">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Access Denied
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          You don&apos;t have permission to access this page.
        </p>
      </section>
    </main>
  )
}
