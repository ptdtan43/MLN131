import { Link } from 'react-router-dom'
import { MEMBERS, OUTLINE } from '../data/content'

const pad = (n) => String(n).padStart(2, '0')

function SectionLabel({ id, title, meta }) {
  return (
    <div className="flex flex-col gap-3 lg:col-span-4">
      <h2 id={id} className="font-serif text-4xl leading-[1.1] font-normal tracking-[-0.01em] text-balance lg:text-[56px]">
        {title}
      </h2>
      <span className="font-mono text-[13px] tracking-[0.08em] text-muted lg:text-base">{meta}</span>
    </div>
  )
}

function OverviewPage() {
  return (
    <>
      <section className="flex flex-col gap-12 pt-16 pb-20 sm:pt-24 lg:gap-14 lg:pt-28 lg:pb-26">
        <div className="flex flex-col gap-6">
          <span className="animate-fade-up font-mono text-[13px] tracking-[0.14em] text-accent lg:text-base">
            BÀI THUYẾT TRÌNH NHÓM
          </span>
          <h1 className="animate-fade-up animate-fade-up-delay-1 flex flex-col gap-3 font-serif font-normal lg:gap-4">
            <span className="text-[28px] leading-[1.2] text-ink-soft italic sm:text-4xl lg:text-[50px]">
              Chủ nghĩa xã hội khoa học
            </span>
            <span className="max-w-[1180px] text-[52px] leading-[1.04] tracking-[-0.025em] text-balance sm:text-[84px] lg:text-[128px]">
              Quá độ lên CNXH ở Việt Nam
            </span>
          </h1>
        </div>

        <div className="animate-fade-up animate-fade-up-delay-2 grid grid-cols-1 gap-8 border-t border-rule pt-8 lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <p className="max-w-[34em] text-lg leading-relaxed text-ink-soft lg:col-span-6 lg:text-2xl">
            Bỏ qua chế độ tư bản chủ nghĩa nhưng không bỏ qua thành tựu của nhân loại: vì sao đó là lựa chọn của nước ta,
            và chủ nghĩa xã hội Việt Nam được xây dựng theo những đặc trưng, phương hướng nào.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-6 lg:justify-end lg:gap-x-10">
            <Link
              to="/mo-dau"
              className="group inline-flex items-center gap-3 rounded-[2px] bg-ink px-6 py-4 font-medium text-paper transition-colors duration-200 hover:bg-accent active:translate-y-px lg:px-8 lg:py-5 lg:text-xl"
            >
              Chơi trò mở đầu
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              to="/ly-thuyet"
              className="border-b border-ink pb-0.5 font-medium transition-colors duration-200 hover:border-accent hover:text-accent lg:text-xl"
            >
              Xem lý thuyết
            </Link>
            <Link
              to="/game"
              className="border-b border-ink pb-0.5 font-medium transition-colors duration-200 hover:border-accent hover:text-accent lg:text-xl"
            >
              Chơi game ôn tập
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="noi-dung-title"
        className="grid grid-cols-1 gap-10 border-t border-ink pt-16 pb-20 lg:grid-cols-12 lg:gap-x-6 lg:pt-18 lg:pb-24"
      >
        <SectionLabel id="noi-dung-title" title="Nội dung thuyết trình" meta="04 PHẦN" />
        <ol className="flex flex-col border-t border-rule lg:col-span-8">
          {OUTLINE.map((item, index) => (
            <li key={item.to} className="border-b border-rule">
              <Link to={item.to} className="group flex items-baseline gap-6 py-6 sm:gap-10 sm:py-7 lg:py-8">
                <span className="w-12 shrink-0 font-serif text-4xl leading-none text-accent tabular-nums sm:w-[72px] sm:text-[56px] lg:w-20 lg:text-[68px]">
                  {pad(index + 1)}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-xl leading-snug font-medium text-balance transition-colors duration-200 group-hover:text-accent sm:text-[26px] sm:leading-[1.4] lg:text-[32px]">
                    {item.title}
                  </span>
                  <span className="text-base leading-relaxed text-muted lg:text-xl">{item.body}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {MEMBERS.length > 0 && (
        <section
          aria-labelledby="nhom-title"
          className="grid grid-cols-1 gap-10 border-t border-ink pt-16 lg:grid-cols-12 lg:gap-x-6 lg:pt-18"
        >
          <SectionLabel id="nhom-title" title="Nhóm thực hiện" meta={`${pad(MEMBERS.length)} THÀNH VIÊN`} />
          <ul className="flex flex-col border-t border-rule lg:col-span-8">
            {MEMBERS.map((member) => (
              <li key={member.studentId} className="flex items-baseline justify-between gap-4 border-b border-rule py-5 lg:py-6">
                <span className="text-lg font-medium sm:text-xl lg:text-[28px]">{member.name}</span>
                <span className="font-mono text-sm text-muted tabular-nums lg:text-xl">{member.studentId}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

export default OverviewPage
