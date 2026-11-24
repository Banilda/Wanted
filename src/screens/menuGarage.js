import {state} from '../state.js';
import {cars,garage,choose} from '../systems/cars.js';

export function render({go}){
  const el=document.createElement('section');el.className='screen menu-garage';
  const draw=()=>{
    const g=garage();
    el.innerHTML=`<div class="eyebrow">Vice City, 1986</div><h1 class="title">Wanted</h1><div class="menu-actions"><button class="btn primary" data-play>${state.tutorialDone?'Продолжить':'Играть'}</button><button class="btn" data-reset>Новая игра</button></div><div class="garage"><h3>Гараж</h3><div class="garage-slider">${cars.map(c=>{const owned=g.owned.includes(c.id);return `<article class="garage-car ${g.selected===c.id?'selected':''}" data-car="${c.id}"><img src="${c.image}" alt="${c.name}"><strong>${c.name}</strong>${owned?'':`<button class="garage-buy" data-buy="${c.id}">Купить · $${c.price}</button>`}</article>`}).join('')}</div></div>`;
    el.querySelector('[data-play]').onclick=()=>go(state.tutorialDone?'targetSelect':'tutorial');
    el.querySelector('[data-reset]').onclick=()=>{localStorage.clear();location.reload()};
    el.querySelectorAll('[data-car]').forEach(card=>card.onclick=event=>{if(event.target.closest('[data-buy]'))return;const id=card.dataset.car;if(g.owned.includes(id)){choose(id);draw()}});
    el.querySelectorAll('[data-buy]').forEach(button=>button.onclick=()=>{if(!choose(button.dataset.buy))button.animate([{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'none'}],{duration:220});draw()});
  };
  draw();return el;
}
