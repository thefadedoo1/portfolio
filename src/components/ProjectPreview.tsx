import {
  Building2,
  CalendarDays,
  Check,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Video,
} from 'lucide-react';
export default function ProjectPreview({ id, hero = false }: { id: string; hero?: boolean }) {
  return (
    <div
      className={`preview-shell preview-${id} ${hero ? 'hero-preview' : ''}`}
      aria-label={`${id === 'edistrict' ? 'Smart eDistrict' : id} illustrative interface preview`}
      role="img"
    >
      <div className="preview-top">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>
          {id === 'edistrict'
            ? 'Smart eDistrict'
            : id === 'consultify'
              ? 'Consultify'
              : id === 'bizzfinder'
                ? 'BizzFinder'
                : 'RMS'}{' '}
          <span className="preview-top-light">/ workspace</span>
        </span>
        <span className="preview-avatar">NK</span>
      </div>
      <div className="preview-body">
        <aside className="preview-sidebar">
          <div className="preview-app-icon">
            {id === 'edistrict' ? (
              <Building2 size={19} />
            ) : id === 'consultify' ? (
              <Video size={19} />
            ) : id === 'bizzfinder' ? (
              <Search size={19} />
            ) : (
              <GraduationCap size={19} />
            )}
          </div>
          <LayoutDashboard size={15} />
          <FileText size={15} />
          <CalendarDays size={15} />
          <div className="sidebar-bottom">
            <ShieldCheck size={15} />
          </div>
        </aside>
        <div className="preview-content">
          {id === 'edistrict' ? (
            <>
              <div className="preview-kicker">CITIZEN WORKSPACE</div>
              <span className="preview-heading">Public services. Simplified.</span>
              <p>Your applications, all in one place.</p>
              <div className="preview-stat-row">
                <div>
                  <FileText size={15} />
                  <span>Applications</span>
                  <strong>Track & manage</strong>
                </div>
                <div>
                  <ShieldCheck size={15} />
                  <span>Secure access</span>
                  <strong>Role-based</strong>
                </div>
              </div>
              <div className="preview-table-title">
                Service applications <span>Overview</span>
              </div>
              {['Submit an application', 'Track its progress', 'Access your documents'].map(
                (x, i) => (
                  <div className="preview-row" key={x}>
                    <div className="row-icon">
                      <FileText size={13} />
                    </div>
                    <span>{x}</span>
                    <span className={`mini-status s${i}`}>{['Apply', 'Track', 'View'][i]}</span>
                  </div>
                ),
              )}
            </>
          ) : id === 'consultify' ? (
            <>
              <div className="preview-kicker">YOUR NEXT CONVERSATION</div>
              <span className="preview-heading">Expertise, within reach.</span>
              <p>Find the right expert. Make time for progress.</p>
              <div className="consult-expert">
                <div className="expert-avatar">
                  <Video size={24} />
                </div>
                <div>
                  <strong>Expert consultation</strong>
                  <span>
                    <ShieldCheck size={12} /> Verified expertise
                  </span>
                </div>
              </div>
              <div className="preview-table-title">
                Choose a session <CalendarDays size={14} />
              </div>
              <div className="calendar-strip">
                {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((d, i) => (
                  <div key={d} className={i === 2 ? 'chosen' : ''}>
                    <span>{d}</span>
                    <b>{12 + i}</b>
                  </div>
                ))}
              </div>
              <div className="preview-cta">
                <Video size={14} /> Video consultation with Jitsi
              </div>
            </>
          ) : id === 'bizzfinder' ? (
            <>
              <div className="preview-kicker">EXPLORE YOUR NEIGHBOURHOOD</div>
              <span className="preview-heading">Great businesses. Closer.</span>
              <div className="mock-search">
                <Search size={14} /> Search local businesses
              </div>
              <div className="business-categories">
                {['Food & cafés', 'Services', 'Shopping'].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {['Discover by category', 'Read community reviews', 'Manage your business'].map(
                (t) => (
                  <div className="preview-row" key={t}>
                    <Building2 size={16} />
                    <span>{t}</span>
                  </div>
                ),
              )}
            </>
          ) : (
            <>
              <div className="preview-kicker">STUDENT RECORDS</div>
              <span className="preview-heading">Less paperwork. More clarity.</span>
              <p>A focused workspace for academic results.</p>
              <div className="result-columns">
                <span>Student</span>
                <span>Record</span>
                <span>Status</span>
              </div>
              {['Student A', 'Student B', 'Student C'].map((t) => (
                <div className="preview-row" key={t}>
                  <GraduationCap size={15} />
                  <span>{t}</span>
                  <span className="mini-status">
                    <Check size={12} /> Saved
                  </span>
                </div>
              ))}
              <div className="preview-cta">Create · Read · Update · Delete</div>
            </>
          )}
        </div>
      </div>
      <div className="preview-caption">
        ILLUSTRATIVE INTERFACE · {hero ? 'FULL-STACK ENGINEERING' : 'PROJECT CONCEPT'}
      </div>
    </div>
  );
}
