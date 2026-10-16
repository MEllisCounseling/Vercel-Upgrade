const PROMISES = [
  {
    title: 'Cared for, heard, and valued',
    body: 'That is the standard for every session. If you leave without feeling that way, Michael wants to know, because something has gone wrong and his priority is to get it right for you.',
  },
  {
    title: 'Honest about fit',
    body: 'If Michael is not the best fit for what you need, he will gladly connect you with a trusted therapist in his network who can better meet your needs.',
  },
  {
    title: 'Start with a conversation',
    body: 'A complimentary 15-minute consultation to meet Michael, talk through your goals, and see whether his approach aligns with your needs. No commitment required.',
  },
];

export default function Promise() {
  return (
    <section className="bg-parchment grain">
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <p className="eyebrow text-caramel">What you can expect</p>
            <h2 className="mt-4 font-serif text-4xl font-medium text-plum-ink sm:text-5xl">
              Therapy that is <span className="italic">about you</span>, from the first minute.
            </h2>
          </div>
          <ol className="lg:col-span-8 grid gap-px overflow-hidden rounded-2xl bg-sand/70 sm:grid-cols-3">
            {PROMISES.map((item, index) => (
              <li key={item.title} className="flex flex-col bg-cream p-7">
                <span className="font-serif text-4xl text-sand">0{index + 1}</span>
                <h3 className="mt-5 font-serif text-2xl font-medium text-plum-ink">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
