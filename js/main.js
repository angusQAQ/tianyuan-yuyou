import * as THREE from 'three';
import { BALANCE, LEVELS, getLevelItems, drawLevelItems, reshuffleAllPools, resolveItem, getSpots, getCow } from './balance.js';

const canvas = document.getElementById('game');
const goalEl = document.getElementById('goal');
const progressEl = document.getElementById('progress');
const mapLabels = document.getElementById('map-labels');
const levelPanel = document.getElementById('level-panel');
const npcLine = document.getElementById('npc-line');
const npcPortrait = document.getElementById('npc-portrait');
const promptEl = document.getElementById('prompt');
const sentenceCharsEl = document.getElementById('sentence-chars');
const storyZone = document.getElementById('story-zone');
const storyPic = document.getElementById('story-pic');
const tilesEl = document.getElementById('tiles');
const slotsEl = document.getElementById('slots');
const slotZone = document.getElementById('slot-zone');
const poolZone = document.getElementById('pool-zone');
const slotLabel = document.getElementById('slot-label');
const poolLabel = document.getElementById('pool-label');
const dragLayer = document.getElementById('drag-layer');
const btnBack = document.getElementById('btn-back');
const btnMute = document.getElementById('btn-mute');
const volumePanel = document.getElementById('volume-panel');
const volMuteAll = document.getElementById('vol-mute-all');
const volBgm = document.getElementById('vol-bgm');
const volSfx = document.getElementById('vol-sfx');
const btnWrongbook = document.getElementById('btn-wrongbook');
const wrongbookPanel = document.getElementById('wrongbook-panel');
const wbList = document.getElementById('wb-list');
const wbEmpty = document.getElementById('wb-empty');
const btnWbClose = document.getElementById('btn-wb-close');
const btnWbClear = document.getElementById('btn-wb-clear');
const btnRestart = document.getElementById('btn-restart');
const btnWinRestart = document.getElementById('btn-win-restart');
const btnWinHome = document.getElementById('btn-win-home');
const btnHome = document.getElementById('btn-home');
const btnHomeMap = document.getElementById('btn-home-map');
const btnHomeLevel = document.getElementById('btn-home-level');
const btnHint = document.getElementById('btn-hint');
const toastEl = document.getElementById('toast');
const winEl = document.getElementById('win');
const levelClearEl = document.getElementById('level-clear');
const npcRow = document.getElementById('npc-row');
const titleEl = document.getElementById('title');
const tipEl = document.getElementById('tip');
const btnStart = document.getElementById('btn-start');
const btnTipOk = document.getElementById('btn-tip-ok');
const btnTipSkip = document.getElementById('btn-tip-skip');
const btnTipPrev = document.getElementById('btn-tip-prev');
const btnTipNext = document.getElementById('btn-tip-next');
const tutImg = document.getElementById('tut-img');
const tutPage = document.getElementById('tut-page');
const difficultyEl = document.getElementById('difficulty');
const fxPop = document.getElementById('fx-pop');
const fxImg = document.getElementById('fx-img');
const fxMsg = document.getElementById('fx-msg');
const fxExtra = document.getElementById('fx-extra');
const wrongTipEl = document.getElementById('wrong-tip');
const wrongTipBody = document.getElementById('wrong-tip-body');
const btnWrongTipOk = document.getElementById('btn-wrong-tip-ok');
const btnFxOk = document.getElementById('btn-fx-ok');
const loadingEl = document.getElementById('loading');
const loadingArt = document.getElementById('loading-art');

const BG = {
  L1_typo: 'art/bg/bg_l1_veg.png',
  L2_reorder_sentence: 'art/bg/bg_l2_pond.png',
  L3_paragraph: 'art/bg/bg_l3_pasture.png',
  L4_measure: 'art/bg/bg_l4_barn.png',
  L5_picture_sentence: 'art/bg/bg_l5_orchard.png'
};
const NPC_IMG = {
  /** 農夫／一般 NPC（L1／L3／L4） */
  primary: 'art/2d/npc_farmer.png',
  farmer: 'art/2d/npc_farmer.png',
  /** 漁夫：僅魚塘 L2 */
  male: 'art/2d/npc_yufu.png',
  fisherman: 'art/2d/npc_yufu.png'
};

const EMPTY_DONE = () => ({
  L1_typo: false, L2_reorder_sentence: false, L3_paragraph: false, L4_measure: false, L5_picture_sentence: false
});

const state = {
  muted: false,
  bgmVolume: 0.35,
  sfxVolume: 0.5,
  bgm: null,
  bgmSource: null,
  bgmGain: null,
  bgmGraphReady: false,
  bgmUnlocked: false,
  volumePanelOpen: false,
  wrongbookOpen: false,
  scene: 'title',
  tipSeen: false,
  tipPage: 0,
  difficulty: 'medium',
  levelId: null,
  itemIndex: 0,
  currentItem: null,
  /** 本關本次抽出的題目（session draw） */
  runItems: [],
  /** 各關×難度剩餘題隊列 */
  sessionQueues: {},
  done: EMPTY_DONE(),
  hintUsed: false,
  hintIndex: 0,
  pendingAdvance: false,
  locked: false,
  audioCtx: null
};

let renderer, scene, camera, farmMesh, bgMesh, hotspotMeshes = [], kidMesh, kidTex;
let hubTexPortrait = null, hubTexLandscape = null;
/** R35：快取 hub 模式，orientation／模式未變就唔好重設 map */
let hubModeCached = null; // 'portrait' | 'landscape' | null
let cowMesh, cowTexA, cowTexB, cowFrame = 0, cowNext = 0;
let kidBase = { x: -2.4, y: -2.4 };
let kickUntil = 0;
let fxTimer = 0;
const texLoader = new THREE.TextureLoader();


const WRONGBOOK_LS_KEY = 'tyy_wrongbook_r19';

const DIFF_LABEL = { easy: '簡單', medium: '中等', hard: '困難' };
const LEVEL_LABEL = {
  L1_typo: '錯別字判斷',
  L2_reorder_sentence: '重組句子',
  L3_paragraph: '排句成段',
  L4_measure: '量詞填空',
  L5_picture_sentence: '看圖造句'
};

