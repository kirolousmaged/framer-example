import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-off-white px-6">
      <div className="text-center flex flex-col items-center gap-8">
        <p className="font-raleway text-sm uppercase tracking-widest text-accent">404</p>
        <h1 className="font-italiana text-6xl md:text-7xl text-off-black">Page Not Found</h1>
        <p className="font-raleway text-lg text-off-black/60 max-w-md leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button label="Back to Home" href="/" variant="filled" colorScheme="accent" />
      </div>
    </section>
  )
}
