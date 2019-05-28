import S from './Small.style';
import L from './Large.style';

export default class StyleSheetFactory {
    static getStyleSheet(breakpoint) {
        switch (breakpoint) {
            case 'XS': {
                return S.getSheet();
            }
            case 'S': {
                return S.getSheet();
            }
            default: {
                return L.getSheet();
            }
        }
    }
}
