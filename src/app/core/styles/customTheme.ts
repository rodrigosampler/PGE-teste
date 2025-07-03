import {definePreset} from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const customTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e0f2f1',
      100: '#b2dfdb',
      200: '#80cbc4',
      300: '#4db6ac',
      400: '#26a69a',
      500: '#004d40',
      600: '#003d33',
      700: '#00251a',
    },
    accent: {
      50: '#f1f8f6',
      100: '#d2eee5',
      200: '#b3e3d4',
      300: '#8dcfbe',
      400: '#6bbba7',
      500: '#4aa791',
      600: '#2a937a',
    },
    neutral: {
      900: '#252c30',
      50: '#ffffff'
    },
    colorScheme: {
      light: {
        primary: {
          color: '#004d40',
          inverseColor: '#ffffff',
          hoverColor: '#003d33',
          activeColor: '#00251a'
        },
        accent: {
          color: '#8dcfbe',
          hoverColor: '#6bbba7'
        },
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b'
        }
      },
      dark: {
        primary: {
          color: '#8dcfbe',
          inverseColor: '#252c30',
          hoverColor: '#6bbba7',
          activeColor: '#4aa791'
        },
        accent: {
          color: '#4aa791',
          hoverColor: '#2a937a'
        },
        surface: {
          0: '#252c30',
          50: '#2f373c',
          100: '#384147',
          200: '#404a50',
          300: '#4a535a',
          400: '#545d66',
          500: '#5e6871'
        }
      }
    }
  },

  components: {
    button: {
      root: {
        borderRadius: '6px',
        paddingX: '1rem',
        paddingY: '0.5rem',
        fontWeight: '500',
      },
      colorScheme: {
        light: {
          root: {
            primary: {
              background: '#004d40',
              hoverBackground: '#003d33',
              activeBackground: '#00251a',
              borderColor: '#004d40',
              hoverBorderColor: '#003d33',
              activeBorderColor: '#00251a',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff'
            },
            secondary: {
              background: 'transparent',
              hoverBackground: '#f1f5f9',
              activeBackground: '#e2e8f0',
              borderColor: '#cbd5e1',
              hoverBorderColor: '#94a3b8',
              activeBorderColor: '#64748b',
              color: '#252c30',
              hoverColor: '#004d40',
              activeColor: '#004d40'
            }
          }
        },
        dark:{
          root:{
            primary:{
              background: "#004d40",
              color: "#f1f5f9"
            }
          }
        }
      }
    },

    card: {
      root: {
        borderRadius: '12px',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        padding: '1rem'
      },
      colorScheme: {
        light: {
          root: {
            background: '#6eb19f',
            color: '#252c30'
          },
          subtitle: {
            color: '#64748b'
          }
        },
        dark: {
          root: {
            background: '#1b7fbd',
            color: '#ffffff'
          },
          subtitle: {
            color: '#8dcfbe'
          }
        }
      }
    },

    menubar: {
      root: {
        borderRadius: '0px'
      },
      colorScheme: {
        light: {
          item: {
            color: '#004d40',
            hoverColor: '#8dcfbe'
          },
          root: {
            primary: {
              background: '#004d40',
              hoverBackground: '#003d33',
              activeBackground: '#00251a',
              borderColor: '#004d40',
              hoverBorderColor: '#003d33',
              activeBorderColor: '#00251a',
              color: '#ffffff',
              hoverColor: '#8dcfbe',
              activeColor: '#8dcfbe'
            }
          }
        },
        dark: {
          item: {
            color: '#FFFFFF',
            hoverColor: '#d3f8ee'
          },
          root: {
            primary: {
              background: '#252c30',
              hoverBackground: '#2f373c',
              activeBackground: '#384147',
              borderColor: '#252c30',
              hoverBorderColor: '#2f373c',
              activeBorderColor: '#384147',
              color: '#8dcfbe',
              hoverColor: '#ffffff',
              activeColor: '#ffffff'
            }
          }
        }
      }
    },

    inputtext: {
      root: {
        borderRadius: '4px',
        paddingX: '0.75rem',
        paddingY: '0.5rem'
      },
      colorScheme: {
        light: {
          root: {
            background: '#ffffff',
            borderColor: '#cbd5e1',
            hoverBorderColor: '#004d40',
            focusBorderColor: '#004d40',
            invalidBorderColor: '#e53935',
            color: '#252c30',
            placeholderColor: '#64748b',
          }
        },
        dark: {
          root: {
            background: '#2f373c',
            borderColor: '#5e6871',
            hoverBorderColor: '#8dcfbe',
            focusBorderColor: '#8dcfbe',
            invalidBorderColor: '#e53935',
            color: '#ffffff',
            placeholderColor: '#cbd5e1',
          }
        }
      }
    }
  }
});
