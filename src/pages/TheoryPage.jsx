import { ArrowRight, Coins, Landmark, Layers, Scale } from 'lucide-react'
import { IMAGES, THEORY as T } from '../data/content'
import './TheoryPage.css'

function Section({ id, title, children }) {
  return (
    <section id={`phan-${id}`} aria-labelledby={`title-${id}`} className="theory-section">
      <header className="theory-section-heading">
        <span className="section-number" aria-hidden="true">{id}</span>
        <h2 id={`title-${id}`}>{title}</h2>
      </header>
      {children}
    </section>
  )
}

// Ảnh minh họa chỉ hiện khi đã khai báo ảnh thật trong src/data/content.js
function Photo({ name, className = '' }) {
  const d = IMAGES[name]
  if (!d) return null
  const caption = [d.caption, d.credit && `Ảnh: ${d.credit}`, d.license].filter(Boolean).join(' · ')
  return (
    <figure className={`theory-photo ${className}`}>
      <img className="theory-image" src={d.file} alt={d.alt ?? ''} loading="lazy" decoding="async" />
      {caption && (
        <figcaption>
          {caption}
          {d.source && (
            <>
              {' · '}
              <a href={d.source} target="_blank" rel="noreferrer">Nguồn</a>
            </>
          )}
        </figcaption>
      )}
    </figure>
  )
}

function Notes({ items }) {
  return (
    <details className="speaker-notes">
      <summary>Gợi ý nói</summary>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </details>
  )
}

const mixedIcons = [Landmark, Layers, Coins, Scale]

function goTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function TheoryPage() {
  const hasPhoto = Boolean(IMAGES['khoi-dau'])
  return (
    <article className="theory-page">
      <header className="theory-hero">
        <p className="theory-eyebrow">{T.eyebrow}</p>
        <h1>Quá độ lên CNXH<br /><span>ở Việt Nam</span></h1>
        <p className="theory-intro">{T.intro}</p>
        <nav className="theory-jump" aria-label="Chuyển nhanh giữa các phần">
          <button type="button" onClick={() => goTo('phan-01')}>01 · Bỏ qua chế độ tư bản chủ nghĩa</button>
          <button type="button" onClick={() => goTo('phan-02')}>02 · Đặc trưng và phương hướng</button>
          <button type="button" onClick={() => goTo('phan-03')}>03 · Tóm lại</button>
        </nav>
      </header>

      <Section id="01" title="Đặc điểm quá độ lên chủ nghĩa xã hội ở Việt Nam là bỏ qua chế độ tư bản chủ nghĩa">
        <div className={`role-feature${hasPhoto ? '' : ' no-photo'}`}>
          <Photo name="khoi-dau" />
          <figure className="unity-quote">
            <span className="quote-mark" aria-hidden="true">“</span>
            <blockquote>{T.lead}</blockquote>
            <figcaption>{T.leadCite}</figcaption>
          </figure>
        </div>

        <div className="role-columns">
          {T.kinds.map((col, i) => (
            <div key={col.title}>
              <h3><span className="small-number">{i + 1}.</span> {col.title}</h3>
              <ul className="editorial-bullets">{col.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          ))}
        </div>

        <aside className="unity-note">
          <p>Vì sao đây là lựa chọn duy nhất đúng?</p>
          <ul className="editorial-bullets">{T.choice.map((p) => <li key={p}>{p}</li>)}</ul>
        </aside>

        <h3 className="block-heading">Bỏ qua cái gì, giữ lại cái gì?</h3>
        <div className="compare-grid">
          {T.compare.map((c) => (
            <div key={c.head} className="compare-card">
              <strong>{c.head}</strong>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
        <p className="compare-note">{T.compareNote}</p>

        <h3 className="block-heading">Bốn nội dung của sự bỏ qua</h3>
        <ol className="principles-list">
          {T.four.map((item, index) => (
            <li key={item.title}>
              <span className="principle-number" aria-hidden="true">{index + 1}</span>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>

        <h3 className="block-heading">Cùng tồn tại, nhưng không thống trị</h3>
        <div className="mind-map" role="group" aria-label="Sơ đồ: các yếu tố cùng tồn tại trong thời kỳ quá độ">
          <div className="mind-map-center">
            <Layers size={28} aria-hidden="true" />
            <strong>Thời kỳ quá độ<br />ở Việt Nam</strong>
            <span>Nhiều thứ cùng tồn tại</span>
          </div>
          {T.mixed.map((item, index) => {
            const Icon = mixedIcons[index]
            return (
              <div className={`mind-node mind-node-${index + 1}`} key={item.label}>
                <div className="mind-node-title"><Icon size={24} aria-hidden="true" /><h3>{item.label}</h3></div>
                <strong className="condition-role">{item.role}</strong>
                <p>{item.body}</p>
              </div>
            )
          })}
        </div>
        <p className="mind-map-summary">{T.mixedSummary}</p>

        <aside className="example-box">
          <strong>Ví dụ</strong>
          <ul>{T.examples.map((e) => <li key={e}>{e}</li>)}</ul>
        </aside>
        <Notes items={T.notes.one} />
      </Section>

      <Section id="02" title="Những đặc trưng của chủ nghĩa xã hội và phương hướng xây dựng chủ nghĩa xã hội ở Việt Nam hiện nay">
        <p className="section-description">Nhận thức của Đảng về chủ nghĩa xã hội và con đường đi lên ngày càng sáng rõ qua các kỳ đại hội.</p>
        <div className="awareness-layout">
          <ol className="method-flow">
            {T.awareness.map((item) => (
              <li key={item.year}>
                <div className="method-marker year" aria-hidden="true">{item.year}</div>
                <div className="method-content">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className="method-result"><ArrowRight size={18} aria-hidden="true" /><strong>{item.result}</strong></div>
                </div>
              </li>
            ))}
          </ol>
          <Photo name="doi-moi" className="awareness-photo" />
        </div>

        <h3 className="block-heading">a) Những đặc trưng bản chất của chủ nghĩa xã hội ở Việt Nam</h3>
        <ul className="trait-grid">
          {T.traits.map(([title, body]) => (
            <li key={title}><strong>{title}</strong><p>{body}</p></li>
          ))}
        </ul>

        <h3 className="block-heading">b) Phương hướng xây dựng chủ nghĩa xã hội ở Việt Nam hiện nay</h3>
        <ol className="principles-list">
          {T.directions.map(([title, body], index) => (
            <li key={title}>
              <span className="principle-number" aria-hidden="true">{index + 1}</span>
              <h4>{title}</h4>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <p className="compare-note">{T.directionsNote}</p>

        <h3 className="block-heading">Tám mối quan hệ lớn cần giải quyết</h3>
        <ul className="relation-grid">{T.relations.map((r) => <li key={r}>{r}</li>)}</ul>

        <h3 className="block-heading">Mục tiêu của Đại hội XIII</h3>
        <ul className="goal-row">
          {T.goals.map(([year, body]) => (
            <li key={year}><span className="goal-year">{year}</span><p>{body}</p></li>
          ))}
        </ul>
        <h4 className="dir-heading">12 định hướng phát triển giai đoạn 2021–2030</h4>
        <ul className="dir-list">{T.goalDirections.map((d) => <li key={d}>{d}</li>)}</ul>
        <p className="compare-note">{T.goalsNote}</p>
        <Notes items={T.notes.two} />
      </Section>

      <Section id="03" title="Tóm lại">
        <div className="flow-conclusion">
          <span>Kết luận</span>
          <strong>{T.wrap.title}</strong>
          <p>{T.wrap.body}</p>
        </div>
      </Section>
    </article>
  )
}
