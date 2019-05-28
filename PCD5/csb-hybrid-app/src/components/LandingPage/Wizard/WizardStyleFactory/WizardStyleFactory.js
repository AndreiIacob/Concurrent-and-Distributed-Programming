import XS from './ExtraSmallWizard.style';
import S from './SmallWizard.style';
import L from './LargeWizard.style';

export default class StyleSheetFactory {
    static getStyleSheet(breakpoint) {
        switch (breakpoint) {
            case 'XS': {
                return XS.getSheet();
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