function loadWrongBook() {
  try {
    const raw = localStorage.getItem(WRONGBOOK_LS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch (_) {
    return [];
  }
}

function saveWrongBook(entries) {
  try {
    localStorage.setItem(WRONGBOOK_LS_KEY, JSON.stringify(entries.slice(0, 80)));
  } catch (_) {}
}

function wrongBookDedupeKey(levelId, prompt) {
  return `${levelId}||${String(prompt || '').trim()}`;
}

function formatCorrectAnswer(levelId, item) {
  if (!item) return '';
  if (levelId === 'L1_typo') {
    const w = item.wrongChar || '';
    const c = item.correctChar || '';
    return c ? (w ? `「${w}」→「${c}」` : c) : '';
  }
  if (levelId === 'L4_measure') {
    const ok = (item.choices || []).find((c) => c.correct);
    return ok ? (ok.text || '') : '';
  }
  if (levelId === 'L2_reorder_sentence' || levelId === 'L3_paragraph' || levelId === 'L5_picture_sentence') {
    return Array.isArray(item.order) ? item.order.join('') : '';
  }
  return '';
}

function formatWrongPrompt(levelId, item) {
  if (!item) return '';
  if (levelId === 'L1_typo') return item.sentence || item.prompt || '';
  return item.prompt || item.sentence || '';
}

/** R19：答錯寫入 localStorage；同 level+prompt 覆蓋去重 */
function addWrongBookEntry({ levelId, item, reason, explain } = {}) {
  const lid = levelId || state.levelId;
  const it = item || state.currentItem;
  if (!lid || !it) return;
  const prompt = formatWrongPrompt(lid, it);
  const answer = formatCorrectAnswer(lid, it);
  const entry = {
    levelId: lid,
    difficulty: state.difficulty,
    prompt,
    reason: reason || it.explainWrong || it.distractorHint || '作答不正確',
    explain: explain || it.explainCorrect || it.explainWrong || '',
    answer,
    ts: Date.now()
  };
  const key = wrongBookDedupeKey(lid, prompt);
  const list = loadWrongBook().filter((e) => wrongBookDedupeKey(e.levelId, e.prompt) !== key);
  list.unshift(entry);
  saveWrongBook(list);
}

function formatWbTime(ts) {
  try {
    const d = new Date(ts);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch (_) {
    return '';
  }
}

function renderWrongBookPanel() {
  const list = loadWrongBook();
  if (wbEmpty) wbEmpty.hidden = list.length > 0;
  if (wbList) {
    wbList.hidden = list.length === 0;
    wbList.innerHTML = '';
    for (const e of list) {
      const div = document.createElement('article');
      div.className = 'wb-item';
      const lv = LEVEL_LABEL[e.levelId] || e.levelId || '';
      const diff = DIFF_LABEL[e.difficulty] || e.difficulty || '';
      div.innerHTML = `
        <h3>${escapeHtml(e.prompt || '（無題幹）')}</h3>
        <div class="wb-meta">${escapeHtml(lv)} · ${escapeHtml(diff)} · ${escapeHtml(formatWbTime(e.ts))}</div>
        <p><strong>可能錯因：</strong>${escapeHtml(e.reason || '—')}</p>
        <p><strong>解釋：</strong>${escapeHtml(e.explain || '—')}</p>
        <p class="wb-ans"><strong>正確答案：</strong>${escapeHtml(e.answer || '—')}</p>
      `;
      wbList.appendChild(div);
    }
  }
  if (btnWbClear) btnWbClear.disabled = list.length === 0;
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function setWrongbookOpen(open) {
  state.wrongbookOpen = !!open;
  if (wrongbookPanel) {
    wrongbookPanel.classList.toggle('hidden', !state.wrongbookOpen);
  }
  if (btnWrongbook) btnWrongbook.setAttribute('aria-expanded', state.wrongbookOpen ? 'true' : 'false');
  if (state.wrongbookOpen) {
    setVolumePanelOpen(false);
    renderWrongBookPanel();
  }
}

const VOL_LS_KEY = 'tyy_audio_r17';

function loadVolPrefs() {
  try {
    const raw = localStorage.getItem(VOL_LS_KEY);
    if (!raw) return;
    const j = JSON.parse(raw);
    if (typeof j.muted === 'boolean') state.muted = j.muted;
    if (typeof j.bgm === 'number' && Number.isFinite(j.bgm)) {
      state.bgmVolume = Math.min(1, Math.max(0, j.bgm));
    }
    if (typeof j.sfx === 'number' && Number.isFinite(j.sfx)) {
      state.sfxVolume = Math.min(1, Math.max(0, j.sfx));
    }
  } catch (_) {}
}

function saveVolPrefs() {
  try {
    localStorage.setItem(VOL_LS_KEY, JSON.stringify({
      muted: state.muted,
      bgm: state.bgmVolume,
      sfx: state.sfxVolume
    }));
  } catch (_) {}
}

function ensureAudio() {
  if (!state.audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) state.audioCtx = new AC();
  }
  if (state.audioCtx?.state === 'suspended') {
    try { state.audioCtx.resume(); } catch (_) {}
  }
  return state.audioCtx;
}

/**
 * R19.1：BGM 經單一 AudioContext → MediaElementSource → GainNode → destination。
 * createMediaElementSource 只連一次；HTMLAudio.volume 固定 1.0，響度全靠 gain。
 * iOS Safari 常忽略 HTMLMediaElement.volume，故必須走 GainNode。
 */
function ensureBgmGraph() {
  const ctx = ensureAudio();
  const bgm = ensureBgm();
  if (!ctx || !bgm) return null;
  if (state.bgmGraphReady && state.bgmGain) return state.bgmGain;
  try {
    if (!state.bgmSource) {
      state.bgmSource = ctx.createMediaElementSource(bgm);
    }
    if (!state.bgmGain) {
      state.bgmGain = ctx.createGain();
      const g = state.muted ? 0 : Math.min(1, Math.max(0, state.bgmVolume));
      try {
        state.bgmGain.gain.setValueAtTime(g, ctx.currentTime);
      } catch (_) {
        state.bgmGain.gain.value = g;
      }
    }
    // 只連一次：source → gain → destination
    if (!state.bgmGraphReady) {
      state.bgmSource.connect(state.bgmGain);
      state.bgmGain.connect(ctx.destination);
      state.bgmGraphReady = true;
    }
  } catch (err) {
    console.warn('[tyy] ensureBgmGraph failed', err);
  }
  return state.bgmGain;
}

/** 即時寫 GainNode；muted → 0 */
function setBgmGainValue(vol) {
  const gainNode = state.bgmGain || ensureBgmGraph();
  if (!gainNode) return;
  const v = state.muted ? 0 : Math.min(1, Math.max(0, Number(vol)));
  const ctx = state.audioCtx;
  try {
    if (ctx) gainNode.gain.setValueAtTime(v, ctx.currentTime);
    else gainNode.gain.value = v;
  } catch (_) {
    try { gainNode.gain.value = v; } catch (__) {}
  }
}

/** R17／R19.1：單一 loop BGM；唔喺 load 時 play（等 user gesture） */
function ensureBgm() {
  if (state.bgm) return state.bgm;
  const a = new Audio('audio/bgm/main.mp3');
  a.loop = true;
  a.preload = 'auto';
  // R19.1：element.volume 固定 1；真正響度靠 GainNode（iOS 忽略 volume）
  a.volume = 1.0;
  state.bgm = a;
  return a;
}

function applyAudioState() {
  const bgm = ensureBgm();
  ensureBgmGraph();
  if (bgm) {
    bgm.volume = 1.0;
    if (state.muted) {
      setBgmGainValue(0);
      try { bgm.pause(); } catch (_) {}
    } else {
      setBgmGainValue(state.bgmVolume);
      if (state.bgmUnlocked && bgm.paused) {
        const p = bgm.play();
        if (p && typeof p.catch === 'function') p.catch((err) => {
          console.warn('[tyy] bgm.play failed', err);
        });
      }
    }
  }
  if (btnMute) {
    btnMute.textContent = state.muted ? '🔇' : '🔊';
    btnMute.setAttribute('aria-pressed', state.muted ? 'true' : 'false');
  }
}

function syncVolumePanelUi() {
  if (volMuteAll) volMuteAll.checked = !!state.muted;
  if (volBgm) volBgm.value = String(Math.round(state.bgmVolume * 100));
  if (volSfx) volSfx.value = String(Math.round(state.sfxVolume * 100));
  if (btnMute) {
    btnMute.textContent = state.muted ? '🔇' : '🔊';
    btnMute.setAttribute('aria-expanded', state.volumePanelOpen ? 'true' : 'false');
  }
}

function setVolumePanelOpen(open) {
  state.volumePanelOpen = !!open;
  if (volumePanel) {
    if (state.volumePanelOpen) {
      volumePanel.classList.remove('hidden');
      syncVolumePanelUi();
    } else {
      volumePanel.classList.add('hidden');
    }
  }
  if (btnMute) btnMute.setAttribute('aria-expanded', state.volumePanelOpen ? 'true' : 'false');
}

function setMuted(muted, { toastMsg = true } = {}) {
  state.muted = !!muted;
  applyAudioState();
  saveVolPrefs();
  if (toastMsg) toast(state.muted ? '已靜音' : '已開啟聲音');
}

function beep(kind) {
  if (state.muted || state.sfxVolume <= 0) return;
  ensureAudio();
  const ctx = state.audioCtx;
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination);
  const now = ctx.currentTime;
  const base = kind === 'ok' ? 0.08 : kind === 'bad' ? 0.07 : 0.05;
  const amp = Math.max(0.0001, base * state.sfxVolume);
  if (kind === 'ok') o.frequency.value = 880;
  else if (kind === 'bad') o.frequency.value = 220;
  else o.frequency.value = 520;
  g.gain.setValueAtTime(amp, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  o.start(now); o.stop(now + 0.16);
}

/**
 * R16／R17：resume AudioContext；首次手勢才 play BGM。
 * 禁止 await 音檔；唔阻塞點擊路徑。
 */
function unlockAndPreloadAudio() {
  ensureAudio();
  ensureBgm();
  ensureBgmGraph();
  state.bgmUnlocked = true;
  applyAudioState();
}

/** R16：speak 改為空函數；呼叫點保留，立刻 return（唔載 mp3） */
function speak(_text, _opts) {
  return;
}

/** R16：停用本題／全庫 TTS 預載 */
function ensureTtsCached(_text, _voice) {
  return null;
}
function preloadLevelTts(_item, _level) {
  return;
}

// R16：enqueueSpeakTts／pumpSpeakTtsChunks／preloadSpeakTts 已刪除（禁止呼叫）

/** R36：故事圖 jpg 優先、png fallback；非阻塞載入＋預載下一題 */
const storyPicResolved = new Map(); // logical path → resolved url
let storyPicLoadGen = 0;

function storyPicCandidates(picPath) {
  if (!picPath) return [];
  const s = String(picPath);
  if (/\.jpe?g$/i.test(s)) {
    return [s, s.replace(/\.jpe?g$/i, '.png')];
  }
  if (/\.png$/i.test(s)) {
    return [s.replace(/\.png$/i, '.jpg'), s];
  }
  return [`${s}.jpg`, `${s}.png`, s];
}

function preloadStoryPic(picPath) {
  if (!picPath) return Promise.resolve(null);
  const key = String(picPath);
  const cached = storyPicResolved.get(key);
  if (typeof cached === 'string') return Promise.resolve(cached);
  if (cached && typeof cached.then === 'function') return cached;
  const urls = storyPicCandidates(key);
  const p = new Promise((resolve) => {
    let i = 0;
    const tryNext = () => {
      if (i >= urls.length) {
        storyPicResolved.delete(key);
        resolve(null);
        return;
      }
      const url = urls[i++];
      const img = new Image();
      img.onload = () => {
        storyPicResolved.set(key, url);
        resolve(url);
      };
      img.onerror = () => tryNext();
      img.src = url;
    };
    tryNext();
  });
  storyPicResolved.set(key, p);
  return p;
}

function setStoryPic(picPath) {
  if (!storyPic) return;
  const gen = ++storyPicLoadGen;
  storyPic.classList.add('is-loading');
  storyPic.alt = '故事圖載入中';
  // 唔清舊 src，避免長卡白屏；新圖 ready 先換
  preloadStoryPic(picPath).then((url) => {
    if (gen !== storyPicLoadGen) return;
    if (url) {
      storyPic.src = url;
      storyPic.alt = '故事圖';
    } else {
      storyPic.removeAttribute('src');
      storyPic.alt = '故事圖';
    }
    storyPic.classList.remove('is-loading');
  });
}

function clearStoryPic() {
  storyPicLoadGen += 1;
  if (!storyPic) return;
  storyPic.classList.remove('is-loading');
  storyPic.removeAttribute('src');
  storyPic.alt = '故事圖';
}

function preloadUpcomingStoryPics() {
  if (state.levelId !== 'L5_picture_sentence') return;
  const level = LEVELS[state.levelId];
  const items = activeRunItems();
  const end = Math.min(items.length, state.itemIndex + 3);
  for (let i = state.itemIndex + 1; i < end; i++) {
    const raw = items[i];
    try {
      const item = resolveItem(level, raw, state.difficulty);
      if (item?.pic) preloadStoryPic(item.pic);
    } catch (_) {}
  }
}

function showLoading() {
  if (!loadingEl) return;
  loadingEl.classList.remove('hidden');
  loadingEl.setAttribute('aria-busy', 'true');
  if (loadingArt) {
    const fail = () => {
      loadingEl.classList.add('no-art');
      if (!loadingEl.querySelector('.loading-spinner')) {
        const sp = document.createElement('div');
        sp.className = 'loading-spinner';
        sp.setAttribute('aria-hidden', 'true');
        loadingEl.insertBefore(sp, loadingEl.firstChild);
      }
    };
    if (loadingArt.complete && loadingArt.naturalWidth === 0) fail();
    else loadingArt.addEventListener('error', fail, { once: true });
  }
}

function hideLoading() {
  if (!loadingEl) return;
  loadingEl.classList.add('hidden');
  loadingEl.setAttribute('aria-busy', 'false');
}

/** R9／R16：按下即時視覺＋輕量 WebAudio beep（≤80ms）；禁止 mp3／TTS 阻塞 */
function instantPress(el) {
  if (!el) return;
  el.classList.add('press');
  window.setTimeout(() => el.classList.remove('press'), BALANCE.pressMs || 80);
  try { beep('tap'); } catch (_) {}
}

/**
 * R10：opts.immediate=true → pointerdown 即執行（字塊／選項／熱點，iPhone 不感延遲）
 * 其餘導航掣可維持 down 視覺＋up 觸發，避免拖移誤觸。
 */
function onPointerActivate(el, handler, opts = {}) {
  if (!el || el.dataset.ptrBound === '1') return;
  el.dataset.ptrBound = '1';
  const immediate = !!opts.immediate;
  // R27：allowPan=true → 唔 preventDefault，直向滑動當捲頁；位移超過門檻取消點選
  const allowPan = !!opts.allowPan;
  let armed = false;
  let fromPtr = false;
  let lastAt = 0;
  let startX = 0;
  let startY = 0;
  let panned = false;

  const fire = (e) => {
    const now = performance.now();
    if (now - lastAt < 280) return; // 防雙擊／click 再觸
    lastAt = now;
    fromPtr = true;
    handler(e);
    window.setTimeout(() => { fromPtr = false; }, 350);
  };

  el.addEventListener('pointerdown', (e) => {
    if (e.button != null && e.button !== 0) return;
    if (!allowPan) {
      // 阻止 iOS 後續 300ms click／選取
      try { e.preventDefault(); } catch (_) {}
    }
    armed = true;
    panned = false;
    startX = e.clientX;
    startY = e.clientY;
    instantPress(el);
    if (immediate && !allowPan) fire(e);
  }, { passive: allowPan });

  if (allowPan) {
    el.addEventListener('pointermove', (e) => {
      if (!armed) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 10 || Math.abs(dy) > 10) panned = true;
    }, { passive: true });
  }

  el.addEventListener('pointerup', (e) => {
    if (!armed) return;
    armed = false;
    if (allowPan) {
      if (!panned) fire(e);
      return;
    }
    if (!immediate) fire(e);
  });
  el.addEventListener('pointercancel', () => { armed = false; panned = false; });
  el.addEventListener('click', (e) => {
    if (fromPtr || immediate || allowPan) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    instantPress(el);
    fire(e);
  });
}



/** R13／R16：無獨立播音掣；字塊為純 .tile；speak 已 no-op */
function tileUnit(el) {
  return el;
}

function tileLabelText(tile) {
  if (!tile) return '';
  let s = '';
  for (const node of tile.childNodes) {
    if (node.nodeType === 3) s += node.textContent || ''; // TEXT_NODE only（忽略 .mark alt）
  }
  if (s.trim()) return s.trim();
  const clone = tile.cloneNode(true);
  clone.querySelectorAll?.('.mark')?.forEach((m) => m.remove());
  return (clone.textContent || '').trim();
}

const TUTORIAL_PAGES = [
  'art/ui/tutorial/tut_01_l1_tap.png',
  'art/ui/tutorial/tut_02_l2_tap.png',
  'art/ui/tutorial/tut_03_l3_tap.png',
  'art/ui/tutorial/tut_04_l4_measure.png'
];

/** R7 — 教學圖預載：url → Image（已 decode） */
const tutorialPreloadMap = new Map();
let tutorialPreloadStarted = false;

function preloadTutorialPages() {
  if (tutorialPreloadStarted) return;
  tutorialPreloadStarted = true;
  for (const url of TUTORIAL_PAGES) {
    if (tutorialPreloadMap.has(url)) continue;
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    tutorialPreloadMap.set(url, img);
  }
}

function renderTutorialPage() {
  const total = TUTORIAL_PAGES.length;
  const i = Math.max(0, Math.min(state.tipPage, total - 1));
  state.tipPage = i;
  const url = TUTORIAL_PAGES[i];
  if (tutImg) {
    const pre = tutorialPreloadMap.get(url);
    // 已解碼圖直接換 src，無網路等待；短 fade ≤80ms 僅透明度
    tutImg.classList.remove('tut-fade');
    void tutImg.offsetWidth;
    tutImg.src = (pre && pre.src) ? pre.src : url;
    tutImg.classList.add('tut-fade');
  }
  if (tutPage) tutPage.textContent = `${i + 1} / ${total}`;
  const last = i >= total - 1;
  if (btnTipPrev) btnTipPrev.disabled = i <= 0;
  if (btnTipNext) btnTipNext.classList.toggle('hidden', last);
  if (btnTipOk) btnTipOk.classList.toggle('hidden', !last);
}

function openTutorial() {
  preloadTutorialPages();
  state.tipPage = 0;
  renderTutorialPage();
  tipEl.classList.remove('hidden');
}


const RUN_ITEM_COUNT = 6;

function ensureSessionQueues() {
  if (!state.sessionQueues || !Object.keys(state.sessionQueues).length) {
    state.sessionQueues = reshuffleAllPools();
  }
}

function refreshSessionQueues() {
  state.sessionQueues = reshuffleAllPools();
  state.runItems = [];
}

function activeRunItems() {
  if (Array.isArray(state.runItems) && state.runItems.length) return state.runItems;
  const level = LEVELS[state.levelId];
  if (!level) return [];
  return getLevelItems(level, state.difficulty);
}

function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.remove('hidden');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toastEl.classList.add('hidden'), BALANCE.toastMs);
}

