/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
      'kanit':'Kanit',
      'head':'Chakra Petch',
      'detail':'Rubik Vinyl',
      'borderText':'Jacques Francois Shadow',
      'pureStyle':'Metal Mania'
    },
    maxWidth:{
      'general':'480px',
      'ipad':'600px',
    },
    backgroundImage:{
      'headCover':"url('/blackholeL.png')"
    },
    height: {
      '103': '400px',
    },
    width:{
      '78':"310px"
    },
    screens:{
      'ph-size':'300px',
      'ipad':'600px',
      'generalSize':'480px'
    }
  },
  },
  plugins: [],
};
