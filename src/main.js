import './styles/theme-gta.css';import './styles/layout.css';import './styles/global.css';import './styles/game.css';import './styles/interlude.css';
import {state,load,save} from './state.js';import * as menu from './screens/menu.js';import * as tutorial from './screens/tutorial.js';import * as heist from './screens/heistFull.js';import * as decision from './screens/decisionFull.js';import * as gameover from './screens/gameoverFull.js';import * as loot from './screens/loot.js';import * as interlude from './screens/interlude.js';import * as cardOffer from './screens/cardOffer.js';
load();const app=document.querySelector('#app');app.innerHTML=`<main class="game-shell"><button class="mute" aria-label="Звук">${state.settings.sound?'♪':'×'}</button><div class="hud"><div class="hud-money"></div><div class="hud-stars"></div></div><div class="screens"></div></main>`;
const screens={menu,tutorial,heist,decision,gameover,loot,interlude,cardOffer};let current=null;const host=app.querySelector('.screens');
function hud(){app.querySelector('.hud-money').textContent=`$ ${state.money.banked}`;app.querySelector('.hud-stars').textContent='★'.repeat(state.wanted)+'☆'.repeat(5-state.wanted)}window.addEventListener('statechange',hud);hud();
export function showScreen(name,props={}){current?.onLeave?.();host.replaceChildren();const mod=screens[name]||screens.menu;const el=mod.render({...props,go:showScreen});el.classList.add('active');host.append(el);current=mod;mod.onEnter?.(props)}
app.querySelector('.mute').onclick=e=>{state.settings.sound=!state.settings.sound;e.currentTarget.textContent=state.settings.sound?'♪':'×';save()};
app.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;current?.onPointerDown?.(e)});
showScreen('menu');