function hideFx() {
  fxPop?.classList.add('hidden');
  clearTimeout(fxTimer);
  syncOverlayBlock();
}

function hideWrongTip() {
  wrongTipEl?.classList.add('hidden');
  syncOverlayBlock();
}

function hideLevelClear() {
  levelClearEl?.classList.add('hidden');
  clearTimeout(hideLevelClear._t);
  syncOverlayBlock();
}

/** R31：提示／答對／通關彈窗是否開著（攔截離關） */
function isOverlayBlocking() {
  return !!(
    (wrongTipEl && !wrongTipEl.classList.contains('hidden'))
    || (fxPop && !fxPop.classList.contains('hidden'))
    || (levelClearEl && !levelClearEl.classList.contains('hidden'))
  );
}

/** R31：提示／答對／通關彈窗開時鎖頂欄與關內離關掣，避免誤觸回主頁／農場 */
function syncOverlayBlock() {
  document.body.classList.toggle('tyy-overlay-open', isOverlayBlocking());
}

function showLevelClearThenMap() {
  hideFx();
  hideWrongTip();
  if (levelClearEl) levelClearEl.classList.remove('hidden');
  syncOverlayBlock();
  speak('本關完成！');
  clearTimeout(hideLevelClear._t);
  // 仍有自動返回，亦可按「返回農場」立即回 map
  hideLevelClear._t = setTimeout(() => {
    hideLevelClear();
    showMap();
  }, 2800);
}

function returnToMapFromLevelClear() {
  clearTimeout(hideLevelClear._t);
  hideLevelClear();
  beep('tap');
  showMap();
}

function showFx(ok, extra) {
  if (!ok) {
    // R31：答錯必須留在當題；取消自動進題 timer／旗標，並可重試
    state.pendingAdvance = false;
    state.locked = false;
    hideFx();
    showWrongTip(extra, '說明');
    return;
  }
  hideWrongTip();
  hideFx();
  if (fxImg) {
    fxImg.src = 'art/fx/fx_success_farmer.png';
    fxImg.alt = '答對了';
  }
  if (fxMsg) fxMsg.textContent = '答對了！真好。';
  if (fxExtra) {
    const text = (extra || '').trim();
    if (text) {
      fxExtra.textContent = text;
      fxExtra.classList.remove('hidden');
    } else {
      fxExtra.textContent = '';
      fxExtra.classList.add('hidden');
    }
  }
  fxPop?.classList.remove('hidden');
  syncOverlayBlock();
  // R18：正確回饋後自動下一題；仍可按「繼續」立刻進
  clearTimeout(fxTimer);
  fxTimer = setTimeout(() => {
    if (!state.pendingAdvance) return;
    hideFx();
    state.pendingAdvance = false;
    advanceAfterCorrect();
  }, Math.max(2200, BALANCE.fxOkMs || 1100));
}

function isEmptyPraiseHint(s) {
  const t = (s || '').trim();
  if (!t) return true;
  return /^(再想一想，你可以的。?|你可以的。?|加油！?|請再細心想一想。?|留意題目中的關鍵詞。?|留意題目要求，仔細比較。?|再想一想。?)$/.test(t);
}

function showWrongTip(extra, title) {
  // R31：提示／答錯彈窗開著時不准自動進題或離關
  state.pendingAdvance = false;
  state.locked = false;
  hideFx();
  document.querySelectorAll('.mark.bad').forEach((m) => m.remove());
  const tip = (extra || '').trim();
  const isHint = (title || '') === '提示';
  // R11：主文＝本題線索；答錯可附短「請再試」；禁空泛稱讚
  let body;
  if (tip && !isEmptyPraiseHint(tip)) {
    body = (isHint || /再試/.test(tip)) ? tip : `${tip}\n請再試一次。`;
  } else {
    body = isHint ? '留意本題的形近字、時間詞或因果邊。' : '請再試一次。';
  }
  if (wrongTipBody) wrongTipBody.textContent = body;
  const h3 = wrongTipEl?.querySelector('h3');
  if (h3) h3.textContent = title || '說明';
  wrongTipEl?.classList.remove('hidden');
  syncOverlayBlock();
}

