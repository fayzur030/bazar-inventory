export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q?.trim()

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight text-[#1F2937] dark:text-gray-100">
        Products
      </h1>
      {query ? (
        <p className="text-sm text-[#6B7280] dark:text-gray-400">
          Showing results for &ldquo;{query}&rdquo;. Product listing coming
          soon.
        </p>
      ) : (
        <p className="text-sm text-[#6B7280] dark:text-gray-400">
          Manage your product catalog here.
        </p>
      )}
    </div>
  )
}
