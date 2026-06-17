import { useApp } from '../context/AppContext.jsx';
import { FREE_DAYS } from '../data/content.js';
import { LangToggle, MuteToggle } from '../components/ui.jsx';

const WORLD_BANDS = [
  { from: 1,  to: 18, label: 'Islam World',   icon: '🕌', skyA: '#0284c7', skyB: '#38bdf8', grassA: '#15803d', grassB: '#4ade80' },
  { from: 19, to: 36, label: 'Tech World',     icon: '💻', skyA: '#4338ca', skyB: '#818cf8', grassA: '#0e7490', grassB: '#67e8f9' },
  { from: 37, to: 54, label: 'Science World',  icon: '🔬', skyA: '#7e22ce', skyB: '#c084fc', grassA: '#6d28d9', grassB: '#d8b4fe' },
  { from: 55, to: 72, label: 'Life Skills',    icon: '🌍', skyA: '#c2410c', skyB: '#fb923c', grassA: '#92400e', grassB: '#fcd34d' },
  { from: 73, to: 90, label: 'Master World',   icon: '🌟', skyA: '#1e1b4b', skyB: '#6366f1', grassA: '#7e22ce', grassB: '#c084fc' },
];

function bandFor(dayNo) {
  return WORLD_BANDS.find(b => dayNo >= b.from && dayNo <= b.to) || WORLD_BANDS[0];
}

const WORLD_STARTS = new Set([1, 19, 37, 55, 73]);

