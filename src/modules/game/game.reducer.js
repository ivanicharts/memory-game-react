import { merge } from 'ramda';

export const initialState = {
    level: 0,
    showHidden: true,
}

export const NEW_LEVEL = 'new_level';
export const HIDE_HIDDEN = 'hidden/hide';
export const SHOW_HIDDEN = 'hidden/show';

export function GameReducer(state, action) {
    switch(action.type) {
        case NEW_LEVEL:
            console.log('from red', state)
            return merge(state, { level: action.level });
        case SHOW_HIDDEN:
            return merge(state, { showHidden: true });
        case HIDE_HIDDEN:
            return merge(state, { showHidden: false });
        default:
            return state;
    }
}