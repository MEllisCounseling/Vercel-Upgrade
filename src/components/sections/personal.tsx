import Image from 'next/image';

export default function Personal() {
  return (
    <section className="relative isolate overflow-hidden bg-plum-ink text-white">
      <Image
        src="/images/bench-scene.jpg"
        alt="A wooden bench beneath trees overlooking open country"
        fill
        sizes="100vw"
        quality={70}
        loading="lazy"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-plum-ink/72" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, rgba(62,51,70,0.6) 0%, rgba(62,51,70,0.1) 60%, rgba(62,51,70,0.4) 100%)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-36">
        <div className="max-w-3xl">
          <p className="eyebrow text-sand">Personal Life</p>
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            Michael married Jennifer in 2003, and together they have raised five wonderful children,
            who now range in age from 11 to 19. Reflecting on his family&apos;s impact, Michael shares:
          </p>
          <blockquote className="mt-6">
            <p className="font-serif text-3xl font-medium leading-snug sm:text-4xl lg:text-[2.75rem]">
              &ldquo;My family and children take up the bulk of my time, and I am grateful for their
              support. They have given me invaluable experience that strengthens my ability to help
              others as a counselor.&rdquo;
            </p>
            <footer className="mt-8 flex items-center gap-4 text-sm text-white/80">
              <span className="h-px w-10 bg-sand" aria-hidden="true" />
              Michael Ellis, LCSW
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
