export const NotFoundPage = () => {
  return (
    <div className="flex px-4 min-h-screen w-full bg-background font-sans font-semibold text-primary-700 text-2xl">
    <div
      className="mx-auto mt-32 p-6 border-1 border-primary rounded-3xl h-fit">
        No such request was found...
        <br />
        The link might be expired or forged.
    </div>
  </div>
  )
}