function shuffled(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pointer(e) {
  if (e.changedTouches?.[0]) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  if (e.touches?.[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  return { x: e.clientX, y: e.clientY };
}

function loadTex(url) {
  return new Promise((resolve, reject) => {
    texLoader.load(url, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      resolve(t);
    }, undefined, reject);
  });
}


/** R35：Desktop（闊螢幕／精細指標）永遠 landscape，禁讀／切 portrait */
function isDesktopHub() {
  return window.matchMedia('(min-width: 900px)').matches
    || window.matchMedia('(pointer: fine) and (min-width: 768px)').matches;
}

/** R35：只在真正豎屏行動裝置用 portrait；Desktop 鎖死 landscape */
function getHubMode() {
  if (isDesktopHub()) return 'landscape';
  return window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';
}

function isPortraitOrientation() {
  return getHubMode() === 'portrait';
}

function activeSpots() {
  return getSpots(isPortraitOrientation());
}

function activeCow() {
  return getCow(isPortraitOrientation());
}

let hubMapChangeCount = 0;

function applyHubBackground() {
  if (!farmMesh) return;
  const mode = getHubMode();
  const tex = mode === 'portrait' ? hubTexPortrait : hubTexLandscape;
  if (!tex) return;
  // 模式未變且已是同一張貼圖 → 唔重設（禁輪播／resize 無故換圖源）
  if (hubModeCached === mode && farmMesh.material.map === tex) return;
  const prevMode = hubModeCached;
  hubModeCached = mode;
  if (farmMesh.material.map !== tex) {
    farmMesh.material.map = tex;
    farmMesh.material.color.set(0xffffff);
    farmMesh.material.needsUpdate = true;
    hubMapChangeCount += 1;
  } else if (prevMode !== mode) {
    // 模式變但貼圖偶發相同（未載入）仍記一次，方便自測
    hubMapChangeCount += 1;
  }
}

function worldFromNorm(nx, ny) {
  // Map 0–1 farm-texture coords onto the farm plane (letterbox-safe).
  if (farmMesh) {
    const sx = farmMesh.scale.x;
    const sy = farmMesh.scale.y;
    const w = 14 * sx;
    const h = 9 * sy;
    const left = farmMesh.position.x - w / 2;
    const top = farmMesh.position.y + h / 2;
    return new THREE.Vector3(left + nx * w, top - ny * h, 0.1);
  }
  const w = camera.right - camera.left;
  const h = camera.top - camera.bottom;
  return new THREE.Vector3(camera.left + nx * w, camera.top - ny * h, 0.1);
}

function layoutHotspotMeshes() {
  const spots = activeSpots();
  hotspotMeshes.forEach((m) => {
    const spot = spots.find((s) => s.id === m.userData.spotId);
    if (!spot) return;
    const p = worldFromNorm(spot.x, spot.y);
    m.position.set(p.x, p.y, 0.05);
  });
}

function layoutHotspotLabels() {
  if (!camera) return;
  const spots = activeSpots();
  const viewW = camera.right - camera.left;
  const viewH = camera.top - camera.bottom;
  mapLabels.querySelectorAll('.hotspot-label').forEach((el) => {
    const spot = spots.find((s) => s.levelId === el.dataset.levelId);
    if (spot) {
      el.dataset.x = String(spot.x);
      el.dataset.y = String(spot.y);
    }
    const p = worldFromNorm(parseFloat(el.dataset.x), parseFloat(el.dataset.y));
    const leftPct = ((p.x - camera.left) / viewW) * 100;
    const topPct = ((camera.top - p.y) / viewH) * 100;
    el.style.left = `${leftPct}%`;
    el.style.top = `${topPct}%`;
  });
}

function layoutCow() {
  if (!cowMesh) return;
  const cow = activeCow();
  const p = worldFromNorm(cow.x, cow.y);
  cowMesh.position.set(p.x, p.y, 0.22);
  const viewH = camera.top - camera.bottom;
  const target = viewH * 0.11;
  cowMesh.scale.set(target / 1.6, target / 1.15, 1);
}

function layoutKidOnSpot() {
  if (!kidMesh) return;
  const spot = activeSpots().find((s) => s.levelId === state.levelId);
  if (state.scene === 'level' && spot) {
    const p = worldFromNorm(spot.x, spot.y);
    kidBase = { x: p.x - 1.3, y: p.y - 1.0 };
    kidMesh.position.set(kidBase.x, kidBase.y, 0.25);
  }
}

/** R27：portrait 選關（map／win）開放直向捲 */
function isPortraitHubScroll() {
  return isPortraitOrientation()
    && (state.scene === 'map' || state.scene === 'win')
    && !document.body.classList.contains('in-level');
}

function syncHubScrollMode() {
  const on = isPortraitHubScroll();
  document.body.classList.toggle('in-hub', on);
  document.documentElement.classList.toggle('in-hub', on);
  if (!on) {
    document.documentElement.style.removeProperty('--tyy-hub-scroll-h');
    if (canvas) {
      canvas.style.height = '';
      canvas.style.width = '';
    }
  }
}

function resize() {
  syncTopbarHeightVar();
  syncHubScrollMode();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const hubScroll = isPortraitHubScroll();
  // R27：portrait hub — 全寬 contain，畫布高度＝width/(9/16)（720×1280＝9:16）
  // 頁面可捲過成張圖；矮於視口時唔拉高留白（body 底色露出即可）
  let contentH = vh;
  if (hubScroll) {
    // R27：全寬 9:16 內容高；R33：地圖由 CSS 推到 --tyy-topbar-h 下方，最頂關完整可見
    contentH = Math.max(1, Math.ceil(vw / (9 / 16)));
    document.documentElement.style.setProperty('--tyy-hub-scroll-h', `${contentH}px`);
    if (canvas) {
      canvas.style.width = '100%';
      canvas.style.height = `${contentH}px`;
    }
  }
  const w = vw;
  const h = contentH;
  renderer.setSize(w, h, false);
  const aspect = w / h;
  const viewH = 10;
  const viewW = viewH * aspect;
  camera.left = -viewW / 2; camera.right = viewW / 2;
  camera.top = viewH / 2; camera.bottom = -viewH / 2;
  camera.updateProjectionMatrix();
  applyHubBackground();
  // R25：Hub／關卡圖 contain（letterbox），禁 cover 裁邊導致熱點走位
  // R27 portrait hub：畫布已係 9:16，farm 近乎填滿（全寬 contain）
  if (farmMesh) {
    const portrait = isPortraitOrientation();
    // hub_bg_portrait 720×1280＝9:16；hub_bg_landscape 1280×720＝16:9
    const imgAspect = portrait ? (9 / 16) : (16 / 9);
    const viewAspect = viewW / viewH;
    let pw, ph;
    if (viewAspect > imgAspect) {
      // 視口較闊 → 以高為準，左右露邊
      ph = viewH * 0.98;
      pw = ph * imgAspect;
    } else {
      // 視口較窄／高 → 以寬為準，上下露邊
      pw = viewW * 0.98;
      ph = pw / imgAspect;
    }
    farmMesh.scale.set(pw / 14, ph / 9, 1);
    farmMesh.position.y = 0;
  }
  if (bgMesh) {
    // 關卡 bg_* 皆 1280×720 → contain 16:9
    const imgAspect = 16 / 9;
    const viewAspect = viewW / viewH;
    let pw, ph;
    if (viewAspect > imgAspect) {
      ph = viewH * 0.98;
      pw = ph * imgAspect;
    } else {
      pw = viewW * 0.98;
      ph = pw / imgAspect;
    }
    bgMesh.scale.set(pw / 16, ph / 10, 1);
  }
  layoutHotspotMeshes();
  layoutHotspotLabels();
  layoutCow();
  layoutKidOnSpot();
}

async function initThree() {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  scene = new THREE.Scene();
  // R25 letterbox：草地綠／淡天空，禁刺眼黑
  scene.background = new THREE.Color(0xa8c98a);
  camera = new THREE.OrthographicCamera(-8, 8, 5, -5, 0.1, 100);
  camera.position.z = 10;

  bgMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 10),
    new THREE.MeshBasicMaterial({ color: 0xb7e4a8 })
  );
  bgMesh.position.z = -0.02;
  bgMesh.visible = false;
  scene.add(bgMesh);

  farmMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 9),
    new THREE.MeshBasicMaterial({ color: 0x8fbc6b })
  );
  farmMesh.position.z = 0;
  scene.add(farmMesh);

  // R11：Hub 貼圖加時限，唔永久卡住 loading
  const hubDeadline = new Promise((resolve) => setTimeout(resolve, 4500));
  try {
    const hubJob = Promise.all([
      loadTex('art/bg/hub_bg_landscape.png'),
      loadTex('art/bg/hub_bg_portrait.png')
    ]).then(([land, port]) => {
      hubTexLandscape = land;
      hubTexPortrait = port;
      applyHubBackground();
    });
    await Promise.race([hubJob, hubDeadline]);
    if (!hubTexLandscape && !hubTexPortrait) {
      // 逾時：背景繼續載，先放行 title
      hubJob.catch((e) => console.warn('hub_bg load fail', e));
    }
  } catch (e) {
    console.warn('hub_bg load fail', e);
    try {
      const farmTex = await loadTex('art/2d/farm_map.png');
      farmMesh.material.map = farmTex;
      farmMesh.material.color.set(0xffffff);
      farmMesh.material.needsUpdate = true;
    } catch (e2) {
      console.warn('farm_map load fail', e2);
    }
  }

  activeSpots().forEach((spot) => {
    const m = new THREE.Mesh(
      new THREE.CircleGeometry(0.55, 24),
      new THREE.MeshBasicMaterial({ color: spot.color, transparent: true, opacity: 0.35 })
    );
    m.userData = { spotId: spot.id, levelId: spot.levelId };
    scene.add(m);
    hotspotMeshes.push(m);
  });

  kidMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 1.8),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, alphaTest: 0.05, depthWrite: false })
  );
  kidMesh.position.set(-2.4, -2.4, 0.25);
  scene.add(kidMesh);

  cowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 1.15),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, alphaTest: 0.05, depthWrite: false })
  );
  cowMesh.position.z = 0.22;
  scene.add(cowMesh);

  window.addEventListener('resize', () => { syncTopbarHeightVar(); resize(); });
  window.addEventListener('orientationchange', () => {
    setTimeout(resize, 80);
  });
  resize();
  buildMapLabels();
}

/** R11：首屏後再載 kid／cow／NPC，減 iPhone 開頁阻塞 */
function preloadSecondaryArt() {
  loadTex('art/2d/player_kid.png').then((tex) => {
    kidTex = tex;
    if (kidMesh) {
      kidMesh.material.map = kidTex;
      kidMesh.material.transparent = true;
      kidMesh.material.alphaTest = 0.05;
      kidMesh.material.depthWrite = false;
      kidMesh.material.needsUpdate = true;
    }
  }).catch(() => {});
  Promise.all([
    loadTex('art/2d/animal_cow_a.png'),
    loadTex('art/2d/animal_cow_b.png')
  ]).then(([a, b]) => {
    cowTexA = a;
    cowTexB = b;
    if (cowMesh) {
      cowMesh.material.map = cowTexA;
      cowMesh.material.needsUpdate = true;
    }
  }).catch((e) => console.warn('cow load fail', e));
  loadTex('art/2d/npc_farmer.png').catch(() => {});
  loadTex('art/2d/npc_yufu.png').catch(() => {});
}

function buildMapLabels() {
  mapLabels.innerHTML = '';
  // 以橫向表建立熱點節點（id 固定，含果園 L5）；座標由 layoutHotspotLabels 依方向覆寫
  BALANCE.spotsLandscape.forEach((spot, i) => {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'hotspot-label';
    el.dataset.x = spot.x;
    el.dataset.y = spot.y;
    el.dataset.levelId = spot.levelId;
    const label = document.createElement('span');
    label.className = 'hotspot-text';
    label.textContent = spot.name;
    el.appendChild(label);
    const stamp = document.createElement('img');
    stamp.className = 'stamp-done hidden';
    stamp.src = 'art/ui/stamp_done.png';
    stamp.alt = '已完成';
    el.appendChild(stamp);
    if (i === 0) el.classList.add('glow');
    onPointerActivate(el, () => enterLevel(spot.levelId), { immediate: true, allowPan: true });
    mapLabels.appendChild(el);
  });
  layoutHotspotLabels();
}

