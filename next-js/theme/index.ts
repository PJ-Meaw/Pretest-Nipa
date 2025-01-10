import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react"
import { layerStyles } from "./layer-styles"

const config = defineConfig({
  cssVarsRoot: ":where(:root, :host)",
  globalCss: {
    "html, body": {
      bgColor: "#FFFFFF",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      fontSize: "16px",
      fontWeight: "400"
    },
  },  
  theme: {
    tokens:{
      colors: {
        white : { value : "#FFFFFF"},
        black : { value : "#303030"},
        gray : {
          100 : { value : "#F5F5F5"},
          200 : { value : "#E9EAEB"},
          300 : { value : "#D5D7DA"},
          400 : { value : "#A4A7AE"},
          500 : { value : "#717680"},
          600 : { value : "#535862"},
          700 : { value : "#414651"}
        },
        indigo : {
          500 : { value : "#6172F3"},
          600 : { value : "#444CE7"}
        },
        blueLight : {
          500 : { value : "#0BA5EC"},
          800 : { value : "#065986"},
        },
        rose : {
          800 : { value : "#A11043"},
        },
        green : {
          600 : { value : "#039855"},
        },
        brand : {
          700 : { value : "#6941C6"}
        },
        orange : {
          600 : { value : "#EC4A0A"}
        }
        

      },
      // fonts:{
      //   heading: { value : `'Open Sans', sans-serif`},
      //   body: { value : `'Inter',sans-serif`},
      // },
    },
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    layerStyles
  },
})

export default createSystem(defaultConfig ,config)