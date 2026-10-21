import { QA, SOURCE } from '../data/content'

function QABlock({ block }) {
  return (
    <section className="grid grid-cols-1 gap-8 border-t border-ink pt-12 pb-4 lg:grid-cols-12 lg:gap-x-6 lg:pt-14">
      <h2 className="font-serif text-3xl leading-[1.15] font-normal tracking-[-0.01em] text-balance lg:col-span-4 lg:text-[44px]">
        {block.title}
      </h2>
      <div className="flex flex-col gap-6 lg:col-span-8 lg:columns-2 lg:gap-x-12 lg:block lg:[column-gap:3rem]">
        {block.items.map(([question, answer]) => (
          <div key={question} className="text-lg leading-[1.7] text-ink-soft lg:mb-7 lg:break-inside-avoid lg:text-xl">
            <p className="font-semibold text-ink">{question}</p>
            {Array.isArray(answer) ? (
              <ul className="mt-2 list-disc space-y-1.5 pl-6 marker:text-accent">
                {answer.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1">{answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function QAPage() {
  return (
    <div className="pb-12">
      <header className="animate-fade-up flex flex-col gap-5 pt-16 pb-14 sm:pt-20 lg:pt-24">
        <span className="font-mono text-[13px] tracking-[0.14em] text-accent lg:text-base">HỎI ĐÁP</span>
        <h1 className="font-serif text-5xl leading-[1.05] font-normal tracking-[-0.02em] sm:text-7xl lg:text-[96px]">Câu hỏi và trả lời</h1>
        <p className="max-w-[34em] text-lg leading-relaxed text-ink-soft lg:text-2xl">
          Từng thành viên trả lời bằng cách hiểu của mình, không đọc. Ý trả lời dưới đây chỉ để nhắc bài.
        </p>
      </header>
      <QABlock block={QA.exam} />
      <QABlock block={QA.more} />
      <p className="mt-10 text-base text-muted lg:text-lg">{SOURCE}</p>
    </div>
  )
}