function refreshMapLabels() {
  mapLabels.querySelectorAll('.hotspot-label').forEach((el) => {
    const done = !!state.done[el.dataset.levelId];
    el.classList.toggle('done', done);
    el.classList.remove('glow');
    const stamp = el.querySelector('.stamp-done');
    if (stamp) stamp.classList.toggle('hidden', !done);
  });
  const next = activeSpots().find((s) => !state.done[s.levelId]);
  if (next) {
    const el = [...mapLabels.children].find((c) => c.dataset.levelId === next.levelId);
    if (el) el.classList.add('glow');
  }
}

function setLevelBackground(levelId) {
  const url = BG[levelId];
  if (!url) { bgMesh.visible = false; return; }
  loadTex(url).then((tex) => {
    bgMesh.material.map = tex;
    bgMesh.material.color.set(0xffffff);
    bgMesh.material.needsUpdate = true;
    bgMesh.visible = true;
    farmMesh.visible = false;
    if (cowMesh) cowMesh.visible = false;
    resize();
  }).catch(() => { bgMesh.visible = false; });
}

function setHomeVisible(showTop, showMap) {
  // R33：關內永不顯示「回主頁」
  if (document.body.classList.contains('in-level') || state.scene === 'level') {
    showTop = false;
    showMap = false;
  }
  btnHome.classList.toggle('hidden', !showTop);
  btnHomeMap.classList.toggle('hidden', !showMap);
  if (btnHomeLevel) btnHomeLevel.classList.add('hidden');
}

/** R19：關卡模式為 body 加 in-level，驅動 portrait 填滿 CSS；農場地圖唔加 */
function setInLevelHud(on) {
  document.body.classList.toggle('in-level', !!on);
  syncTopbarHeightVar();
  // R20：wrap／safe-area 後再量一次，確保 --tyy-topbar-h 含真實高度
  requestAnimationFrame(() => {
    syncTopbarHeightVar();
    requestAnimationFrame(syncTopbarHeightVar);
  });
}

function syncTopbarHeightVar() {
  const tb = document.getElementById('topbar');
  if (!tb) return;
  // R20：用 viewport 頂到 topbar 底（含 safe-area padding＋wrap 實際高度），避免 level-panel 蓋掣
  const rect = tb.getBoundingClientRect();
  const h = Math.max(Math.ceil(rect.bottom), Math.ceil(rect.height || 0), 56);
  document.documentElement.style.setProperty('--tyy-topbar-h', `${h}px`);
}

function resetKidHome() {
  kidBase = { x: -2.4, y: -2.4 };
  if (kidMesh) {
    kidMesh.visible = true;
    kidMesh.position.set(kidBase.x, kidBase.y, 0.25);
  }
}

function showTitle() {
  state.scene = 'title';
  state.locked = false;
  setInLevelHud(false);
  syncHubScrollMode();
  try { window.scrollTo(0, 0); } catch (_) {}
  try { if (renderer) resize(); } catch (_) {}
  hideFx();
  hideLevelClear();
  preloadTutorialPages();
  titleEl.classList.remove('hidden');
  difficultyEl.classList.add('hidden');
  tipEl.classList.add('hidden');
  levelPanel.classList.add('hidden');
  winEl.classList.add('hidden');
  mapLabels.classList.add('hidden');
  farmMesh.visible = true;
  bgMesh.visible = false;
  if (cowMesh) cowMesh.visible = true;
  resetKidHome();
  setHomeVisible(false, false);
  goalEl.textContent = '田園語遊';
  progressEl.textContent = '';
}

function showDifficulty() {
  state.scene = 'difficulty';
  state.locked = false;
  setInLevelHud(false);
  syncHubScrollMode();
  try { window.scrollTo(0, 0); } catch (_) {}
  try { if (renderer) resize(); } catch (_) {}
  hideFx();
  refreshSessionQueues();
  preloadTutorialPages();
  titleEl.classList.add('hidden');
  difficultyEl.classList.remove('hidden');
  tipEl.classList.add('hidden');
  levelPanel.classList.add('hidden');
  winEl.classList.add('hidden');
  mapLabels.classList.add('hidden');
  if (cowMesh) cowMesh.visible = true;
  setHomeVisible(false, false);
  goalEl.textContent = '請選擇難度';
  progressEl.textContent = '';
}

function dismissTip() {
  state.tipSeen = true;
  tipEl.classList.add('hidden');
}

function showMap() {
  state.scene = 'map';
  state.locked = false;
  setInLevelHud(false);
  hideFx();
  hideLevelClear();
  titleEl.classList.add('hidden');
  difficultyEl.classList.add('hidden');
  state.levelId = null;
  levelPanel.classList.add('hidden');
  winEl.classList.add('hidden');
  mapLabels.classList.remove('hidden');
  farmMesh.visible = true;
  bgMesh.visible = false;
  if (cowMesh) cowMesh.visible = true;
  resetKidHome();
  setHomeVisible(true, true);
  goalEl.textContent = '請選擇一個地點';
  const doneCount = Object.values(state.done).filter(Boolean).length;
  progressEl.textContent = `完成 ${doneCount}/5`;
  refreshMapLabels();
  if (doneCount === 5) {
    state.scene = 'win';
    winEl.classList.remove('hidden');
    setHomeVisible(true, false);
  } else if (!state.tipSeen) {
    openTutorial();
  }
  try { window.scrollTo(0, 0); } catch (_) {}
  resize();
}

function enterLevel(levelId) {
  unlockAndPreloadAudio();
  const level = LEVELS[levelId];
  if (!level) return;
  hideLevelClear();
  dismissTip();
  state.tipSeen = true;
  tipEl.classList.add('hidden');
  titleEl.classList.add('hidden');
  difficultyEl.classList.add('hidden');
  state.scene = 'level';
  setInLevelHud(true);
  syncHubScrollMode();
  try { window.scrollTo(0, 0); } catch (_) {}
  state.levelId = levelId;
  state.itemIndex = 0;
  state.locked = false;
  ensureSessionQueues();
  state.runItems = drawLevelItems(LEVELS[levelId], state.difficulty, state, RUN_ITEM_COUNT);
  mapLabels.classList.add('hidden');
  levelPanel.classList.remove('hidden');
  winEl.classList.add('hidden');
  // R33：關內禁「回主頁」（頂欄／關底皆唔顯示）
  setHomeVisible(false, false);
  setLevelBackground(levelId);
  const npcName = (level.npc || '').trim();
  if (npcRow) {
    if (npcName) {
      npcRow.classList.remove('hidden');
      if (npcPortrait) {
        npcPortrait.src = level.id === 'L2_reorder_sentence' ? (NPC_IMG.fisherman || NPC_IMG.male) : (NPC_IMG[level.voice] || NPC_IMG.farmer || NPC_IMG.primary);
        npcPortrait.classList.remove('hidden');
      }
    } else {
      npcRow.classList.add('hidden');
    }
  } else if (npcPortrait) {
    npcPortrait.src = level.id === 'L2_reorder_sentence' ? (NPC_IMG.fisherman || NPC_IMG.male) : (NPC_IMG[level.voice] || NPC_IMG.farmer || NPC_IMG.primary);
  }
  goalEl.textContent = activeSpots().find((s) => s.levelId === levelId)?.name || level.goal;
  if (levelId === 'L5_picture_sentence') {
    // 進關即預載首幾題 JPG（唔阻 render）
    const run = state.runItems || [];
    for (let i = 0; i < Math.min(3, run.length); i++) {
      try {
        const it = resolveItem(level, run[i], state.difficulty);
        if (it?.pic) preloadStoryPic(it.pic);
      } catch (_) {}
    }
  }
  renderItem();
  layoutKidOnSpot();
  if (kidMesh) kidMesh.visible = true;
  beep('tap');
}

function renderItem() {
  const level = LEVELS[state.levelId];
  const items = activeRunItems();
  const raw = items[state.itemIndex];
  const item = resolveItem(level, raw, state.difficulty);
  state.currentItem = item;
  // R16：preloadLevelTts 停用（no-op 保留函式）
  state.hintUsed = false;
  state.hintIndex = 0;
  state.pendingAdvance = false;
  state.locked = false;
  btnHint.disabled = false;
  hideFx();
  hideWrongTip();
  const total = items.length;
  const diffLabel = BALANCE.difficulty[state.difficulty]?.label || '';
  progressEl.textContent = `本關 ${state.itemIndex + 1}/${total}・${diffLabel}`;
  if (npcLine) {
    const npcName = (level.npc || '').trim();
    npcLine.textContent = npcName ? `${npcName}：請仔細作答。` : '';
  }
  promptEl.textContent = item.prompt;
  // R16：無 TTS；點選只靠 instantPress 視覺＋可選 beep
  tilesEl.innerHTML = '';
  slotsEl.innerHTML = '';
  if (sentenceCharsEl) sentenceCharsEl.innerHTML = '';
  const willShowPic = state.levelId === 'L5_picture_sentence' && item?.pic;
  if (storyZone && !willShowPic) storyZone.classList.add('hidden');
  if (!willShowPic) {
    clearStoryPic();
    if (levelPanel) levelPanel.classList.remove('has-story');
  }
  slotZone.classList.add('hidden');
  poolZone.classList.remove('sentences');
  slotZone.classList.remove('sentences');
  poolZone.classList.remove('hidden');

  if (level.id === 'L1_typo') {
    poolZone.classList.add('hidden');
    if (sentenceCharsEl) {
      sentenceCharsEl.classList.remove('hidden');
      const chars = Array.from(item.sentence || '');
      const punctRe = /[\u3002\uff01\uff1f\uff0c\u3001\uff1b\uff1a\u2026\u201c\u201d\u2018\u2019\s]/;
      chars.forEach((ch, idx) => {
        const isPunct = punctRe.test(ch);
        if (isPunct) {
          const span = document.createElement('span');
          span.className = 'char-punct';
          span.textContent = ch;
          sentenceCharsEl.appendChild(span);
        } else {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'char-btn';
          btn.textContent = ch;
          btn.dataset.index = String(idx);
          onPointerActivate(btn, () => onTapSentenceChar(btn, idx, item), { immediate: true });
          sentenceCharsEl.appendChild(btn);
        }
      });
    }
  } else if (level.verb === 'tap') {
    if (sentenceCharsEl) sentenceCharsEl.classList.add('hidden');
    poolLabel.textContent = '請選擇答案';
    const choices = shuffled(item.choices);
    choices.forEach((c) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tile';
      btn.textContent = c.text;
      onPointerActivate(btn, () => onTapChoice(btn, c, item), { immediate: true });
      tilesEl.appendChild(btn);
    });
  } else {
    if (sentenceCharsEl) sentenceCharsEl.classList.add('hidden');
    const isPara = state.levelId === 'L3_paragraph';
    const isPic = state.levelId === 'L5_picture_sentence';
    const isReorder = state.levelId === 'L2_reorder_sentence' || isPara || isPic;
    if (isPic && storyZone && storyPic && item.pic) {
      storyZone.classList.remove('hidden');
      setStoryPic(item.pic);
      if (levelPanel) levelPanel.classList.add('has-story');
      // 非阻塞：開題即顯示字塊／空格；背景預載下一～兩題
      preloadUpcomingStoryPics();
    } else if (levelPanel) {
      levelPanel.classList.remove('has-story');
    }
    slotZone.classList.remove('hidden');
    slotLabel.textContent = isPara
      ? '請點選句子，依序填入空格'
      : (isPic ? '請把合圖的字詞依序填入空格' : '點選字塊依序填入');
    poolLabel.textContent = isPara
      ? '句子（點一下填入）'
      : (isPic ? '字詞池（點一下填入；含干擾詞）' : '字塊（點一下填入）');
    slotZone.classList.toggle('sentences', isPara);
    poolZone.classList.toggle('sentences', isPara);
    const sourcePieces = isPic && Array.isArray(item.pool) && item.pool.length
      ? [...item.pool]
      : [...item.order];
    const pieces = shuffled(sourcePieces);
    if (pieces.join('|') === (isPic ? item.order : item.order).join('|') && pieces.length > 1) {
      pieces.push(pieces.shift());
    }
    // 若洗牌後仍剛好等於正確 order（僅 L2 無干擾時），再錯開
    if (!isPic && pieces.join('|') === item.order.join('|') && pieces.length > 1) {
      pieces.push(pieces.shift());
    }
    item.order.forEach((_, i) => {
      const slot = document.createElement('div');
      slot.className = 'slot';
      slot.dataset.i = String(i);
      const num = document.createElement('span');
      num.className = 'slot-num';
      num.textContent = String(i + 1);
      slot.appendChild(num);
      slotsEl.appendChild(slot);
    });
    pieces.forEach((text) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'tile';
      el.textContent = text;
      if (isReorder) enableClickToSlot(el);
      else enableDragToSlot(el);
      tilesEl.appendChild(el);
    });
  }
}

