import { merge } from 'ramda';

export const NEW_LEVEL = 'new_level';
export const HIDE_HIDDEN = 'hidden/hide';
export const SHOW_HIDDEN = 'hidden/show';
export const LOADER_HIDE = 'loader/hide';
export const LOADER_SHOW = 'loader/show';

export const initialState = {
    level: 0,
    showHidden: true,
    showLoader: false,
}

export function GameReducer(state, action) {
    switch(action.type) {
        case NEW_LEVEL:
            return merge(state, { level: action.level });
        case SHOW_HIDDEN:
            return merge(state, { showHidden: true });
        case HIDE_HIDDEN:
            return merge(state, { showHidden: false });
        case LOADER_HIDE:
            return merge(state, { showLoader: false });
        case LOADER_SHOW:
            return merge(state, { showLoader: true });
        default:
            return state;
    }
}