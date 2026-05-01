'use client'

import { FOOTER } from '@/lib/constants'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-emerald-950 w-full rounded-t-3xl mt-20" role="contentinfo">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-12 py-24">
        {/* Brand */}
        <section aria-labelledby="footer-brand" className="space-y-6">
          <h2 id="footer-brand" className="text-2xl font-headline font-black text-emerald-50">
            {FOOTER.brand}
          </h2>
          <p className="text-emerald-50/70 text-sm tracking-wide leading-relaxed">
            {FOOTER.description}
          </p>
          <ul aria-label="Social media" className="flex gap-3 list-none m-0 p-0">
            {[
              { name: 'instagram', label: 'Instagram', icon: 'photo_camera' },
              { name: 'linkedin',  label: 'LinkedIn',  icon: 'business_center' },
              { name: 'twitter',   label: 'Twitter',   icon: 'rss_feed' },
            ].map((social) => (
              <li key={social.name}>
                <a
                  href="#"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-emerald-50/20 flex items-center justify-center text-emerald-50/50 hover:text-emerald-50 hover:border-emerald-50/50 transition-all duration-300"
                  aria-label={`${FOOTER.brand} on ${social.label}`}
                >
                  <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '16px' }}>
                    {social.icon}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Explore */}
        <nav aria-labelledby="footer-explore" className="space-y-6">
          <h2 id="footer-explore" className="text-emerald-50 font-bold uppercase tracking-widest text-xs">
            Explore
          </h2>
          <ul className="space-y-4 list-none m-0 p-0">
            {FOOTER.exploreLinks.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-emerald-50/70 hover:text-emerald-50 transition-all duration-200 hover:translate-x-1 inline-block text-sm"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect */}
        <nav aria-labelledby="footer-connect" className="space-y-6">
          <h2 id="footer-connect" className="text-emerald-50 font-bold uppercase tracking-widest text-xs">
            Connect
          </h2>
          <ul className="space-y-4 list-none m-0 p-0">
            {FOOTER.connectLinks.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-emerald-50/70 hover:text-emerald-50 transition-all duration-200 hover:translate-x-1 inline-block text-sm"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Location */}
        <section aria-labelledby="footer-location" className="space-y-6">
          <h2 id="footer-location" className="text-emerald-50 font-bold uppercase tracking-widest text-xs">
            Atelier Location
          </h2>
          <address className="text-emerald-50/70 text-sm leading-relaxed not-italic">
            {FOOTER.location.map((line, i) => (
              <span key={i}>
                {line}
                {i < FOOTER.location.length - 1 && <br />}
              </span>
            ))}
            <br />
            <a
              href={`mailto:${FOOTER.email}`}
              className="text-emerald-50/70 hover:text-emerald-50 transition-colors mt-2 inline-block"
            >
              {FOOTER.email}
            </a>
          </address>
        </section>
      </div>

      {/* Bottom bar */}
      <div className="px-12 py-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-emerald-50/50">
        <small>{FOOTER.copyright}</small>
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex items-center gap-2 hover:text-white transition-colors duration-200"
        >
          {FOOTER.backToTop}
          <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '14px' }}>
            arrow_upward
          </span>
        </button>
      </div>
    </footer>
  )
}
