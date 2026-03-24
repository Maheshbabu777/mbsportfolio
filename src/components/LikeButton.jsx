import { useEffect, useRef, useState } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc, increment, setDoc } from 'firebase/firestore';

const FloatingHeart = ({ id, onDone }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // unique bezier control points per heart — defines the curved path
    const cp1x = (Math.random() - 0.5) * 120;
    const cp1y = -(40 + Math.random() * 40);
    const cp2x = (Math.random() - 0.5) * 160;
    const cp2y = -(90 + Math.random() * 40);
    const endx = (Math.random() - 0.5) * 140;
    const endy = -(150 + Math.random() * 60);
    const rot  = (Math.random() - 0.5) * 50;
    const dur  = 1100 + Math.random() * 500;

    let start = null;

    const cubic = (t, p0, p1, p2, p3) =>
      Math.pow(1 - t, 3) * p0 +
      3 * Math.pow(1 - t, 2) * t * p1 +
      3 * (1 - t) * Math.pow(t, 2) * p2 +
      Math.pow(t, 3) * p3;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const frame = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const raw = Math.min(elapsed / dur, 1);
      const t = easeOut(raw);

      const x = cubic(t, 0, cp1x, cp2x, endx);
      const y = cubic(t, 0, cp1y, cp2y, endy);
      const r = rot * t;
      const s = 1 + 0.15 * Math.sin(t * Math.PI) - 0.7 * t;
      const o = raw < 0.6 ? 1 : 1 - ((raw - 0.6) / 0.4);

      el.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})`;
      el.style.opacity   = o;

      if (raw < 1) {
        requestAnimationFrame(frame);
      } else {
        onDone(id);
      }
    };

    requestAnimationFrame(frame);
  }, []);

  return (
    <span
      ref={ref}
      style={{
        position: 'absolute',
        bottom: '50%',
        left: '50%',
        marginLeft: -11,
        pointerEvents: 'none',
        zIndex: 99,
        willChange: 'transform, opacity',
        opacity: 0,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#EE2A7B"
        style={{ width: 22, height: 22, fill: '#EE2A7B', display: 'block' }}
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    </span>
  );
};

const LikeButton = () => {
  const [count, setCount]   = useState(null);
  const [liked, setLiked]   = useState(false);
  const [scale, setScale]   = useState(1);
  const [hearts, setHearts] = useState([]);
  const likedRef            = useRef(false);

  useEffect(() => {
    const hasLiked = localStorage.getItem('portfolio_liked') === 'true';
    setLiked(hasLiked);
    likedRef.current = hasLiked;
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const ref  = doc(db, 'portfolio', 'likes');
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setCount(snap.data().count);
      } else {
        await setDoc(ref, { count: 0 });
        setCount(0);
      }
    } catch (e) {
      setCount(0);
    }
  };

  const removeHeart = (id) =>
    setHearts((prev) => prev.filter((h) => h !== id));

  const handleLike = async () => {
    if (count === null) return;

    const id = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    setHearts((prev) => [...prev, id]);
    setScale(1.4);
    setTimeout(() => setScale(1), 200);

    if (!likedRef.current) {
      likedRef.current = true;
      setLiked(true);
      setCount((c) => c + 1);
      localStorage.setItem('portfolio_liked', 'true');
      try {
        const ref = doc(db, 'portfolio', 'likes');
        await updateDoc(ref, { count: increment(1) });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {hearts.map((id) => (
        <FloatingHeart key={id} id={id} onDone={removeHeart} />
      ))}

      <button
        onClick={handleLike}
        disabled={count === null}
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke={liked ? '#EE2A7B' : 'rgba(255,255,255,0.4)'}
          style={{
            width: 24, height: 24,
            fill: liked ? '#EE2A7B' : 'none',
            transform: `scale(${scale})`,
            transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), fill 0.2s, stroke 0.2s',
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        <span style={{
          fontSize: 14, fontWeight: 300,
          color: liked ? '#EE2A7B' : 'rgba(255,255,255,0.4)',
          transition: 'color 0.2s',
        }}>
          {count === null ? '...' : count}
        </span>
      </button>
    </div>
  );
};

export default LikeButton;