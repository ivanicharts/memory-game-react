import { merge } from 'ramda';

export const NEW_LEVEL = 'new_level';
export const HIDDEN_CELL_HIDE = 'hidden/hide';
export const HIDDEN_CELL_SHOW = 'hidden/show';
export const FIELD_HIDE = 'field/hide';
export const FIELD_SHOW = 'field/show';

export const initialState = {
    level: 0,
    showHidden: true,
    showField: false,
}

export function GameReducer(state, action) {
    switch(action.type) {
        case NEW_LEVEL:
            return merge(state, { level: action.level });
        case HIDDEN_CELL_SHOW:
            return merge(state, { showHidden: true });
        case HIDDEN_CELL_HIDE:
            return merge(state, { showHidden: false });
        case FIELD_HIDE:
            return merge(state, { showField: false });
        case FIELD_SHOW:
            return merge(state, { showField: true });
        default:
            return state;
    }
}