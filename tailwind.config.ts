// tailwind.config.js
export default {
  darkMode: "class",
  theme: {
    screens: {
      // 모바일은 기본(base)으로 커버 → 0 ~ 767
      // (만약 360px 이하에선 줄어들지 않게 하려면 wrapper에 min-w-[360px] 적용)
      tablet: "768px", // 768 ~ 1279 (→ tablet:)
      desktop: "1280px", // 1280 이상 (→ desktop:)
    },
    // Pretendard를 기본 산세리프 계열에 추가
    fontFamily: {
      sans: ["Pretendard", "sans-serif"],
    },
    extend: {
      colors: {
        // Gray 계열 (디자이너 명칭: zinc)
        zinc: {
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#9F9FA9",
          500: "#71717B",
          600: "#52525C",
          700: "#3F3F47",
          800: "#27272A",
          900: "#18181B",
          950: "#09090B",
        },
        // Yellow
        yellow: {
          50: "#FEFCE8",
          100: "#FEF9C2",
          200: "#FFF085",
          300: "#FFDF20",
          400: "#FDC700",
          500: "#F0B100",
          600: "#D08700",
          700: "#A65F00",
          800: "#894B00",
          900: "#73300A",
          950: "#432004",
        },
        // Emerald
        emerald: {
          50: "#ECFDF5",
          100: "#D0FAE5",
          200: "#A4F4CF",
          300: "#5EE9B5",
          400: "#00D492",
          500: "#00BC7D",
          600: "#009966",
          700: "#007A55",
          800: "#006045",
          900: "#004F3B",
          950: "#002C22",
        },
        // Blue
        blue: {
          50: "#E7F6FF",
          100: "#DBEAFF",
          200: "#BEDBFF",
          300: "#8EC5FF",
          400: "#51A2FF",
          500: "#2B7FFF",
          600: "#155DFC",
          700: "#1447E6",
          800: "#193CB8",
          900: "#1C398E",
          950: "#162456",
        },
        // Rose
        rose: {
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FFCCD3",
          300: "#FFA1AD",
          400: "#FF637E",
          500: "#FF2056",
          600: "#EC003F",
          700: "#C70036",
          800: "#A50036",
          900: "#8B0836",
          950: "#4D0218",
        },
        // 기타
        transparent: "transparent",
        black: "#000000",
        white: "#FFFFFF",
        brand: "#001F3F", // 디자이너가 준 brand 색

        "on-surface": {
          DEFAULT: "var(--on-surface-default)",
          grey1: "var(--on-surface-grey1)",
          grey2: "var(--on-surface-grey2)",
          disabled: "var(--on-surface-disabled)",
        },
        accent: {
          DEFAULT: "var(--accent-default)",
          rose: "var(--accent-rose)",
          yellow: "var(--accent-yellow)",
          emerald: "var(--accent-emerald)",
          blue: "var(--accent-blue)",
        },
        "on-accent": {
          DEFAULT: "var(--on-accent-default)",
          rose: "var(--on-accent-rose)",
          yellow: "var(--on-accent-yellow)",
          emerald: "var(--on-accent-emerald)",
          blue: "var(--on-accent-blue)",
        },
        fill: {
          DEFAULT: "var(--fill-default)",
          grey1: "var(--fill-grey1)",
          rose: "var(--fill-rose)",
          yellow: "var(--fill-yellow)",
          emerald: "var(--fill-emerald)",
          blue: "var(--fill-blue)",
        },
        "on-fill": {
          DEFAULT: "var(--on-fill-default)",
          grey1: "var(--on-fill-grey1)",
          rose: "var(--on-fill-rose)",
          yellow: "var(--on-fill-yellow)",
          emerald: "var(--on-fill-emerald)",
          blue: "var(--on-fill-blue)",
        },
        divider: {
          dv1: "var(--divider-dv1)",
          dv2: "var(--divider-dv2)",
        },
        "transparent-dim": "var(--transparent-dim)",
        "transparent-dim1": "var(--transparent-dim1)",
        "transparent-dim2": "var(--transparent-dim2)",
      },
      // fontWeight 값 (Pretendard 대응)
      fontWeight: {
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      // fontSize: [size, { lineHeight, letterSpacing }]
      fontSize: {
        // mobile 기본값
        h1: ["24px", { lineHeight: "140%", letterSpacing: "-0.4px" }],
        h2: ["20px", { lineHeight: "132%", letterSpacing: "-0.2px" }],
        h3: ["16px", { lineHeight: "132%", letterSpacing: "0" }],
        body1: ["14px", { lineHeight: "130%", letterSpacing: "0.2px" }],
        body2: ["14px", { lineHeight: "160%", letterSpacing: "0.3px" }],
        caption: ["12px", { lineHeight: "140%", letterSpacing: "0.3px" }],
        "caption-sb": ["12px", { lineHeight: "140%", letterSpacing: "0.3px" }],
        button1: ["16px", { lineHeight: "100%", letterSpacing: "1px" }],
        button2: ["14px", { lineHeight: "100%", letterSpacing: "0.8px" }],
        footnote: ["11px", { lineHeight: "100%", letterSpacing: "1.5px" }],
        // tablet (md)
        "md:h1": ["32px", { lineHeight: "140%", letterSpacing: "-0.4px" }],
        "md:h2": ["28px", { lineHeight: "132%", letterSpacing: "-0.2px" }],
        "md:h3": ["18px", { lineHeight: "132%", letterSpacing: "0" }],
        "md:body1": ["16px", { lineHeight: "130%", letterSpacing: "0.2px" }],
        "md:body2": ["16px", { lineHeight: "160%", letterSpacing: "0.3px" }],
        "md:caption": ["14px", { lineHeight: "140%", letterSpacing: "0.3px" }],
        "md:caption-sb": [
          "14px",
          { lineHeight: "140%", letterSpacing: "0.3px" },
        ],
        "md:button1": ["18px", { lineHeight: "100%", letterSpacing: "1px" }],
        "md:button2": ["16px", { lineHeight: "100%", letterSpacing: "0.8px" }],
        "md:footnote": ["12px", { lineHeight: "100%", letterSpacing: "1.5px" }],
        // desktop (lg)
        "lg:h1": ["40px", { lineHeight: "140%", letterSpacing: "-0.4px" }],
        "lg:h2": ["32px", { lineHeight: "132%", letterSpacing: "-0.2px" }],
        "lg:h3": ["20px", { lineHeight: "132%", letterSpacing: "0" }],
        "lg:body1": ["16px", { lineHeight: "130%", letterSpacing: "0.2px" }],
        "lg:body2": ["16px", { lineHeight: "160%", letterSpacing: "0.3px" }],
        "lg:caption": ["14px", { lineHeight: "140%", letterSpacing: "0.3px" }],
        "lg:caption-sb": [
          "14px",
          { lineHeight: "140%", letterSpacing: "0.3px" },
        ],
        "lg:button1": ["18px", { lineHeight: "100%", letterSpacing: "1px" }],
        "lg:button2": ["16px", { lineHeight: "100%", letterSpacing: "0.8px" }],
        "lg:footnote": ["12px", { lineHeight: "100%", letterSpacing: "1.5px" }],
      },
    },
  },
  variants: {
    backgroundColor: ["dark", "hover", "focus"],
    textColor: ["dark", "hover", "focus"],
    borderColor: ["dark", "focus"],
  },
  plugins: [],
};