function clearMarks(root) {
  root.querySelectorAll('.mark').forEach((m) => m.remove());
  root.querySelectorAll('.tile').forEach((t) => t.classList.remove('correct', 'wrong'));
  slotsEl?.querySelectorAll('.slot').forEach((s) => s.classList.remove('wrong'));
}

function addMark(tile, ok) {
  const m = document.createElement('img');
  m.className = `mark ${ok ? 'ok' : 'bad'}`;
  m.alt = ok ? '正確' : '錯誤';
  m.src = ok ? 'art/2d/feedback_ok.png' : 'art/2d/feedback_bad.png';
  tile.appendChild(m);
}

function onTapSentenceChar(btn, idx, item) {
  ensureAudio();
  speak(btn.textContent || '');
  if (state.locked) return;
  if (idx === item.wrongIndex) {
    state.locked = true;
    btn.classList.add('wrong-found');
    kickUntil = performance.now() + 120;
    beep('ok');
    speak(item.speak);
    state.pendingAdvance = true;
    showFx(true, item.explainCorrect || `這句的錯字是「${item.wrongChar}」，應寫作「${item.correctChar}」。`);
  } else {
    // R31：答錯留當題；清自動進題，可繼續點其他字
    state.pendingAdvance = false;
    state.locked = false;
    try { clearTimeout(fxTimer); } catch (_) {}
    btn.classList.add('wrong');
    setTimeout(() => btn.classList.remove('wrong'), 400);
    beep('bad');
    const reason = item.explainWrong || '這個字沒有寫錯，請再找別的字。';
    addWrongBookEntry({
      levelId: state.levelId,
      item,
      reason,
      explain: item.explainCorrect || `錯字應寫作「${item.correctChar || ''}」。`
    });
    showFx(false, reason);
  }
}

function onTapChoice(tile, choice, item) {
  ensureAudio();
  speak(choice.text || tile.textContent || '');
  if (state.locked) return;
  clearMarks(tilesEl);
  if (choice.correct) {
    state.locked = true;
    tile.classList.add('correct');
    addMark(tile, true);
    kickUntil = performance.now() + 120;
    beep('ok');
    speak(item.speak);
    state.pendingAdvance = true;
    showFx(true, item.explainCorrect || choice.hint || '');
  } else {
    // R31：答錯留當題；清自動進題，可重選
    state.pendingAdvance = false;
    state.locked = false;
    try { clearTimeout(fxTimer); } catch (_) {}
    tile.classList.add('wrong');
    beep('bad');
    const extra = choice.hint || item.explainWrong || '這個答案不正確，請再試。';
    addWrongBookEntry({
      levelId: state.levelId,
      item,
      reason: extra,
      explain: item.explainCorrect || item.explainWrong || extra
    });
    showFx(false, extra);
  }
}


function firstEmptySlot() {
  return [...slotsEl.querySelectorAll('.slot')].find((s) => !s.querySelector('.tile'));
}

/** L2／L3／L5：點擊字塊／句塊依序填入空格；再點已填塊可退回字塊區 */
function enableClickToSlot(el) {
  onPointerActivate(el, () => {
    ensureAudio();
    // R16：speak no-op；視覺由 instantPress 處理
    speak(tileLabelText(el));
    if (state.locked) return;
    const unit = tileUnit(el);
    const inSlot = unit.parentElement?.classList?.contains('slot');
    if (inSlot) {
      // 抽回字塊：清錯標、唔判；未滿唔呼叫 checkDrag
      clearMarks(levelPanel);
      hideWrongTip();
      tilesEl.appendChild(unit);
      return;
    }
    const slot = firstEmptySlot();
    if (!slot) {
      showFx(false, '空格已滿。若要改排，請先點空格中的句子退回。');
      beep('bad');
      return;
    }
    clearMarks(levelPanel);
    hideWrongTip();
    slot.appendChild(unit);
    // R18：最後一格填入即自動判定（唔使核對）
    if (!firstEmptySlot()) checkDrag();
  }, { immediate: true });
}

function enableDragToSlot(el) {
  let dragging = false;
  let offsetX = 0, offsetY = 0;
  let originParent = null;
  let placeholder = null;
  let pointerId = null;
  const unit = () => tileUnit(el);

  function clearHover() {
    document.querySelectorAll('.slot.hover').forEach((s) => s.classList.remove('hover'));
  }

  function onDown(e) {
    if (e.button != null && e.button !== 0) return;
    ensureAudio();
    speak(tileLabelText(el));
    if (state.locked) return;
    e.preventDefault();
    ensureAudio();
    dragging = true;
    pointerId = e.pointerId;
    const p = pointer(e);
    const moveEl = unit();
    const rect = moveEl.getBoundingClientRect();
    offsetX = p.x - rect.left;
    offsetY = p.y - rect.top;
    originParent = moveEl.parentElement;
    placeholder = document.createElement('div');
    placeholder.className = 'tile-ph';
    placeholder.style.width = `${rect.width}px`;
    placeholder.style.height = `${rect.height}px`;
    originParent.insertBefore(placeholder, moveEl);
    dragLayer.appendChild(moveEl);
    moveEl.classList.add('dragging', 'press');
    moveEl.style.position = 'fixed';
    moveEl.style.left = `${rect.left}px`;
    moveEl.style.top = `${rect.top}px`;
    moveEl.style.width = `${rect.width}px`;
    moveEl.style.margin = '0';
    moveEl.style.zIndex = '60';
    moveEl.style.pointerEvents = 'none';
    try { el.setPointerCapture(e.pointerId); } catch (_) {}
    setTimeout(() => moveEl.classList.remove('press'), BALANCE.pressMs);
  }

  function onMove(e) {
    if (!dragging) return;
    const p = pointer(e);
    const moveEl = unit();
    moveEl.style.left = `${p.x - offsetX}px`;
    moveEl.style.top = `${p.y - offsetY}px`;
    clearHover();
    const under = document.elementFromPoint(p.x, p.y);
    const slot = under?.closest?.('.slot');
    if (slot) slot.classList.add('hover');
  }

  function onUp(e) {
    if (!dragging) return;
    dragging = false;
    const p = pointer(e);
    clearHover();
    const under = document.elementFromPoint(p.x, p.y);
    const slot = under?.closest?.('.slot');
    const inPool = !!(under?.closest?.('#tiles') || under?.closest?.('#pool-zone'));
    const moveEl = unit();
    moveEl.classList.remove('dragging');
    moveEl.style.position = '';
    moveEl.style.left = '';
    moveEl.style.top = '';
    moveEl.style.width = '';
    moveEl.style.margin = '';
    moveEl.style.zIndex = '';
    moveEl.style.pointerEvents = '';
    if (placeholder?.parentNode) placeholder.remove();
    placeholder = null;
    if (slot) {
      const existing = slot.querySelector('.tile');
      if (existing && existing !== el) tilesEl.appendChild(tileUnit(existing));
      clearMarks(levelPanel);
      hideWrongTip();
      slot.appendChild(moveEl);
      beep('tap');
      // R18：填滿即判
      if (!firstEmptySlot()) checkDrag();
    } else if (inPool) {
      clearMarks(levelPanel);
      hideWrongTip();
      tilesEl.appendChild(moveEl);
      beep('tap');
    } else if (originParent) {
      originParent.appendChild(moveEl);
    } else {
      tilesEl.appendChild(moveEl);
    }
    originParent = null;
    try { if (pointerId != null) el.releasePointerCapture(pointerId); } catch (_) {}
  }

  el.addEventListener('pointerdown', onDown);
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerup', onUp);
  el.addEventListener('pointercancel', onUp);
}

function readSlotOrder() {
  return [...slotsEl.querySelectorAll('.slot')].map((s) => tileLabelText(s.querySelector('.tile')));
}

