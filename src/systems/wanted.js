import {state,save} from '../state.js';export function addWanted(n=1){state.wanted=Math.min(5,state.wanted+n);save();return state.wanted>=5}export function clearWanted(to=0){state.wanted=to;save()}