export default function DayMap({ onOpenDay, onPaymentRequired, onSettings, onBack }) {
  const { t, lang, state, currentProfile, progressFor, isDayAvailable, payment, days, daysLoaded } = useApp();
  const pr = progressFor(currentProfile.id);

  const getDayState = (dayNo) => {
    if (pr.completedDays.includes(dayNo)) return 'done';
    if (dayNo > FREE_DAYS && payment?.status !== 'paid') return 'pay';
    if (!isDayAvailable(currentProfile.id, dayNo)) return 'locked';
    return 'today';
  };

  const handleTap = (dayNo, s) => {
    if (s === 'done' || s === 'today') { onOpenDay(dayNo); return; }
    if (s === 'pay') { onPaymentRequired(); return; }
  };

  const latestDay  = Math.max(1, ...(pr.completedDays.length ? pr.completedDays : [1]));
  const mainBand   = bandFor(latestDay);

  return (
    /* Escape app-shell padding so background is truly full-bleed */
    <div style={{
      margin: '-18px -18px -40px',
      minHeight: '100vh',
      background: `linear-gradient(180deg,
        ${mainBand.skyA} 0%,
        ${mainBand.skyB} 30%,
        #a7f3d0 58%,
        ${mainBand.grassA} 78%,
        ${mainBand.grassB} 100%)`,
      position: 'relative',
      overflowX: 'hidden',
    }}>

      {/* ── Static cloud shapes ───────────────────────────────── */}
      {[
        { t:'5%',  l:'4%',  w:100, h:38 },
        { t:'4%',  l:'55%', w:120, h:44 },
        { t:'15%', l:'25%', w: 75, h:30 },
        { t:'26%', l:'62%', w: 85, h:33 },
        { t:'40%', l:'8%',  w: 60, h:24 },
      ].map((c, i) => (
        <div key={i} style={{
          position:'absolute', top:c.t, left:c.l,
          width:c.w, height:c.h, borderRadius:99,
          background:'rgba(255,255,255,0.55)',
          filter:'blur(6px)', pointerEvents:'none',
        }} />
      ))}

      {/* ── Sticky top bar ────────────────────────────────────── */}
      <div style={{
        position:'sticky', top:0, zIndex:50,
        background:'rgba(0,0,0,0.45)',
        backdropFilter:'blur(14px)',
        borderBottom:'1.5px solid rgba(255,255,255,0.15)',
        padding:'10px 14px',
        display:'flex', alignItems:'center', gap:10,
      }}>
        {/* Back */}
        <button onClick={onBack} style={{
          background:'rgba(255,255,255,0.18)', border:'1.5px solid rgba(255,255,255,0.35)',
          borderRadius:60, color:'#fff', padding:'8px 14px',
          cursor:'pointer', fontFamily:'inherit', fontWeight:800, fontSize:'0.82rem', flexShrink:0,
        }}>
          ← Profiles
        </button>

        {/* Child info */}
        <div style={{ display:'flex', alignItems:'center', gap:8, flex:1, minWidth:0 }}>
          <span style={{ fontSize:'1.7rem', flexShrink:0 }}>{currentProfile.avatar}</span>
          <div style={{ minWidth:0 }}>
            <div style={{ color:'#fff', fontWeight:900, fontSize:'0.95rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
              {currentProfile.name}
            </div>
            <div style={{ color:'rgba(255,255,255,0.65)', fontSize:'0.68rem', fontWeight:700 }}>
              {mainBand.icon} {mainBand.label}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
          <div style={{ background:'#fbbf24', borderRadius:60, padding:'5px 10px', display:'flex', alignItems:'center', gap:3 }}>
            <span style={{ fontSize:'0.85rem' }}>⭐</span>
            <span style={{ color:'#000', fontWeight:900, fontSize:'0.82rem' }}>{pr.stars}</span>
          </div>
          <div style={{ background:'rgba(255,255,255,0.18)', borderRadius:60, padding:'5px 10px', display:'flex', alignItems:'center', gap:3 }}>
            <span style={{ fontSize:'0.85rem' }}>🏅</span>
            <span style={{ color:'#fff', fontWeight:900, fontSize:'0.82rem' }}>{pr.badges}</span>
          </div>
          {onSettings && (
            <button onClick={onSettings} style={{
              background:'rgba(255,255,255,0.18)', border:'none',
              borderRadius:60, padding:'6px 9px', cursor:'pointer', fontSize:'0.95rem',
            }}>⚙️</button>
          )}
          <MuteToggle />
          <LangToggle />
        </div>
      </div>

      {/* ── Free-trial-ended banner ───────────────────────────── */}
      {payment?.status !== 'paid' && pr.completedDays.length >= FREE_DAYS && (
        <div style={{
          margin:'12px 14px 0',
          background:'linear-gradient(135deg,#fbbf24,#f97316)',
          borderRadius:18, padding:'14px 18px', textAlign:'center',
          boxShadow:'0 4px 20px rgba(0,0,0,0.35)',
        }}>
          <div style={{ fontWeight:900, fontSize:'0.97rem', color:'#000' }}>
            🌟 Free trial complete — unlock all 90 days!
          </div>
          <button onClick={onPaymentRequired} style={{
            marginTop:10, background:'#000', color:'#fbbf24',
            border:'none', borderRadius:60, padding:'10px 22px',
            fontWeight:900, fontSize:'0.9rem', cursor:'pointer', fontFamily:'inherit',
          }}>
            💳 Unlock Now — Rs. 1,000
          </button>
        </div>
      )}

      {/* ── Loading ───────────────────────────────────────────── */}
      {!daysLoaded && (
        <div style={{ textAlign:'center', padding:'60px 20px' }}>
          <div style={{ fontSize:'3rem', animation:'bob 1s ease-in-out infinite' }}>⏳</div>
          <p style={{ color:'#fff', fontWeight:800, marginTop:12 }}>Loading adventure…</p>
        </div>
      )}

      {/* ── Day path ──────────────────────────────────────────── */}
      <div style={{ padding:'20px 14px 80px' }}>
        {days.map((d, i) => {
          const dayNo    = d.dayNumber ?? i + 1;
          const s        = getDayState(dayNo);
          const isLeft   = i % 2 === 0;
          const isDone   = s === 'done';
          const isToday  = s === 'today';
          const isPay    = s === 'pay';
          const isLocked = s === 'locked';

          // Circle colours
          const circleBg =
            isDone   ? 'linear-gradient(135deg,#22c55e,#16a34a)' :
            isToday  ? 'linear-gradient(135deg,#fbbf24,#f97316)' :
            isPay    ? 'linear-gradient(135deg,#818cf8,#6366f1)' :
                       'rgba(0,0,0,0.28)';

          const circleIcon = isDone ? '✅' : isToday ? '⭐' : isPay ? '💳' : '🔒';
          const circleNumberColor = (isDone || isToday) ? '#000' : (isPay ? '#fff' : 'rgba(255,255,255,0.45)');

          // Info card — always WHITE card with DARK text for maximum visibility
          const cardBg =
            isDone   ? '#ffffff' :
            isToday  ? '#ffffff' :
            isPay    ? 'rgba(255,255,255,0.15)' :
                       'rgba(0,0,0,0.22)';
          const cardTitleColor =
            isDone   ? '#14532d' :
            isToday  ? '#7c2d12' :
            isPay    ? '#fff' :
                       'rgba(255,255,255,0.7)';
          const cardSubColor =
            isDone   ? '#166534' :
            isToday  ? '#9a3412' :
            isPay    ? 'rgba(255,255,255,0.9)' :
                       'rgba(255,255,255,0.6)';

          const cardSub =
            isDone   ? '✅ Complete! Tap to replay' :
            isToday  ? `🎮 Tap to PLAY! ${dayNo <= FREE_DAYS ? '· FREE' : ''}` :
            isPay    ? '💳 Unlock full access' :
                       '🔒 Complete earlier days first';

          return (
            <div key={dayNo}>
              {/* World section label */}
              {WORLD_STARTS.has(dayNo) && (
                <div style={{
                  display:'flex', alignItems:'center', gap:10,
                  margin: dayNo === 1 ? '8px 0 14px' : '20px 0 14px',
                }}>
                  <div style={{ height:2, flex:1, background:'rgba(255,255,255,0.35)', borderRadius:99 }} />
                  <div style={{
                    background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)',
                    border:'2px solid rgba(255,255,255,0.3)',
                    borderRadius:60, padding:'6px 16px',
                    color:'#fff', fontWeight:900, fontSize:'0.78rem', whiteSpace:'nowrap',
                  }}>
                    {bandFor(dayNo).icon} {bandFor(dayNo).label}
                  </div>
                  <div style={{ height:2, flex:1, background:'rgba(255,255,255,0.35)', borderRadius:99 }} />
                </div>
              )}

              {/* Connector dots */}
              {i > 0 && !WORLD_STARTS.has(dayNo) && (
                <div style={{
                  display:'flex', gap:5, margin:'3px 0',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  paddingLeft: isLeft ? 30 : 0,
                  paddingRight: isLeft ? 0 : 30,
                }}>
                  {[0,1,2,3].map(dot => (
                    <div key={dot} style={{
                      width:7, height:7, borderRadius:'50%',
                      background: isDone ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                    }} />
                  ))}
                </div>
              )}

              {/* Row: circle + info card */}
              <div style={{
                display:'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                margin:'4px 0',
              }}>
                <button
                  disabled={isLocked}
                  onClick={() => handleTap(dayNo, s)}
                  style={{
                    display:'flex', alignItems:'center',
                    flexDirection: isLeft ? 'row' : 'row-reverse',
                    gap:12, background:'none', border:'none',
                    cursor: isLocked ? 'default' : 'pointer',
                    fontFamily:'inherit', padding:'4px 0',
                    opacity: isLocked ? 0.45 : 1,
                  }}
                >
                  {/* Circle node */}
                  <div style={{
                    width:66, height:66, borderRadius:'50%', flexShrink:0,
                    background: circleBg,
                    border: isDone   ? '3px solid #4ade80' :
                            isToday  ? '3px solid #fde68a' :
                            isPay    ? '3px solid #c7d2fe' :
                                       '3px solid rgba(255,255,255,0.15)',
                    display:'flex', flexDirection:'column',
                    alignItems:'center', justifyContent:'center',
                    boxShadow: isToday
                      ? '0 0 0 8px rgba(251,191,36,0.3), 0 6px 20px rgba(0,0,0,0.4)'
                      : isDone
                      ? '0 4px 16px rgba(34,197,94,0.5)'
                      : '0 4px 14px rgba(0,0,0,0.35)',
                    animation: isToday ? 'glowPulse 2s ease-in-out infinite' : 'none',
                  }}>
                    <span style={{ fontSize:'1.2rem', lineHeight:1 }}>{circleIcon}</span>
                    <span style={{ fontSize:'0.72rem', fontWeight:900, color: circleNumberColor, marginTop:2 }}>
                      {dayNo}
                    </span>
                  </div>

                  {/* Info card — white bg, always dark readable text */}
                  <div style={{
                    background: cardBg,
                    borderRadius:14,
                    padding:'9px 13px',
                    maxWidth:195,
                    boxShadow: (isDone || isToday) ? '0 4px 18px rgba(0,0,0,0.25)' : 'none',
                    border: isToday ? '2px solid #fbbf24' : isDone ? '2px solid #22c55e' : 'none',
                  }}>
                    <div style={{
                      fontWeight:900, fontSize:'0.88rem',
                      color: cardTitleColor,
                      marginBottom:3,
                      textAlign: isLeft ? 'left' : 'right',
                    }}>
                      {lang === 'ur' ? d.title?.ur : d.title?.en}
                    </div>
                    <div style={{
                      fontSize:'0.72rem', fontWeight:700,
                      color: cardSubColor,
                      textAlign: isLeft ? 'left' : 'right',
                    }}>
                      {cardSub}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          );
        })}

        {/* End of path */}
        <div style={{ textAlign:'center', marginTop:36, paddingBottom:20 }}>
          <div style={{ fontSize:'3rem' }}>🏆</div>
          <p style={{ color:'#fff', fontWeight:800, fontSize:'0.9rem', marginTop:8, textShadow:'0 2px 6px rgba(0,0,0,0.5)' }}>
            Complete all 90 days to become a Master!
          </p>
        </div>
      </div>
    </div>
  );
}
