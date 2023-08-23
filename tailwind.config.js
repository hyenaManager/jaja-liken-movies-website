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
    minWidth:{
      '100':'250px',
      '150':'350px',
    },
    minHeight:{
      'normal':'400px',
      'imgHeight':'250px'
    },
    maxHeight:{
      'normal':'400px',
      'small':'250px',
      'almost':"95%"
    }
    ,
    backgroundImage:{
      'headCover':"url('/blackholeL.png')"
    },
    height: {
      '103': '400px',
      'almost':'93%'
    },
    width:{
      '78':"310px"
    },
    screens:{
      'ph-size':'300px',
      'ipad':'600px',
      'generalSize':'480px',
      'sm-md':"700px",
    }
  },
  },
  plugins: [],
};
