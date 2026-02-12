/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily:{
        'popExtralight': 'Poppins_200ExtraLight',
        'popLight': 'Poppins_300Light',
        'popLightItalic': 'Poppins_300Light_Italic',
        'popRegular': 'Poppins_400Regular',
        'popMedium': 'Poppins_500Medium',
        'popSemibold' : 'Poppins_600SemiBold',
        'popSemiboldItalic' : 'Poppins_600SemiBold_Italic',
        'popBold': 'Poppins_700Bold',
      },
        colors: {
        'branco': '#FAFAFA',
        'preto': {
          DEFAULT: '#000',
          dark: '#121212',
        },
        'input': {
          DEFAULT: '#F0F0F0',
          dark: '#646464',
        },
        'placeInput': '#5e5e5e',
        'vermelho': '#BB1C00',
        'masc': {
          DEFAULT: '#BCCFFF',
          icon: '#2E9AFF'  
        },
        'fem': {
          DEFAUL: '#FFBDF1',
          icon: '#C700A2'
        },
        
        // Cor de erro/sucesso fundo
        'success': '#D8FFCE',
        'error': '#FFAD9E',
      },
      },
  },
  plugins: [],
}
