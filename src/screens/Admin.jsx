import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Screen } from '../components/ui.jsx';
import api from '../services/api.js';

const WORLD_COLORS = {
  light:   '#ffd86b',
  compute: '#4ff0d4',
  ai:      '#ff9f7f',
  data:    '#b8ff7a',
  neuro:   '#ff9de2',
};

export default function Admin({ onBack }) {
  const { lang } = useApp();

  const [tab,        setTab]        = useState('users');
  const [stats,      setStats]      = useState(null);
  const [users,      setUsers]      = useState([]);
  const [total,      setTotal]      = useState(0);
  const [page,       setPage]       = useState(1);
  const [pages,      setPages]      = useState(1);
  const [search,     setSearch]     = useState('');
  const [loading,    setLoading]    = useState(false);
  const [actionMsg,  setActionMsg]  = useState('');
  const [deleteId,   setDeleteId]   = useState(null);

  // ── Content state ──────────────────────────────────────────────
  const [contentDays,   setContentDays]   = useState([]);
  const [contentLoad,   setContentLoad]   = useState(false);
  const [editDay,       setEditDay]       = useState(null);
  const [editForm,      setEditForm]      = useState(null);
  const [editErr,       setEditErr]       = useState('');
  const [showAddDay,    setShowAddDay]    = useState(false);
  const [addForm,       setAddForm]       = useState({ dayNumber: '', titleEn: '', titleUr: '', world: 'light', gamesJson: '[]' });
  const [addErr,        setAddErr]        = useState('');
  const [deleteDayId,   setDeleteDayId]   = useState(null);

  // ── Puzzle state ────────────────────────────────────────────────
  const [puzzles,       setPuzzles]       = useState([]);
  const [puzzleLoad,    setPuzzleLoad]    = useState(false);
  const [deletePuzzleId,setDeletePuzzleId]= useState(null);
  const [showAddPuzzle, setShowAddPuzzle] = useState(false);
  const PIECE_EMPTY = { icon: '', en: '', ur: '' };
  const [puzzleForm,    setPuzzleForm]    = useState({
    topic: 'Islam', titleEn: '', titleUr: '', learnFact: '',
    pieces: [{ ...PIECE_EMPTY }, { ...PIECE_EMPTY }, { ...PIECE_EMPTY }, { ...PIECE_EMPTY }],
  });
  const [puzzleErr,     setPuzzleErr]     = useState('');

  const loadStats = useCallback(async () => {
    try {
      const { data } = await api.get('/admin/stats');
      setStats(data);
    } catch { /* ignore */ }
  }, []);

  const loadUsers = useCallback(async (p = 1, q = search) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/admin/users?page=${p}&search=${encodeURIComponent(q)}`);
      setUsers(data.users);
      setTotal(data.total);
      setPages(data.pages);
      setPage(p);
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { loadStats(); loadUsers(1, ''); }, []);

  // ── Content helpers ────────────────────────────────────────────
  const loadContent = useCallback(async () => {
    setContentLoad(true);
    try {
      const { data } = await api.get('/admin/content/days');
      setContentDays(data);
    } catch { /* ignore */ } finally { setContentLoad(false); }
  }, []);

  useEffect(() => { if (tab === 'content') loadContent(); }, [tab]);

  const openEdit = (d) => {
    setEditDay(d);
    setEditErr('');
    setEditForm({
      titleEn:   d.title.en,
      titleUr:   d.title.ur,
      world:     d.world,
      gamesJson: JSON.stringify(d.games, null, 2),
    });
  };

  const saveEdit = async () => {
    setEditErr('');
    let games;
    try { games = JSON.parse(editForm.gamesJson); } catch { setEditErr('Games JSON is invalid.'); return; }
    try {
      const { data } = await api.put(`/admin/content/days/${editDay._id}`, {
        title: { en: editForm.titleEn, ur: editForm.titleUr },
        world: editForm.world,
        games,
      });
      setContentDays((ds) => ds.map((d) => d._id === data._id ? data : d));
      setEditDay(null);
      flash('Day updated.');
    } catch (err) { setEditErr(err.response?.data?.message || 'Save failed.'); }
  };

  const saveAdd = async () => {
    setAddErr('');
    let games;
    try { games = JSON.parse(addForm.gamesJson); } catch { setAddErr('Games JSON is invalid.'); return; }
    if (!addForm.dayNumber || !addForm.titleEn || !addForm.titleUr) {
      setAddErr('Day number and both titles are required.'); return;
    }
    try {
      const { data } = await api.post('/admin/content/days', {
        dayNumber: Number(addForm.dayNumber),
        title: { en: addForm.titleEn, ur: addForm.titleUr },
        world: addForm.world,
        games,
      });
      setContentDays((ds) => [...ds, data].sort((a, b) => a.dayNumber - b.dayNumber));
      setShowAddDay(false);
      setAddForm({ dayNumber: '', titleEn: '', titleUr: '', world: 'light', gamesJson: '[]' });
      flash('Day created.');
    } catch (err) { setAddErr(err.response?.data?.message || 'Create failed.'); }
  };

  const confirmDeleteDay = async () => {
    if (!deleteDayId) return;
    try {
      await api.delete(`/admin/content/days/${deleteDayId}`);
      setContentDays((ds) => ds.filter((d) => d._id !== deleteDayId));
      flash('Day deleted.');
    } catch (err) { flash(err.response?.data?.message || 'Error'); } finally { setDeleteDayId(null); }
  };

  const flash = (msg) => { setActionMsg(msg); setTimeout(() => setActionMsg(''), 3000); };

  // ── Puzzle helpers ─────────────────────────────────────────────
  const loadPuzzles = useCallback(async () => {
    setPuzzleLoad(true);
    try {
      const { data } = await api.get('/admin/puzzles');
      setPuzzles(data);
    } catch { /* ignore */ } finally { setPuzzleLoad(false); }
  }, []);

  useEffect(() => { if (tab === 'puzzles') loadPuzzles(); }, [tab]);

  const saveAddPuzzle = async () => {
    setPuzzleErr('');
    const validPieces = puzzleForm.pieces.filter(p => p.icon && p.en);
    if (!puzzleForm.titleEn || !puzzleForm.learnFact || validPieces.length < 2) {
      setPuzzleErr('Title, fun fact, and at least 2 pieces (with icon + English name) are required.');
      return;
    }
    try {
      const { data } = await api.post('/admin/puzzles', {
        topic: puzzleForm.topic,
        title: { en: puzzleForm.titleEn, ur: puzzleForm.titleUr || puzzleForm.titleEn },
        pieces: validPieces,
        learnFact: puzzleForm.learnFact,
      });
      setPuzzles(ps => [...ps, data]);
      setShowAddPuzzle(false);
      setPuzzleForm({ topic: 'Islam', titleEn: '', titleUr: '', learnFact: '', pieces: [PIECE_EMPTY, PIECE_EMPTY, PIECE_EMPTY, PIECE_EMPTY] });
      flash('Puzzle created! It\'s now live for all children.');
    } catch (err) { setPuzzleErr(err.response?.data?.message || 'Create failed.'); }
  };

  const confirmDeletePuzzle = async () => {
    if (!deletePuzzleId) return;
    try {
      await api.delete(`/admin/puzzles/${deletePuzzleId}`);
      setPuzzles(ps => ps.filter(p => p.id !== deletePuzzleId));
      flash('Puzzle deleted.');
    } catch (err) { flash(err.response?.data?.message || 'Error'); } finally { setDeletePuzzleId(null); }
  };

  const setPiece = (i, field, value) => {
    setPuzzleForm(f => {
      const pieces = f.pieces.map((p, idx) => idx === i ? { ...p, [field]: value } : p);
      return { ...f, pieces };
    });
  };

  const toggleBlock = async (userId, currentlyBlocked) => {
    try {
      await api.put(`/admin/users/${userId}/block`);
      setUsers((us) => us.map((u) => u.id === userId ? { ...u, blocked: !currentlyBlocked } : u));
      flash(currentlyBlocked ? 'User unblocked.' : 'User blocked.');
      loadStats();
    } catch (err) { flash(err.response?.data?.message || 'Error'); }
  };

  const togglePayment = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'paid' ? 'trial' : 'paid';
    try {
      await api.put(`/admin/users/${userId}/payment`, { status: newStatus });
      setUsers((us) => us.map((u) => u.id === userId ? { ...u, paymentStatus: newStatus } : u));
      flash(newStatus === 'paid' ? 'Access granted.' : 'Access revoked.');
      loadStats();
    } catch (err) { flash(err.response?.data?.message || 'Error'); }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/admin/users/${deleteId}`);
      setUsers((us) => us.filter((u) => u.id !== deleteId));
      setTotal((t) => t - 1);
      flash('User deleted.');
      loadStats();
    } catch (err) { flash(err.response?.data?.message || 'Error'); } finally {
      setDeleteId(null);
    }
  };

  const INPUT_STYLE = {
    width: '100%', padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.12)', color: 'var(--ink)', fontFamily: 'inherit',
    fontSize: '0.9rem', boxSizing: 'border-box',
  };

  const CARD = (value, label, color) => (
    <div className="card center" style={{ flex: 1, padding: '16px 10px', minWidth: 0 }}>
      <div style={{ fontSize: '1.6rem', fontWeight: 800, color }}>{value ?? '…'}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--ink)', opacity: 0.65, marginTop: 3 }}>{label}</div>
    </div>
  );

  const TAB = (key, label) => (
    <button
      onClick={() => setTab(key)}
      style={{
        flex: 1, padding: '9px 4px', border: 'none', borderRadius: 12, fontFamily: 'inherit',
        fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
        background: tab === key ? 'var(--grad-teal)' : 'rgba(255,255,255,0.15)',
        color: tab === key ? 'var(--ink)' : 'rgba(255,255,255,0.7)',
        transition: 'all 0.2s',
      }}>{label}</button>
  );

  return (
    <Screen>
      {/* header */}
      <div className="between" style={{ marginBottom: 16 }}>
        <button className="chip" style={{ cursor: 'pointer' }} onClick={onBack}>↩ Back</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1.3rem' }}>🛡️</span>
          <strong style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>Admin Panel</strong>
        </div>
      </div>

      {/* stats row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        {CARD(stats?.total,       'Total Users',   'var(--gold-1)')}
        {CARD(stats?.paid,        'Paid',          '#4ff0d4')}
        {CARD(stats?.trial,       'Trial',         'var(--coral-1)')}
        {CARD(stats?.blocked,     'Blocked',       '#ff5d8f')}
      </div>

      {/* tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
        {TAB('users',   'Users')}
        {TAB('blocked', 'Blocked')}
        {TAB('paid',    'Paid')}
        {TAB('content', '📚 Days')}
        {TAB('puzzles', '🧩 Puzzles')}
      </div>

      {/* action flash */}
      {actionMsg && (
        <div style={{ background: 'rgba(79,240,212,0.2)', border: '1px solid #4ff0d4', borderRadius: 10,
          padding: '8px 14px', marginBottom: 12, fontWeight: 700, color: 'var(--ink)', fontSize: '0.9rem' }}>
          ✅ {actionMsg}
        </div>
      )}

      {/* search */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && loadUsers(1, search)}
          placeholder="Search by email…"
          style={{
            flex: 1, padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.12)', color: 'var(--ink)', fontFamily: 'inherit',
            fontSize: '0.9rem',
          }}
        />
        <button className="btn teal" style={{ padding: '10px 16px', fontSize: '0.9rem' }}
          onClick={() => loadUsers(1, search)}>🔍</button>
      </div>

      {/* user list */}
      {loading ? (
        <div className="center mt2"><span style={{ fontSize: '2rem' }}>⏳</span></div>
      ) : (
        <div className="col" style={{ gap: 8 }}>
          {users
            .filter((u) => {
              if (tab === 'blocked') return u.blocked;
              if (tab === 'paid')    return u.paymentStatus === 'paid';
              return true;
            })
            .map((u) => (
              <div key={u.id} className="panel" style={{
                opacity: u.blocked ? 0.65 : 1,
                border: u.blocked ? '1px solid rgba(255,93,143,0.4)' : undefined,
              }}>
                {/* email + badges */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)', wordBreak: 'break-all' }}>
                    {u.email}
                  </span>
                  {u.isAdmin && (
                    <span style={{ background: 'rgba(79,240,212,0.25)', color: 'var(--ink)', borderRadius: 99,
                      padding: '2px 8px', fontSize: '0.7rem', fontWeight: 700 }}>ADMIN</span>
                  )}
                  {u.blocked && (
                    <span style={{ background: 'rgba(255,93,143,0.25)', color: '#ff5d8f', borderRadius: 99,
                      padding: '2px 8px', fontSize: '0.7rem', fontWeight: 700 }}>BLOCKED</span>
                  )}
                </div>

                {/* meta */}
                <div style={{ fontSize: '0.75rem', color: 'var(--ink)', opacity: 0.55, marginBottom: 10 }}>
                  Joined {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                  {u.lastLogin ? ` · Last login ${new Date(u.lastLogin).toLocaleDateString()}` : ''}
                  {' · '}
                  <span style={{ color: u.paymentStatus === 'paid' ? '#4ff0d4' : 'var(--coral-1)', fontWeight: 700 }}>
                    {u.paymentStatus === 'paid' ? 'Paid' : 'Trial'}
                  </span>
                </div>

                {/* actions */}
                {!u.isAdmin && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <button
                      onClick={() => toggleBlock(u.id, u.blocked)}
                      style={{
                        padding: '6px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                        fontFamily: 'inherit', fontWeight: 700, fontSize: '0.8rem',
                        background: u.blocked ? 'rgba(79,240,212,0.25)' : 'rgba(255,93,143,0.25)',
                        color: u.blocked ? '#4ff0d4' : '#ff5d8f',
                      }}>
                      {u.blocked ? '✅ Unblock' : '🚫 Block'}
                    </button>

                    <button
                      onClick={() => togglePayment(u.id, u.paymentStatus)}
                      style={{
                        padding: '6px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                        fontFamily: 'inherit', fontWeight: 700, fontSize: '0.8rem',
                        background: u.paymentStatus === 'paid'
                          ? 'rgba(255,216,107,0.25)' : 'rgba(79,240,212,0.25)',
                        color: u.paymentStatus === 'paid' ? 'var(--gold-1)' : '#4ff0d4',
                      }}>
                      {u.paymentStatus === 'paid' ? '⏬ Revoke Access' : '🎁 Grant Access'}
                    </button>

                    <button
                      onClick={() => setDeleteId(u.id)}
                      style={{
                        padding: '6px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                        fontFamily: 'inherit', fontWeight: 700, fontSize: '0.8rem',
                        background: 'rgba(255,93,143,0.15)', color: '#ff5d8f',
                        marginLeft: 'auto',
                      }}>
                      🗑️
                    </button>
                  </div>
                )}
              </div>
            ))}

          {users.filter((u) => {
            if (tab === 'blocked') return u.blocked;
            if (tab === 'paid')    return u.paymentStatus === 'paid';
            return true;
          }).length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--ink)', opacity: 0.5, marginTop: 24 }}>
              No users found.
            </p>
          )}
        </div>
      )}

      {/* ── Content tab ─────────────────────────────────────────────── */}
      {tab === 'content' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontWeight: 700, color: 'var(--ink)' }}>
              {contentDays.length} days in database
            </span>
            <button className="btn teal" style={{ padding: '8px 14px', fontSize: '0.85rem' }}
              onClick={() => { setShowAddDay(true); setAddErr(''); }}>
              + Add Day
            </button>
          </div>

          {contentLoad && <div className="center"><span style={{ fontSize: '2rem' }}>⏳</span></div>}

          <div className="col" style={{ gap: 8 }}>
            {contentDays.map((d) => (
              <div key={d._id} className="panel" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  minWidth: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center',
                  background: WORLD_COLORS[d.world] || '#fff', fontWeight: 800, fontSize: '0.85rem',
                  color: '#222',
                }}>{d.dayNumber}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {d.title.en}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink)', opacity: 0.55 }}>
                    {d.world} · {d.games.length} game{d.games.length !== 1 ? 's' : ''}
                    {!d.active && <span style={{ color: '#ff5d8f', marginLeft: 6 }}>hidden</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => openEdit(d)} style={{
                    padding: '5px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: 'rgba(79,240,212,0.2)', color: '#4ff0d4', fontWeight: 700, fontSize: '0.8rem',
                  }}>Edit</button>
                  <button onClick={() => setDeleteDayId(d._id)} style={{
                    padding: '5px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: 'rgba(255,93,143,0.15)', color: '#ff5d8f', fontWeight: 700, fontSize: '0.8rem',
                  }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* pagination (users tabs only) */}
      {pages > 1 && tab !== 'content' && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 18 }}>
          <button className="chip" disabled={page <= 1} style={{ cursor: page > 1 ? 'pointer' : 'default', opacity: page > 1 ? 1 : 0.4 }}
            onClick={() => loadUsers(page - 1)}>◀</button>
          <span style={{ color: 'var(--ink)', fontWeight: 700, lineHeight: '2rem' }}>
            {page} / {pages} · {total} users
          </span>
          <button className="chip" disabled={page >= pages} style={{ cursor: page < pages ? 'pointer' : 'default', opacity: page < pages ? 1 : 0.4 }}
            onClick={() => loadUsers(page + 1)}>▶</button>
        </div>
      )}

      {/* ── Edit Day modal ───────────────────────────────────────────── */}
      {editDay && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 999,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px 16px', overflowY: 'auto' }}>
          <div className="panel" style={{ width: '100%', maxWidth: 560 }}>
            <div className="between" style={{ marginBottom: 14 }}>
              <strong style={{ color: 'var(--ink)' }}>✏️ Edit Day {editDay.dayNumber}</strong>
              <button className="chip" style={{ cursor: 'pointer' }} onClick={() => setEditDay(null)}>✕</button>
            </div>
            <div className="col" style={{ gap: 10 }}>
              <input placeholder="Title (English)" value={editForm.titleEn}
                onChange={(e) => setEditForm((f) => ({ ...f, titleEn: e.target.value }))}
                style={INPUT_STYLE} />
              <input placeholder="عنوان (اردو)" value={editForm.titleUr} dir="rtl"
                onChange={(e) => setEditForm((f) => ({ ...f, titleUr: e.target.value }))}
                style={INPUT_STYLE} />
              <select value={editForm.world} onChange={(e) => setEditForm((f) => ({ ...f, world: e.target.value }))}
                style={{ ...INPUT_STYLE, cursor: 'pointer' }}>
                {['light','compute','ai','data','neuro'].map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: '0.8rem', color: 'var(--ink)', opacity: 0.6 }}>
                  Games (JSON array) — edit carefully
                </p>
                <textarea value={editForm.gamesJson} rows={10}
                  onChange={(e) => setEditForm((f) => ({ ...f, gamesJson: e.target.value }))}
                  style={{ ...INPUT_STYLE, fontFamily: 'monospace', fontSize: '0.78rem', resize: 'vertical' }} />
              </div>
              {editErr && <p style={{ color: '#ff5d8f', margin: 0, fontWeight: 600 }}>{editErr}</p>}
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn block" style={{ background: 'rgba(255,255,255,0.15)', flex: 1 }}
                  onClick={() => setEditDay(null)}>Cancel</button>
                <button className="btn teal block" style={{ flex: 1 }} onClick={saveEdit}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Day modal ────────────────────────────────────────────── */}
      {showAddDay && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 999,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px 16px', overflowY: 'auto' }}>
          <div className="panel" style={{ width: '100%', maxWidth: 560 }}>
            <div className="between" style={{ marginBottom: 14 }}>
              <strong style={{ color: 'var(--ink)' }}>➕ Add New Day</strong>
              <button className="chip" style={{ cursor: 'pointer' }} onClick={() => setShowAddDay(false)}>✕</button>
            </div>
            <div className="col" style={{ gap: 10 }}>
              <input type="number" placeholder="Day Number (e.g. 91)" value={addForm.dayNumber}
                onChange={(e) => setAddForm((f) => ({ ...f, dayNumber: e.target.value }))}
                style={INPUT_STYLE} />
              <input placeholder="Title (English)" value={addForm.titleEn}
                onChange={(e) => setAddForm((f) => ({ ...f, titleEn: e.target.value }))}
                style={INPUT_STYLE} />
              <input placeholder="عنوان (اردو)" value={addForm.titleUr} dir="rtl"
                onChange={(e) => setAddForm((f) => ({ ...f, titleUr: e.target.value }))}
                style={INPUT_STYLE} />
              <select value={addForm.world} onChange={(e) => setAddForm((f) => ({ ...f, world: e.target.value }))}
                style={{ ...INPUT_STYLE, cursor: 'pointer' }}>
                {['light','compute','ai','data','neuro'].map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: '0.8rem', color: 'var(--ink)', opacity: 0.6 }}>
                  Games (JSON array)
                </p>
                <textarea value={addForm.gamesJson} rows={8}
                  onChange={(e) => setAddForm((f) => ({ ...f, gamesJson: e.target.value }))}
                  style={{ ...INPUT_STYLE, fontFamily: 'monospace', fontSize: '0.78rem', resize: 'vertical' }}
                  placeholder={'[\n  { "type": "quranStar", "verse": { "ar": "...", "en": "...", "ur": "..." } }\n]'}
                />
              </div>
              {addErr && <p style={{ color: '#ff5d8f', margin: 0, fontWeight: 600 }}>{addErr}</p>}
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn block" style={{ background: 'rgba(255,255,255,0.15)', flex: 1 }}
                  onClick={() => setShowAddDay(false)}>Cancel</button>
                <button className="btn teal block" style={{ flex: 1 }} onClick={saveAdd}>Create Day</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Day confirmation ──────────────────────────────────── */}
      {deleteDayId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: 20 }}>
          <div className="panel" style={{ maxWidth: 340, width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>⚠️</div>
            <p style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
              Permanently delete this day and all its games?
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn block" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--ink)', flex: 1 }}
                onClick={() => setDeleteDayId(null)}>Cancel</button>
              <button className="btn block" style={{ background: 'linear-gradient(135deg,#ff5d8f,#c0392b)', flex: 1 }}
                onClick={confirmDeleteDay}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Puzzles tab ─────────────────────────────────────────────── */}
      {tab === 'puzzles' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontWeight: 700, color: 'var(--ink)' }}>
              {puzzles.length} puzzles in database
            </span>
            <button className="btn teal" style={{ padding: '8px 14px', fontSize: '0.85rem' }}
              onClick={() => { setShowAddPuzzle(true); setPuzzleErr(''); }}>
              + Add Puzzle
            </button>
          </div>

          {puzzleLoad && <div className="center"><span style={{ fontSize: '2rem' }}>⏳</span></div>}

          <div className="col" style={{ gap: 8 }}>
            {puzzles.map((p) => (
              <div key={p.id} className="panel" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  minWidth: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.3rem',
                  background: p.topic === 'Islam' ? 'rgba(255,215,0,0.2)'
                    : p.topic === 'Technology' ? 'rgba(79,240,212,0.2)'
                    : p.topic === 'Science' ? 'rgba(134,239,172,0.2)'
                    : 'rgba(255,159,127,0.2)',
                }}>
                  {p.topic === 'Islam' ? '🕌' : p.topic === 'Technology' ? '💻' : p.topic === 'Science' ? '🔬' : '⭐'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.title?.en}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink)', opacity: 0.55 }}>
                    {p.topic} · {Array.isArray(p.pieces) ? p.pieces.length : 0} pieces
                    {!p.active && <span style={{ color: '#ff5d8f', marginLeft: 6 }}>hidden</span>}
                  </div>
                </div>
                <button onClick={() => setDeletePuzzleId(p.id)} style={{
                  padding: '5px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: 'rgba(255,93,143,0.15)', color: '#ff5d8f', fontWeight: 700, fontSize: '0.8rem',
                }}>🗑️</button>
              </div>
            ))}
            {puzzles.length === 0 && !puzzleLoad && (
              <p style={{ textAlign: 'center', color: 'var(--ink)', opacity: 0.5, marginTop: 24 }}>
                No puzzles yet — add your first one!
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Add Puzzle modal ─────────────────────────────────────────── */}
      {showAddPuzzle && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 999,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '16px', overflowY: 'auto' }}>
          <div className="panel" style={{ width: '100%', maxWidth: 520 }}>
            <div className="between" style={{ marginBottom: 14 }}>
              <strong style={{ color: 'var(--ink)' }}>🧩 Add New Puzzle</strong>
              <button className="chip" style={{ cursor: 'pointer' }} onClick={() => setShowAddPuzzle(false)}>✕</button>
            </div>
            <div className="col" style={{ gap: 10 }}>
              {/* Topic */}
              <select value={puzzleForm.topic} onChange={e => setPuzzleForm(f => ({ ...f, topic: e.target.value }))} style={INPUT_STYLE}>
                {['Islam','Technology','Science','Life Skills','General Knowledge'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              {/* Title */}
              <input placeholder="Puzzle title in English (e.g. 5 Pillars of Islam 🕌)"
                value={puzzleForm.titleEn}
                onChange={e => setPuzzleForm(f => ({ ...f, titleEn: e.target.value }))}
                style={INPUT_STYLE} />
              <input placeholder="عنوان اردو میں (اختیاری)" dir="rtl"
                value={puzzleForm.titleUr}
                onChange={e => setPuzzleForm(f => ({ ...f, titleUr: e.target.value }))}
                style={INPUT_STYLE} />

              {/* Fun fact */}
              <textarea placeholder="Fun fact shown when puzzle is complete (1-2 sentences)…"
                value={puzzleForm.learnFact} rows={3}
                onChange={e => setPuzzleForm(f => ({ ...f, learnFact: e.target.value }))}
                style={{ ...INPUT_STYLE, resize: 'vertical' }} />

              {/* Pieces */}
              <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--ink)', opacity: 0.65, fontWeight: 700 }}>
                Puzzle Pieces (min 2, max 5) — use an emoji as the icon:
              </p>
              {puzzleForm.pieces.map((piece, i) => (
                <div key={i} style={{ display: 'flex', gap: 6 }}>
                  <input placeholder="🕋" value={piece.icon}
                    onChange={e => setPiece(i, 'icon', e.target.value)}
                    style={{ ...INPUT_STYLE, width: 56, textAlign: 'center', fontSize: '1.2rem', flexShrink: 0 }} />
                  <input placeholder={`Piece ${i+1} name (English)`} value={piece.en}
                    onChange={e => setPiece(i, 'en', e.target.value)}
                    style={{ ...INPUT_STYLE, flex: 1 }} />
                  <input placeholder="اردو نام" dir="rtl" value={piece.ur}
                    onChange={e => setPiece(i, 'ur', e.target.value)}
                    style={{ ...INPUT_STYLE, width: 90, flexShrink: 0 }} />
                </div>
              ))}

              {/* Add extra piece */}
              {puzzleForm.pieces.length < 5 && (
                <button onClick={() => setPuzzleForm(f => ({ ...f, pieces: [...f.pieces, { ...PIECE_EMPTY }] }))}
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px dashed rgba(255,255,255,0.3)',
                    borderRadius: 10, color: 'var(--ink)', padding: '8px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                  + Add another piece
                </button>
              )}

              {puzzleErr && <p style={{ color: '#ff5d8f', margin: 0, fontWeight: 600 }}>{puzzleErr}</p>}

              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button className="btn block" style={{ background: 'rgba(255,255,255,0.15)', flex: 1 }}
                  onClick={() => setShowAddPuzzle(false)}>Cancel</button>
                <button className="btn teal block" style={{ flex: 1 }} onClick={saveAddPuzzle}>
                  🧩 Save Puzzle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Puzzle confirmation ───────────────────────────────── */}
      {deletePuzzleId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: 20 }}>
          <div className="panel" style={{ maxWidth: 340, width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>⚠️</div>
            <p style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
              Delete this puzzle? Children will no longer see it.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn block" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--ink)', flex: 1 }}
                onClick={() => setDeletePuzzleId(null)}>Cancel</button>
              <button className="btn block" style={{ background: 'linear-gradient(135deg,#ff5d8f,#c0392b)', flex: 1 }}
                onClick={confirmDeletePuzzle}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* delete confirmation modal */}
      {deleteId && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 999, padding: 20,
        }}>
          <div className="panel" style={{ maxWidth: 340, width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>⚠️</div>
            <p style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
              Permanently delete this user and all their data?
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink)', opacity: 0.6, marginBottom: 20 }}>
              This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn block" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--ink)', flex: 1 }}
                onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn block" style={{ background: 'linear-gradient(135deg,#ff5d8f,#c0392b)', flex: 1 }}
                onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </Screen>
  );
}
