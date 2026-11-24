const KEY='wanted-save';
export const defaults=()=>({version:1,money:{banked:0,unbanked:0},wanted:0,cards:[],storyShown:[],tutorialDone:false,settings:{sound:true},stats:{heists:0,perfectHeists:0,busts:0}});
export const state=defaults();
export function load(){try{const raw=JSON.parse(localStorage.getItem(KEY));if(raw&&raw.version===1)Object.assign(state,defaults(),raw,{money:{...defaults().money,...raw.money},settings:{...defaults().settings,...raw.settings},stats:{...defaults().stats,...raw.stats}})}catch{localStorage.removeItem(KEY)}return state}
export function save(){localStorage.setItem(KEY,JSON.stringify(state));window.dispatchEvent(new CustomEvent('statechange'))}
export function reset(){Object.assign(state,defaults());save()}
