import cards from '../data/cards.json';import {state,save} from '../state.js';
export const registry=cards;
export const has=id=>state.cards.includes(id);
export function offer(){return [...cards].filter(card=>!state.cards.includes(card.id)).sort(()=>Math.random()-.5).slice(0,3)}
export function take(id,price=0){if(state.cards.includes(id)||state.money.banked<price)return false;state.money.banked-=price;if(state.cards.length>=3)state.cards.shift();state.cards.push(id);if(id==='debt')state.money.banked+=500;save();return true}
export function consume(id){const index=state.cards.indexOf(id);if(index<0)return false;state.cards.splice(index,1);save();return true}
