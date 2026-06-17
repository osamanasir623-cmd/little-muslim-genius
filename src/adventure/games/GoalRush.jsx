import { useRef, useEffect, useState, useCallback } from 'react';

const W = 340, H = 420;
const GOAL_L = 70, GOAL_R = 270, GOAL_Y = 70, GOAL_H = 24;
const GK_W = 72, GK_H = 22;
const BALL_Y0 = 360, BALL_X0 = W / 2, BALL_R = 14;

const LEVEL_CFG = {
  1: { needs: 3, gkSpeed: 1.8, aimSpeed: 1.0, aimMax: 30 },
  2: { needs: 5, gkSpeed: 2.8, aimSpeed: 1.5, aimMax: 40 },
  3: { needs: 8, gkSpeed: 3.8, aimSpeed: 2.2, aimMax: 42 },
};

export default function GoalRush({ onWin, level = 1 }) {
  const cfg = LEVEL_CFG[level] || LEVEL_CFG[1];
  const canvasRef = useRef(null);
  const G = useRef({
    gkX: (GOAL_L + GOAL_R) / 2 - GK_W / 2,
    gkDir: 1, gkSpeed: cfg.gkSpeed,
    aimAngle: 0, aimDir: 1,
    ball: null, score: 0,
    phase: 'aim',
    result: null, resultTimer: null,
    cfg,
  });
  const [score, setScore] = useState(0);
  const [won,   setWon]   = useState(false);

  const kick = useCallback(() => {
    const g = G.current;
    if (g.phase !== 'aim' || won) return;
    const rad = (g.aimAngle * Math.PI) / 180;
    const spd = 13;
    g.ball = { x: BALL_X0, y: BALL_Y0, vx: Math.sin(rad) * spd * 0.45, vy: -spd };
    g.phase = 'fly';
  }, [won]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let   raf;
    const g = G.current;
    const c = g.cfg;

    const draw = () => {
      for (let i = 0; i < 7; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#22c55e' : '#16a34a';
        ctx.fillRect(0, i * (H / 7), W, H / 7);
      }

      ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(W / 2, H / 2 + 40, 68, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, H / 2 + 40); ctx.lineTo(W, H / 2 + 40); ctx.stroke();
      ctx.beginPath();
      ctx.rect(GOAL_L - 22, GOAL_Y - 6, (GOAL_R - GOAL_L) + 44, 92);
      ctx.stroke();

      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(GOAL_L, GOAL_Y - 34, GOAL_R - GOAL_L, 34);
      ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1;
      for (let x = GOAL_L; x <= GOAL_R; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, GOAL_Y - 34); ctx.lineTo(x, GOAL_Y); ctx.stroke();
      }
      for (let y = GOAL_Y - 34; y <= GOAL_Y; y += 14) {
        ctx.beginPath(); ctx.moveTo(GOAL_L, y); ctx.lineTo(GOAL_R, y); ctx.stroke();
      }

      ctx.strokeStyle = '#fff'; ctx.lineWidth = 7; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(GOAL_L, GOAL_Y); ctx.lineTo(GOAL_L, GOAL_Y - 34); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(GOAL_R, GOAL_Y); ctx.lineTo(GOAL_R, GOAL_Y - 34); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(GOAL_L, GOAL_Y - 34); ctx.lineTo(GOAL_R, GOAL_Y - 34); ctx.stroke();
      ctx.lineCap = 'butt';

      const gx = g.gkX;
      const gkGrad = ctx.createLinearGradient(gx, GOAL_Y, gx + GK_W, GOAL_Y + GK_H);
      gkGrad.addColorStop(0, '#facc15'); gkGrad.addColorStop(1, '#f97316');
      ctx.fillStyle = gkGrad;
      ctx.beginPath(); ctx.roundRect(gx, GOAL_Y, GK_W, GK_H, 8); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(gx, GOAL_Y, GK_W, GK_H, 8); ctx.stroke();
      ctx.font = '22px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText('🧤', gx + GK_W / 2, GOAL_Y + GK_H);

      if (g.phase === 'aim') {
        const rad = (g.aimAngle * Math.PI) / 180;
        const len = 120;
        const ex = BALL_X0 + Math.sin(rad) * len;
        const ey = BALL_Y0 - Math.cos(rad) * len;
        ctx.strokeStyle = '#facc15'; ctx.lineWidth = 4;
        ctx.setLineDash([10, 6]);
        ctx.shadowColor = '#facc15'; ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.moveTo(BALL_X0, BALL_Y0); ctx.lineTo(ex, ey); ctx.stroke();
        ctx.setLineDash([]); ctx.shadowBlur = 0;
        ctx.fillStyle = '#facc15';
        ctx.beginPath(); ctx.arc(ex, ey, 10, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ex, ey, 10, 0, Math.PI * 2); ctx.stroke();
      }

      const bx = g.ball ? g.ball.x : BALL_X0;
      const by = g.ball ? g.ball.y : BALL_Y0;
      ctx.font = `${BALL_R * 2.2}px serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 8;
      ctx.fillText('⚽', bx, by);
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.roundRect(10, 10, 116, 42, 21); ctx.fill();
      ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(10, 10, 116, 42, 21); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 17px sans-serif';
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(`⚽ ${g.score} / ${c.needs}`, 20, 31);

      if (g.result) {
        const isGoal = g.result === 'goal';
        ctx.fillStyle = isGoal ? '#16a34a' : '#dc2626';
        ctx.beginPath(); ctx.roundRect(W / 2 - 110, H / 2 - 34, 220, 68, 18); ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.roundRect(W / 2 - 110, H / 2 - 34, 220, 68, 18); ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 28px sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(
          isGoal ? '⚽ GOAL!' : g.result === 'saved' ? '🧤 Saved!' : '↔ Wide!',
          W / 2, H / 2
        );
      }
    };

    const update = () => {
      if (g.phase === 'aim') {
        g.gkX += g.gkDir * g.gkSpeed;
        if (g.gkX <= GOAL_L || g.gkX + GK_W >= GOAL_R) g.gkDir *= -1;
        g.aimAngle += g.aimDir * c.aimSpeed;
        if (g.aimAngle > c.aimMax || g.aimAngle < -c.aimMax) g.aimDir *= -1;
      }
      if (g.phase === 'fly' && g.ball) {
        g.ball.x += g.ball.vx;
        g.ball.y += g.ball.vy;
        g.ball.vy += 0.18;
        if (g.ball.y <= GOAL_Y + GOAL_H) {
          const inGate = g.ball.x > GOAL_L && g.ball.x < GOAL_R;
          const inGK   = g.ball.x > g.gkX  && g.ball.x < g.gkX + GK_W;
          if (!inGate)     g.result = 'wide';
          else if (inGK)   g.result = 'saved';
          else {
            g.result = 'goal'; g.score++;
            setScore(g.score);
            if (g.score >= c.needs) { setTimeout(() => { setWon(true); onWin(); }, 900); }
          }
          g.phase = 'result'; g.ball = null;
          g.resultTimer = setTimeout(() => {
            g.result = null; g.phase = 'aim';
            g.gkSpeed = Math.min(c.gkSpeed + 3, g.gkSpeed + 0.35);
          }, 1100);
        }
        if (g.ball && g.ball.y > H + 40) { g.phase = 'aim'; g.ball = null; }
      }
    };

    const loop = () => { update(); draw(); raf = requestAnimationFrame(loop); };
    loop();
    return () => { cancelAnimationFrame(raf); if (g.resultTimer) clearTimeout(g.resultTimer); };
  }, [onWin]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <canvas
        ref={canvasRef} width={W} height={H}
        style={{ borderRadius: 20, boxShadow: '0 8px 40px rgba(22,163,74,0.5)', maxWidth: '100%', touchAction: 'none' }}
        onClick={kick}
        onTouchStart={(e) => { e.preventDefault(); kick(); }}
      />
      {!won && (
        <button onClick={kick} style={{
          fontSize: '1.5rem', fontWeight: 900, padding: '16px 52px',
          background: 'linear-gradient(135deg,#facc15,#f97316)',
          border: '3px solid #fff', borderRadius: 60, color: '#1a0a00',
          cursor: 'pointer', fontFamily: 'inherit',
          boxShadow: '0 6px 24px rgba(249,115,22,0.6)',
          animation: 'bob 0.7s ease-in-out infinite',
        }}>
          ⚽ KICK!
        </button>
      )}
      {won && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem' }}>🎉⚽🎉</div>
          <p style={{ color: '#facc15', fontWeight: 800, fontSize: '1.2rem', margin: 4 }}>
            Hat-trick! Great job! 🌟
          </p>
        </div>
      )}
      <p style={{ color: '#d1fae5', fontSize: '0.85rem', textAlign: 'center', margin: 0, fontWeight: 600 }}>
        ⏱️ Watch the dot — tap KICK when it aims away from the keeper!
      </p>
    </div>
  );
}
