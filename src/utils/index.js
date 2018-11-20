import { path } from 'ramda';

export function getFromTheme (themePath = '') {
    return function getFromThemeprops (props = {}) {
        return path(themePath.split('.'), props.theme);
    }
}