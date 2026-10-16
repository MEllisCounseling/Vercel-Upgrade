const TIMELINE = [
  {
    when: '1981',
    title: 'Alexandria, then Mentor',
    body: 'Born in Alexandria, Virginia. In 1985 the family moved to Mentor, Ohio, a suburb of Cleveland, where Michael grew up in a loving home with his parents and two younger brothers.',
  },
  {
    when: 'Growing up',
    title: 'Service as a habit',
    body: 'His church emphasized monthly service projects. Through them he developed a deep appreciation for people of all backgrounds and a strong sense of compassion for the unique strengths and challenges of individuals regardless of gender, nationality, or identity.',
  },
  {
    when: '2003',
    title: 'Bachelor of Science in Bible',
    body: 'Baptist Bible College, Clarks Summit, Pennsylvania. After graduation he served as an Assistant Pastor in Front Royal, Virginia, from 2003 to 2005.',
  },
  {
    when: '2005 to 2007',
    title: 'Police Officer, Winchester',
    body: 'Seeking a new path, Michael transitioned into law enforcement in Winchester, Virginia, and soon realized his true calling lay elsewhere.',
  },
  {
    when: '2007 to 2016',
    title: 'Nine years in foster care',
    body: 'As a Foster Care Worker with the Winchester Department of Social Services, he spent nine years helping vulnerable children and families. Along the way he earned a Master of Social Work from West Virginia University in 2011.',
  },
  {
    when: '2016 to 2019',
    title: 'Into therapy',
    body: 'Therapeutic Day Treatment Counselor for the National Counseling Group, and over the next three years also In-Home Counselor and Clinical Supervisor.',
  },
  {
    when: '2019 to 2025',
    title: 'Licensed Clinical Social Worker',
    body: 'After completing the required supervision and obtaining his LCSW, Michael joined Exhale Behavioral Health as an Independent Therapist, helping individuals navigate life’s challenges with empathy and expertise.',
  },
  {
    when: '2025',
    title: 'Winchester Therapy Services',
    body: 'A practice of his own on Amherst Street, built around the conviction that every person should leave a session feeling cared for, heard, and valued.',
  },
];

export default function Story() {
  return (
    <section id="about" className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-caramel">More about Michael</p>
              <h2 className="mt-4 font-serif text-4xl font-medium text-plum-ink sm:text-5xl">
                A long road to this <span className="italic">office</span>.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                Pastor, police officer, foster care worker, counselor. Each chapter taught Michael
                something about people, and about staying with them through hard seasons.
              </p>
            </div>
          </div>

          <ol className="relative lg:col-span-8">
            <div className="absolute bottom-3 left-[8.75rem] top-3 hidden w-px bg-sand sm:block" aria-hidden="true" />
            {TIMELINE.map(item => (
              <li key={item.title} className="relative grid gap-2 py-6 sm:grid-cols-[7.5rem_1fr] sm:gap-x-10 sm:py-7">
                <span className="whitespace-nowrap font-serif text-xl font-medium text-caramel sm:text-right sm:leading-7">
                  {item.when}
                </span>
                <div className="relative">
                  <span
                    className="absolute -left-[1.625rem] top-2 hidden h-3 w-3 rounded-full border-2 border-cream bg-plum sm:block"
                    aria-hidden="true"
                  />
                  <h3 className="font-serif text-2xl font-medium text-plum-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
