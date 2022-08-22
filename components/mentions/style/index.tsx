import type { InputToken } from '../../input/style';
import {
  genActiveStyle,
  genBasicInputStyle,
  genDisabledStyle,
  genPlaceholderStyle,
  genStatusStyle,
  initInputToken,
} from '../../input/style';
import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook } from '../../theme';
import { resetComponent } from '../../style';

export interface ComponentToken {
  zIndexPopup: number;
  dropdownHeight: number;
  controlItemWidth: number;
}

type MentionsToken = InputToken<FullToken<'Mentions'>>;

const genMentionsStyle: GenerateStyle<MentionsToken> = token => {
  const {
    componentCls,
    colorTextDisabled,
    controlItemBgHover,
    controlPaddingHorizontal,
    colorText,
    motionDurationSlow,
    lineHeight,
    controlHeight,
    inputPaddingHorizontal,
    inputPaddingVertical,
    fontSize,
    colorBgElevated,
    controlRadiusLG,
    boxShadow,
  } = token;

  const itemPaddingVertical = Math.round(
    (token.controlHeight - token.fontSize * token.lineHeight) / 2,
  );

  return {
    [`${componentCls}`]: {
      ...resetComponent(token),
      ...genBasicInputStyle(token),

      position: 'relative',
      display: 'inline-block',
      height: 'auto',
      padding: 0,
      overflow: 'hidden',
      lineHeight,
      whiteSpace: 'pre-wrap',
      verticalAlign: 'bottom',

      ...genStatusStyle(token),

      '&-disabled': {
        '> textarea': {
          ...genDisabledStyle(token),
        },
      },

      '&-focused': {
        ...genActiveStyle(token),
      },

      [`&-affix-wrapper ${componentCls}-suffix`]: {
        position: 'absolute',
        top: 0,
        insetInlineEnd: inputPaddingHorizontal,
        bottom: 0,
        zIndex: 1,
        display: 'inline-flex',
        alignItems: 'center',
        margin: 'auto',
      },

      // ================= Input Area =================
      [`> textarea, ${componentCls}-measure`]: {
        minHeight: controlHeight - 2,
        margin: 0,
        padding: `${inputPaddingVertical}px ${inputPaddingHorizontal}px`,
        overflow: 'inherit',
        overflowX: 'hidden',
        overflowY: 'auto',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        fontStyle: 'inherit',
        fontVariant: 'inherit',
        fontSizeAdjust: 'inherit',
        fontStretch: 'inherit',
        lineHeight: 'inherit',
        direction: 'inherit',
        letterSpacing: 'inherit',
        whiteSpace: 'inherit',
        textAlign: 'inherit',
        verticalAlign: 'top',
        wordWrap: 'break-word',
        wordBreak: 'inherit',
        tabSize: 'inherit',
      },

      '> textarea': {
        width: '100%',
        border: 'none',
        outline: 'none',
        resize: 'none',
        backgroundColor: 'inherit',
        ...genPlaceholderStyle(token.colorTextPlaceholder),
      },

      [`${componentCls}-measure`]: {
        position: 'absolute',
        top: 0,
        insetInlineEnd: 0,
        bottom: 0,
        insetInlineStart: 0,
        zIndex: -1,
        color: 'transparent',
        pointerEvents: 'none',

        '> span': {
          display: 'inline-block',
          minHeight: '1em',
        },
      },

      // ================== Dropdown ==================
      '&-dropdown': {
        // Ref select dropdown style
        ...resetComponent(token),

        position: 'absolute',
        top: -9999,
        insetInlineStart: -9999,
        zIndex: token.zIndexPopup,
        boxSizing: 'border-box',
        fontSize,
        fontVariant: 'initial',
        backgroundColor: colorBgElevated,
        borderRadius: controlRadiusLG,
        outline: 'none',
        boxShadow,

        '&-hidden': {
          display: 'none',
        },

        [`${componentCls}-dropdown-menu`]: {
          maxHeight: token.dropdownHeight,
          marginBottom: 0,
          paddingInlineStart: 0, // Override default ul/ol
          overflow: 'auto',
          listStyle: 'none',
          outline: 'none',

          '&-item': {
            position: 'relative',
            display: 'block',
            minWidth: token.controlItemWidth,
            padding: `${itemPaddingVertical}px ${controlPaddingHorizontal}px`,
            overflow: 'hidden',
            color: colorText,
            fontWeight: 'normal',
            lineHeight,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
            transition: `background ${motionDurationSlow} ease`,

            '&:hover': {
              backgroundColor: controlItemBgHover,
            },

            '&:first-child': {
              borderStartStartRadius: controlRadiusLG,
              borderStartEndRadius: controlRadiusLG,
              borderEndStartRadius: 0,
              borderEndEndRadius: 0,
            },

            '&:last-child': {
              borderStartStartRadius: 0,
              borderStartEndRadius: 0,
              borderEndStartRadius: controlRadiusLG,
              borderEndEndRadius: controlRadiusLG,
            },

            '&-disabled': {
              color: colorTextDisabled,
              cursor: 'not-allowed',

              '&:hover': {
                color: colorTextDisabled,
                backgroundColor: controlItemBgHover,
                cursor: 'not-allowed',
              },
            },

            '&-selected': {
              color: colorText,
              fontWeight: token.fontWeightStrong,
              backgroundColor: controlItemBgHover,
            },

            '&-active': {
              backgroundColor: controlItemBgHover,
            },
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Mentions',
  token => {
    const mentionsToken = initInputToken<FullToken<'Mentions'>>(token);
    return [genMentionsStyle(mentionsToken)];
  },
  token => ({
    dropdownHeight: 250,
    controlItemWidth: 100,
    zIndexPopup: token.zIndexPopupBase + 50,
  }),
);
