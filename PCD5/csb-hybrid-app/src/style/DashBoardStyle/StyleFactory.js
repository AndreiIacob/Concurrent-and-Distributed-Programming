import XS from './ExtraSmall.style';
import S from './Small.style';
import M from './Medium.style';
import L from './Large.style';

export default class StyleFactory {
    static getStyleSheet(breakpoint) {
        switch (breakpoint) {
            case 'XS': {
                return XS.getSheet();
            }
            case 'S': {
                return S.getSheet();
            }
            case 'M': {
                return M.getSheet();
            }
            case 'L': {
                return L.getSheet();
            }
            default: return null;
        }
    }

    static getVisualPreferences(breakpoint){
        switch (breakpoint) {
            case 'XS': {
                return XS.getVisualPreferences();
            }
            case 'S': {
                return S.getVisualPreferences();
            }
            case 'M': {
                return M.getVisualPreferences();
            }
            case 'L': {
                return L.getVisualPreferences();
            }
            default: return null;
        }
    }
}
