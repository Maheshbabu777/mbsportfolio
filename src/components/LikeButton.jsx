import { useEffect, useRef, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { Heart } from "./Icons";

const Floating = ({ id, onDone }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const dx = (Math.random() - 0.5) * 80, dy = -(70 + Math.random() * 50), rot = (Math.random() - 0.5) * 40;
    const a = el.animate(
      [{ transform: "translate(0,0) scale(.6)", opacity: 1 }, { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(1)`, opacity: 0 }],
      { duration: 900 + Math.random() * 400, easing: "cubic-bezier(.2,.7,.2,1)" }
    );
    a.onfinish = () => onDone(id);
  }, []);
  return <span ref={ref} className="pointer-events-none absolute left-2 top-0 text-fg"><Heart className="size-3.5" filled /></span>;
};

const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } };

const LikeButton = () => {
  const [count, setCount] = useState(null);
  const [liked, setLiked] = useState(false);
  const [hearts, setHearts] = useState([]);
  const likedRef = useRef(false);

  useEffect(() => {
    const has = read("portfolio_liked") === "true";
    setLiked(has); likedRef.current = has;
    (async () => {
      try {
        const ref = doc(db, "portfolio", "likes");
        const snap = await getDoc(ref);
        if (snap.exists()) setCount(snap.data().count);
        else { await setDoc(ref, { count: 0 }); setCount(0); }
      } catch { setCount(0); }
    })();
  }, []);

  const like = async () => {
    const id = `${Date.now()}_${Math.random()}`;
    setHearts((h) => [...h, id]);
    if (likedRef.current || count === null) return;
    likedRef.current = true; setLiked(true); setCount((c) => c + 1); write("portfolio_liked", "true");
    try { await updateDoc(doc(db, "portfolio", "likes"), { count: increment(1) }); } catch { /* offline */ }
  };

  return (
    <button onClick={like} className="chip relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm" aria-label="Like this site">
      {hearts.map((id) => <Floating key={id} id={id} onDone={(x) => setHearts((h) => h.filter((y) => y !== x))} />)}
      <Heart className={`size-4 transition-transform duration-200 ${liked ? "scale-110" : ""}`} filled={liked} />
      <span className="font-mono text-xs">{count === null ? "..." : count}</span>
    </button>
  );
};

export default LikeButton;
