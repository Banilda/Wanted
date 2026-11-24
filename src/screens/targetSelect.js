import targets from '../data/targets.json';
import {selectedCar} from '../systems/cars.js';

let launchTimer;

export function render({go}){
  const car=selectedCar(),el=document.createElement('section');
  el.className='screen target-select';
  el.innerHTML=`<div class="eyebrow">Выбери работу</div><h2>Новая цель</h2><div class="target-buttons">${targets.map(t=>`<button class="target-chip ${t.palette}" data-id="${t.id}"><b>${t.name}</b><span>$${t.reward}</span></button>`).join('')}</div><div class="route-stage road-city"><div class="route-track"></div><img class="route-car" src="${car.image}" alt="${car.name}"></div><p class="route-caption">Дорога ждёт. Выбери место.</p>`;
  const stage=el.querySelector('.route-stage'),caption=el.querySelector('.route-caption');
  el.querySelectorAll('[data-id]').forEach(button=>button.onclick=()=>{
    if(stage.classList.contains('arrived'))return;
    const target=targets.find(item=>item.id===button.dataset.id);
    el.querySelectorAll('[data-id]').forEach(item=>item.classList.toggle('selected',item===button));
    stage.className=`route-stage road-${target.id} arrived`;
    caption.textContent=`${target.location} · ${target.desc}`;
    launchTimer=setTimeout(()=>go('heist',{target}),650);
  });
  return el;
}

export function onLeave(){clearTimeout(launchTimer)}
