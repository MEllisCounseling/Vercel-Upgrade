// The site's "Background" paragraphs, verbatim, laid out along the years they cover.
const TIMELINE = [
  {
    when: '1981',
    body: 'Michael Ellis was born in Alexandria, VA, in 1981 and moved to Mentor, OH, a suburb of Cleveland, in 1985. He grew up in a loving home with his parents and two younger brothers.',
  },
  {
    when: 'Early years',
    body: 'From an early age, Michael was actively involved in his community. His church emphasized monthly service projects, allowing him to develop a deep appreciation for people of all backgrounds. Through these experiences, he cultivated a strong sense of compassion, recognizing the unique strengths and challenges of individuals regardless of gender, nationality, or identity. His innate desire to support and uplift others became a defining part of his character.',
  },
  {
    when: '2003',
    body: 'Michael continued to refine these qualities during his college years. He attended Baptist Bible College in Clarks Summit, PA, earning a Bachelor of Science in Bible in 2003. After graduation, he served as an Assistant Pastor in Front Royal, VA, from 2003 to 2005.',
  },
  {
    when: '2005',
    body: 'Seeking a new path, Michael transitioned into law enforcement, working as a Police Officer in Winchester, VA, from 2005 to 2007. However, he soon realized that his true calling lay elsewhere. In 2007, he joined the Winchester Department of Social Services as a Foster Care Worker, where he spent nine years helping vulnerable children and families. During this time, he pursued higher education, earning a Master of Social Work from West Virginia University in 2011.',
  },
  {
    when: '2016',
    body: 'Building on his experience, Michael shifted into a therapeutic role in 2016, working as a Therapeutic Day Treatment Counselor for the National Counseling Group (NCG). Over the next three years, he also served as an In-Home Counselor and Clinical Supervisor.',
  },
  {
    when: '2019',
    body: 'After completing the necessary supervision and obtaining his Licensed Clinical Social Worker (LCSW) title, Michael joined Exhale Behavioral Health in 2019. There, he worked as an Independent Therapist until 2025, helping individuals navigate life’s challenges with empathy and expertise.',
  },
];

export default function Story() {
  return (
    <section id="about" className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-caramel">About</p>
              <h2 className="mt-4 font-serif text-4xl font-medium text-plum-ink sm:text-5xl">
                More About <span className="italic">Michael Ellis, LCSW</span>
              </h2>
              <p className="mt-6 font-serif text-2xl text-ink-soft">Background</p>
            </div>
          </div>

          <ol className="relative lg:col-span-8">
            <div className="absolute bottom-3 left-[8.75rem] top-3 hidden w-px bg-sand sm:block" aria-hidden="true" />
            {TIMELINE.map(item => (
              <li key={item.when} className="relative grid gap-2 py-6 sm:grid-cols-[7.5rem_1fr] sm:gap-x-10 sm:py-7">
                <span className="whitespace-nowrap font-serif text-xl font-medium text-caramel sm:text-right sm:leading-7">
                  {item.when}
                </span>
                <div className="relative">
                  <span
                    className="absolute -left-[1.625rem] top-2 hidden h-3 w-3 rounded-full border-2 border-cream bg-plum sm:block"
                    aria-hidden="true"
                  />
                  <p className="leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
