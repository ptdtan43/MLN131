import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Tổng quan', end: true },
  { to: '/mo-dau', label: 'Mở đầu' },
  { to: '/ly-thuyet', label: 'Lý thuyết' },
  { to: '/game', label: 'Game' },
  { to: '/hoi-dap', label: 'Hỏi đáp' },
]

function Header() {
  return (
    <header className="sticky z-40 bg-paper/95 backdrop-blur-sm" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-10 lg:px-24">
        <div className="flex h-[80px] w-full items-center justify-between gap-4 border-b border-ink sm:gap-6">
          <Link to="/" className="flex shrink-0 items-baseline gap-3">
            <span className="font-mono text-[13px] font-medium tracking-[0.14em] text-ink lg:text-base">MLN131</span>
            <span className="hidden text-sm text-muted sm:inline lg:text-lg">Nhóm 1</span>
          </Link>

          <nav aria-label="Điều hướng chính" className="flex gap-4 overflow-x-auto sm:gap-8 lg:gap-10">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `whitespace-nowrap border-b-2 pb-1 text-sm font-medium transition-colors duration-200 sm:text-base lg:text-xl ${
                    isActive ? 'border-accent text-ink' : 'border-transparent text-muted hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <span className="hidden shrink-0 font-mono text-xs tracking-[0.08em] text-muted xl:block xl:text-sm">
            CHƯƠNG 3 · MỤC III
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