function checkDrag() {
  if (state.locked) return;
  const level = LEVELS[state.levelId];
  const items = activeRunItems();
  const item = state.currentItem || resolveItem(level, items[state.itemIndex], state.difficulty);
  clearMarks(levelPanel);
  const order = readSlotOrder();
  if (order.some((t) => !t)) {
    beep('bad');
    showFx(false, '請先把全部空格填好。');
    return;
  }
  const accepted = (Array.isArray(item.answers) && item.answers.length)
    ? item.answers
    : [item.order];
  const filledKey = order.join('|');
  const ok = accepted.some((a) => Array.isArray(a) && a.join('|') === filledKey);
  const tiles = [...slotsEl.querySelectorAll('.slot .tile')];
  if (ok) {
    state.locked = true;
    tiles.forEach((t) => { t.classList.add('correct'); addMark(t, true); });
    kickUntil = performance.now() + 120;
    beep('ok');
    {
      const lv = LEVELS[state.levelId];
      speak(item.speak, { voice: lv?.voice === 'male' ? 'male' : 'default' });
    }
    state.pendingAdvance = true;
    showFx(true, item.explainCorrect || (state.levelId === 'L5_picture_sentence'
      ? '句子通順，也符合圖意。'
      : '句子順序正確，段落通順。'));
  } else {
    // R18：錯唔 lock，可抽回／改排；填滿會再自動判
    // R23 L5：通順但不合圖／欠主謂／干擾詞另組句 → 一律錯（只認 answers）
    state.locked = false;
    state.pendingAdvance = false;
    const primary = item.order || accepted[0] || [];
    let firstBad = -1;
    for (let i = 0; i < primary.length; i++) {
      if (order[i] !== primary[i]) { firstBad = i; break; }
    }
    const slot = slotsEl.querySelectorAll('.slot')[firstBad];
    if (slot) {
      slot.classList.add('wrong');
      const t = slot.querySelector('.tile');
      if (t) t.classList.add('wrong');
    }
    beep('bad');
    let extra;
    if (state.levelId === 'L5_picture_sentence') {
      extra = item.explainWrong
        || '請組成通順完整句，且必須符合圖意；通順但不合圖、欠主謂，或用干擾詞另組句，都不算對。';
      if (firstBad >= 0) {
        extra = `第 ${firstBad + 1} 格尚未符合本題圖意。` + extra;
      }
    } else {
      extra = firstBad >= 0
        ? `第 ${firstBad + 1} 格尚未正確。${item.explainWrong || item.distractorHint || ''}`
        : (item.explainWrong || item.distractorHint || '順序尚未正確，請再排列。');
    }
    addWrongBookEntry({
      levelId: state.levelId,
      item,
      reason: extra,
      explain: item.explainCorrect || item.explainWrong || extra
    });
    showFx(false, extra);
  }
}

function advanceAfterCorrect() {
  const level = LEVELS[state.levelId];
  const items = activeRunItems();
  if (state.itemIndex < items.length - 1) {
    state.itemIndex += 1;
    renderItem();
  } else {
    state.done[state.levelId] = true;
    showLevelClearThenMap();
  }
}

function goHome() {
  // R31：wrong-tip／fx-pop 開著時禁止回主頁（避免誤觸）
  if ((wrongTipEl && !wrongTipEl.classList.contains('hidden')) || (fxPop && !fxPop.classList.contains('hidden'))) {
    return;
  }
  const t0 = performance.now();
  state.done = EMPTY_DONE();
  state.itemIndex = 0;
  state.levelId = null;
  state.runItems = [];
  state.tipSeen = false;
  state.locked = false;
  refreshSessionQueues();
  hideFx();
  hideLevelClear();
  farmMesh.visible = true;
  bgMesh.visible = false;
  if (cowMesh) cowMesh.visible = true;
  showTitle();
  if (performance.now() - t0 > BALANCE.restartMs) console.warn('home slow');
  toast('已返回主頁，請重新選擇難度。');
  beep('tap');
}

function fullRestart() {
  const t0 = performance.now();
  state.done = EMPTY_DONE();
  state.itemIndex = 0;
  state.levelId = null;
  state.runItems = [];
  state.tipSeen = false;
  state.locked = false;
  hideFx();
  farmMesh.visible = true;
  bgMesh.visible = false;
  if (cowMesh) cowMesh.visible = true;
  resetKidHome();
  showDifficulty();
  if (performance.now() - t0 > BALANCE.restartMs) console.warn('restart slow');
  toast('已重開');
  beep('tap');
}

onPointerActivate(btnBack, () => {
  // R31：提示／答對彈窗開著時不可返回農場
  if ((wrongTipEl && !wrongTipEl.classList.contains('hidden')) || (fxPop && !fxPop.classList.contains('hidden'))) return;
  showMap();
});
onPointerActivate(btnHome, () => goHome());
onPointerActivate(btnHomeMap, () => goHome());
// R33：#btn-home-level 已移除；若殘留 DOM 亦唔綁 goHome
if (btnHomeLevel) onPointerActivate(btnHomeLevel, () => goHome());
if (btnWinHome) onPointerActivate(btnWinHome, () => goHome());
onPointerActivate(btnHint, () => {
  if (!state.currentItem) return;
  const item = state.currentItem;
  const raw = [
    ...(Array.isArray(item.hints) ? item.hints : []),
    item.hint,
    item.distractorHint,
    item.explainWrong
  ].filter((h) => h && !isEmptyPraiseHint(h));
  const pool = [];
  for (const h of raw) {
    if (!pool.includes(h)) pool.push(h);
  }
  if (!pool.length) {
    if (state.levelId === 'L1_typo') pool.push('比較形近字差在哪一筆。');
    else if (state.levelId === 'L3_paragraph') pool.push('留意時間詞或「因為……所以……」的因果邊。');
    else if (state.levelId === 'L2_reorder_sentence') pool.push('先找出人物，再找出動作或時間詞。');
    else if (state.levelId === 'L5_picture_sentence') pool.push('先看圖找出人物與動作，組成合圖的完整句；留意句末標點，缺標點或標點位置不對都不算對。');
    else pool.push('比較選項差異，選最合適的量詞。');
  }
  const idx = state.hintIndex % pool.length;
  state.hintIndex += 1;
  state.hintUsed = true;
  btnHint.disabled = false;
  // R31：提示鈕只開本題提示，不進題、不離關
  state.pendingAdvance = false;
  try { clearTimeout(fxTimer); } catch (_) {}
  showWrongTip(pool[idx], '提示');
  beep('tap');
});
// R19：btn-mute 用 click／pointerup，唔用 onPointerActivate（避免 preventDefault 搶 range／checkbox）
function toggleVolumePanel(e) {
  try { e?.stopPropagation?.(); } catch (_) {}
  unlockAndPreloadAudio();
  setVolumePanelOpen(!state.volumePanelOpen);
}
if (btnMute) {
  btnMute.addEventListener('click', (e) => {
    e.preventDefault();
    toggleVolumePanel(e);
  });
}
// 面板內事件唔冒泡到 document 關閉邏輯；range／checkbox 必可操作
if (volumePanel) {
  const stop = (e) => { try { e.stopPropagation(); } catch (_) {} };
  volumePanel.addEventListener('pointerdown', stop);
  volumePanel.addEventListener('pointerup', stop);
  volumePanel.addEventListener('click', stop);
  volumePanel.addEventListener('touchstart', stop, { passive: true });
}
if (volMuteAll) {
  const onMuteChange = () => {
    unlockAndPreloadAudio();
    state.muted = !!volMuteAll.checked;
    applyAudioState();
    saveVolPrefs();
    toast(state.muted ? '已靜音' : '已開啟聲音');
    if (btnMute) {
      btnMute.textContent = state.muted ? '🔇' : '🔊';
      btnMute.setAttribute('aria-pressed', state.muted ? 'true' : 'false');
    }
  };
  volMuteAll.addEventListener('change', onMuteChange);
  volMuteAll.addEventListener('input', onMuteChange);
}
let sfxPreviewAt = 0;
if (volBgm) {
  const onBgm = () => {
    unlockAndPreloadAudio();
    state.bgmVolume = Math.min(1, Math.max(0, Number(volBgm.value) / 100));
    // R19.1：即時寫 GainNode（iOS 路徑）；唔關面板
    setBgmGainValue(state.bgmVolume);
    applyAudioState();
    saveVolPrefs();
  };
  volBgm.addEventListener('input', onBgm);
  volBgm.addEventListener('change', onBgm);
}
if (volSfx) {
  const onSfx = (ev) => {
    unlockAndPreloadAudio();
    state.sfxVolume = Math.min(1, Math.max(0, Number(volSfx.value) / 100));
    saveVolPrefs();
    const now = performance.now();
    // input 滑動時節流預覽；change 必播一次
    if (!state.muted && state.sfxVolume > 0 && (ev.type === 'change' || now - sfxPreviewAt > 120)) {
      sfxPreviewAt = now;
      beep('tap');
    }
  };
  volSfx.addEventListener('input', onSfx);
  volSfx.addEventListener('change', onSfx);
}
// 點面板外關閉音量面板
document.addEventListener('pointerdown', (e) => {
  if (!state.volumePanelOpen) return;
  const t = e.target;
  if (t && (btnMute?.contains(t) || volumePanel?.contains(t))) return;
  setVolumePanelOpen(false);
}, true);

// R19 錯題本
if (btnWrongbook) {
  btnWrongbook.addEventListener('click', (e) => {
    e.preventDefault();
    try { e.stopPropagation(); } catch (_) {}
    instantPress(btnWrongbook);
    setWrongbookOpen(!state.wrongbookOpen);
    beep('tap');
  });
}
if (btnWbClose) {
  btnWbClose.addEventListener('click', () => { setWrongbookOpen(false); beep('tap'); });
}
if (btnWbClear) {
  btnWbClear.addEventListener('click', () => {
    saveWrongBook([]);
    renderWrongBookPanel();
    toast('已清除錯題本');
    beep('tap');
  });
}
if (wrongbookPanel) {
  wrongbookPanel.addEventListener('pointerdown', (e) => {
    if (e.target === wrongbookPanel) setWrongbookOpen(false);
  });
}
onPointerActivate(btnRestart, () => {
  if (state.scene === 'level' && state.levelId) {
    state.itemIndex = 0;
    state.locked = false;
    renderItem();
    toast('本關重開');
    beep('tap');
  } else fullRestart();
});
onPointerActivate(btnWinRestart, () => fullRestart());
onPointerActivate(btnStart, () => { unlockAndPreloadAudio(); showDifficulty(); });
difficultyEl.querySelectorAll('[data-diff]').forEach((btn) => {
  btn.addEventListener('click', () => {
    state.difficulty = btn.dataset.diff;
    unlockAndPreloadAudio(); beep('tap');
    state.tipSeen = false;
    showMap();
  });
});
if (btnTipOk) onPointerActivate(btnTipOk, () => dismissTip());
if (btnTipSkip) onPointerActivate(btnTipSkip, () => dismissTip());
if (btnTipPrev) onPointerActivate(btnTipPrev, () => {
  state.tipPage = Math.max(0, state.tipPage - 1);
  renderTutorialPage();
  beep('tap');
});
if (btnTipNext) onPointerActivate(btnTipNext, () => {
  state.tipPage = Math.min(TUTORIAL_PAGES.length - 1, state.tipPage + 1);
  renderTutorialPage();
  beep('tap');
});
if (btnWrongTipOk) onPointerActivate(btnWrongTipOk, () => {
  // R31：只關提示；絕對不離關、不進題
  hideWrongTip();
});
const btnLevelClearMap = document.getElementById('btn-level-clear-map');
if (btnLevelClearMap) onPointerActivate(btnLevelClearMap, () => returnToMapFromLevelClear());
if (btnFxOk) onPointerActivate(btnFxOk, () => {
  hideFx();
  beep('tap');
  if (state.pendingAdvance) {
    state.pendingAdvance = false;
    advanceAfterCorrect();
  }
});

