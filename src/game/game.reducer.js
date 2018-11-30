import { merge } from 'ramda';

import levels from '../config/levels';

export const NEW_LEVEL = 'level/new';
export const HIDDEN_CELL_HIDE = 'hidden/hide';
export const HIDDEN_CELL_SHOW = 'hidden/show';
export const FIELD_HIDE = 'field/hide';
export const FIELD_SHOW = 'field/show';
export const RESET_LEVEL = 'level/reset';

const START_LEVEL = 0;

export const initialState = {
    level: START_LEVEL,
    showHidden: true,
    showField: false,
    levelConfig: levels[START_LEVEL],
}

export function GameReducer(state, action) {
    switch(action.type) {
        case NEW_LEVEL:
            return merge(state, { level: action.level, levelConfig: levels[action.level] });
        case HIDDEN_CELL_SHOW:
            return merge(state, { showHidden: true });
        case HIDDEN_CELL_HIDE:
            return merge(state, { showHidden: false });
        case FIELD_HIDE:
            return merge(state, { showField: false });
        case FIELD_SHOW:
            return merge(state, { showField: true });
        case RESET_LEVEL:
            return merge(initialState, { levelConfig: { ...levels[START_LEVEL] } });
        default:
            return state;
    }
}