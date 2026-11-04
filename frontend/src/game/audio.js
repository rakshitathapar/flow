// Tiny placeholder audio engine — original synthesized sounds, no copyrighted assets.
let ctx = null;
const vols = { music: 0.5, sfx: 0.7 };
let musicGain = null,
  musicTimer = null;

function ensure() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export const getVols = () => ({ ...vols });
export function setVol(kind, v) {
  vols[kind] = v;
  if (kind === "music" && musicGain) musicGain.gain.value = v * 0.12;
}
export function startMusic() {
  if (musicTimer) return;
  const c = ensure();
  musicGain = c.createGain();
  musicGain.gain.value = vols.music * 0.12;
  musicGain.connect(c.destination);
  const notes = [261.63, 329.63, 392.0, 523.25, 440.0, 392.0, 329.63, 293.66];
  let i = 0;
  const step = () => {
    try {
      const t = c.currentTime;
      const o = c.createOscillator(),
        g = c.createGain();
      o.type = "sine";
      o.frequency.value = notes[i % notes.length];
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.9, t + 0.5);
      g.gain.linearRampToValueAtTime(0, t + 2.6);
      o.connect(g);
      g.connect(musicGain);
      o.start(t);
      o.stop(t + 2.7);
      const o2 = c.createOscillator(),
        g2 = c.createGain();
      o2.type = "triangle";
      o2.frequency.value = notes[i % notes.length] * 2;
      g2.gain.setValueAtTime(0, t);
      g2.gain.linearRampToValueAtTime(0.18, t + 0.6);
      g2.gain.linearRampToValueAtTime(0, t + 2.2);
      o2.connect(g2);
      g2.connect(musicGain);
      o2.start(t);
      o2.stop(t + 2.3);
      i++;
    } catch (e) {
      /* ignore */
    }
  };
  step();
  musicTimer = setInterval(step, 1700);
}
export function stopMusic() {
  if (musicTimer) clearInterval(musicTimer);
  musicTimer = null;
  musicGain = null;
}

export function sfx(name) {
  if (vols.sfx <= 0.01) return;
  let c;
  try {
    c = ensure();
  } catch (e) {
    return;
  }
  const t = c.currentTime;
  const master = c.createGain();
  master.gain.value = vols.sfx;
  master.connect(c.destination);
  const tone = (f0, f1, dur, type = "sine", vol = 0.18, delay = 0) => {
    const o = c.createOscillator(),
      g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t + delay);
    if (f1 && f1 !== f0)
      o.frequency.exponentialRampToValueAtTime(
        Math.max(f1, 20),
        t + delay + dur,
      );
    g.gain.setValueAtTime(vol, t + delay);
    g.gain.exponentialRampToValueAtTime(0.001, t + delay + dur);
    o.connect(g);
    g.connect(master);
    o.start(t + delay);
    o.stop(t + delay + dur + 0.05);
  };
  switch (name) {
    case "pop":
      tone(320, 70, 0.12, "sine", 0.3);
      break;
    case "click":
      tone(210, 190, 0.05, "square", 0.07);
      break;
    case "page":
      tone(190, 55, 0.28, "triangle", 0.14);
      break;
    case "chime":
      tone(660, 660, 0.3, "sine", 0.14);
      tone(990, 990, 0.42, "sine", 0.1, 0.09);
      break;
    case "tada":
      tone(523, 523, 0.16, "triangle", 0.18);
      tone(659, 659, 0.16, "triangle", 0.18, 0.13);
      tone(784, 784, 0.34, "triangle", 0.2, 0.26);
      break;
    case "boing":
      tone(110, 250, 0.22, "sine", 0.22);
      break;
    case "thud":
      tone(90, 40, 0.18, "sine", 0.3);
      break;
    case "step":
      tone(140, 90, 0.05, "triangle", 0.05);
      break;
    case "balloon":
      tone(240, 480, 0.3, "sine", 0.12);
      break;
    case "whoosh":
      tone(700, 120, 0.3, "sine", 0.1);
      break;
    case "success":
      tone(440, 440, 0.14, "sine", 0.16);
      tone(554, 554, 0.14, "sine", 0.16, 0.11);
      tone(659, 659, 0.3, "sine", 0.18, 0.22);
      break;
    default:
      tone(300, 300, 0.08, "sine", 0.1);
  }
}