function animate(now) {
  requestAnimationFrame(animate);
  if (now < kickUntil) {
    camera.position.x = (Math.random() - 0.5) * 0.06;
    camera.position.y = (Math.random() - 0.5) * 0.06;
  } else {
    camera.position.x = 0;
    camera.position.y = 0;
  }
  if (cowMesh && cowTexA && cowTexB) {
    const onFarm = farmMesh.visible && (state.scene === 'title' || state.scene === 'map' || state.scene === 'difficulty' || state.scene === 'win');
    cowMesh.visible = onFarm;
    if (onFarm && now >= cowNext) {
      cowFrame = 1 - cowFrame;
      cowMesh.material.map = cowFrame ? cowTexB : cowTexA;
      cowMesh.material.needsUpdate = true;
      cowNext = now + BALANCE.cowSwapMs;
    }
    if (onFarm) {
      const cow = activeCow();
      cowMesh.position.y = worldFromNorm(cow.x, cow.y).y + Math.sin(now / 700) * 0.03;
    }
  }
  if (kidMesh && (state.scene === 'title' || state.scene === 'map' || state.scene === 'level')) {
    kidMesh.position.y = kidBase.y + Math.sin(now / 420) * 0.035;
  }
  renderer.render(scene, camera);
}

showLoading();
try {
  await initThree();
} catch (e) {
  console.warn('initThree error', e);
}
hideLoading();
loadVolPrefs();
syncVolumePanelUi();
ensureBgm(); // 預設建立 element＋開始緩衝；唔 play（等手勢）
applyAudioState();
showTitle();
requestAnimationFrame(animate);

// R16：title 可玩後 idle 預載教學／次要貼圖（唔預載 TTS）
const deferPreload = () => {
  // R16：唔預載 TTS；教學／次要貼圖 idle 載入即可
  preloadSecondaryArt();
  preloadTutorialPages();
};
if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(deferPreload, { timeout: 900 });
} else {
  setTimeout(deferPreload, 120);
}


document.addEventListener('pointerdown', () => { unlockAndPreloadAudio(); }, { once: true, passive: true });

try {
  window.__TYY_WRONGBOOK = {
    key: WRONGBOOK_LS_KEY,
    load: loadWrongBook,
    clear: () => { saveWrongBook([]); renderWrongBookPanel(); },
    add: addWrongBookEntry
  };
} catch (_) {}

try {
  window.__TYY_STORY = {
    candidates: storyPicCandidates,
    preload: preloadStoryPic,
    resolved: () => {
      const o = {};
      for (const [k, v] of storyPicResolved) o[k] = typeof v === 'string' ? v : '(pending)';
      return o;
    },
    currentSrc: () => storyPic?.currentSrc || storyPic?.getAttribute('src') || ''
  };
} catch (_) {}


// R17／R19.1 自測／除錯：暴露 BGM＋GainNode 狀態（唔影響玩法）
try {
  window.__TYY_HUB_SCROLL = {
    isPortraitHubScroll,
    syncHubScrollMode,
    contentHeight: () => document.documentElement.style.getPropertyValue('--tyy-hub-scroll-h')
  };
} catch (_) {}

try {
  window.__TYY_HUB = {
    getMode: getHubMode,
    isDesktop: isDesktopHub,
    getCached: () => hubModeCached,
    mapChangeCount: () => hubMapChangeCount,
    mapImageSrc: () => {
      const img = farmMesh && farmMesh.material && farmMesh.material.map
        && (farmMesh.material.map.image || (farmMesh.material.map.source && farmMesh.material.map.source.data));
      return (img && (img.currentSrc || img.src)) || '';
    }
  };
} catch (_) {}

try {
  window.__TYY_AUDIO = {
    getBgm: () => state.bgm,
    getGain: () => state.bgmGain,
    getState: () => ({
      muted: state.muted,
      bgmVolume: state.bgmVolume,
      sfxVolume: state.sfxVolume,
      bgmUnlocked: state.bgmUnlocked,
      bgmGraphReady: !!state.bgmGraphReady,
      paused: state.bgm ? state.bgm.paused : null,
      loop: state.bgm ? state.bgm.loop : null,
      src: state.bgm ? state.bgm.currentSrc || state.bgm.src : null,
      // R19.1：element.volume 固定 1；真正響度＝gain.value
      volume: state.bgm ? state.bgm.volume : null,
      gain: state.bgmGain ? state.bgmGain.gain.value : null,
      audioCtxState: state.audioCtx ? state.audioCtx.state : null
    })
  };
} catch (_) {}

// R29／R31 扮學生遊測：強制關卡題目（唔影響正式玩法）
try {
  window.__TYY_PLAYTEST = {
    goMap() { showMap(); return this.snapshot(); },
    forceLevel(levelId, diff, rawItems) {
      try { clearTimeout(fxTimer); } catch (_) {}
      try { clearTimeout(hideLevelClear._t); } catch (_) {}
      hideFx();
      hideWrongTip();
      hideLevelClear();
      state.difficulty = diff || 'easy';
      state.tipSeen = true;
      tipEl?.classList.add('hidden');
      titleEl?.classList.add('hidden');
      difficultyEl?.classList.add('hidden');
      winEl?.classList.add('hidden');
      mapLabels?.classList.add('hidden');
      levelClearEl?.classList.add('hidden');
      state.scene = 'level';
      state.levelId = levelId;
      state.itemIndex = 0;
      state.locked = false;
      state.pendingAdvance = false;
      state.done = state.done || {};
      ensureSessionQueues();
      const level = LEVELS[levelId];
      if (!level) throw new Error('unknown level ' + levelId);
      const pool = Array.isArray(rawItems) && rawItems.length
        ? rawItems
        : getLevelItems(level, state.difficulty).slice(0, 1);
      state.runItems = pool.map((it) => ({ ...it }));
      levelPanel.classList.remove('hidden');
      setInLevelHud(true);
      setHomeVisible(false, false);
      setLevelBackground(levelId);
      goalEl.textContent = LEVEL_LABEL[levelId] || level.goal || levelId;
      if (npcRow) npcRow.classList.remove('hidden');
      renderItem();
      return this.snapshot();
    },
    snapshot() {
      return {
        scene: state.scene,
        levelId: state.levelId,
        itemIndex: state.itemIndex,
        locked: state.locked,
        pendingAdvance: state.pendingAdvance,
        progress: progressEl?.textContent || '',
        titleHidden: !!titleEl?.classList.contains('hidden'),
        mapHidden: !!mapLabels?.classList.contains('hidden'),
        levelHidden: !!levelPanel?.classList.contains('hidden'),
        wrongVisible: !wrongTipEl?.classList.contains('hidden'),
        fxVisible: !fxPop?.classList.contains('hidden'),
        levelClearVisible: !levelClearEl?.classList.contains('hidden'),
        wrongBody: wrongTipBody?.textContent || '',
        topbarZ: getComputedStyle(document.getElementById('topbar')).zIndex,
        wrongZ: getComputedStyle(wrongTipEl).zIndex,
        fxZ: getComputedStyle(fxPop).zIndex
      };
    },
    forceL5(diff, rawItems) {
      try { clearTimeout(fxTimer); } catch (_) {}
      try { clearTimeout(hideLevelClear._t); } catch (_) {}
      hideFx();
      hideWrongTip();
      hideLevelClear();
      state.difficulty = diff || 'medium';
      state.tipSeen = true;
      tipEl?.classList.add('hidden');
      titleEl?.classList.add('hidden');
      difficultyEl?.classList.add('hidden');
      winEl?.classList.add('hidden');
      mapLabels?.classList.add('hidden');
      levelClearEl?.classList.add('hidden');
      state.scene = 'level';
      state.levelId = 'L5_picture_sentence';
      state.itemIndex = 0;
      state.locked = false;
      state.pendingAdvance = false;
      state.done = state.done || {};
      ensureSessionQueues();
      const level = LEVELS.L5_picture_sentence;
      const pool = Array.isArray(rawItems) && rawItems.length
        ? rawItems
        : getLevelItems(level, state.difficulty).slice(0, 1);
      state.runItems = pool.map((it) => ({ ...it }));
      levelPanel.classList.remove('hidden');
      setInLevelHud(true);
      setHomeVisible(false, false);
      setLevelBackground('L5_picture_sentence');
      goalEl.textContent = '果園・看圖造句';
      if (npcRow) npcRow.classList.remove('hidden');
      renderItem();
      return {
        pic: state.currentItem?.pic,
        order: state.currentItem?.order,
        answers: state.currentItem?.answers,
        poolLen: state.currentItem?.pool?.length
      };
    },
    getItem() {
      return state.currentItem
        ? {
            pic: state.currentItem.pic,
            order: state.currentItem.order,
            answers: state.currentItem.answers,
            wrongIndex: state.currentItem.wrongIndex,
            choices: state.currentItem.choices,
            locked: state.locked,
            pendingAdvance: state.pendingAdvance,
            itemIndex: state.itemIndex,
            levelId: state.levelId
          }
        : null;
    },
    fxVisible() {
      return !document.getElementById('fx-pop')?.classList.contains('hidden');
    },
    wrongVisible() {
      return !document.getElementById('wrong-tip')?.classList.contains('hidden');
    },
    fxMsg() {
      return document.getElementById('fx-msg')?.textContent || '';
    },
    clearSlotsToPool() {
      [...slotsEl.querySelectorAll('.slot .tile')].forEach((t) => tilesEl.appendChild(tileUnit(t)));
      clearMarks(levelPanel);
      hideWrongTip();
      hideFx();
      state.locked = false;
      state.pendingAdvance = false;
    }
  };
} catch (_) {}
