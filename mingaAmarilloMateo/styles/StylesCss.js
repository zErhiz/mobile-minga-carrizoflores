 import { StyleSheet } from "react-native";
 
export const StylesNew = StyleSheet.create({
  containerHome: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
    backgroundPosition: "right",
  },
  
  container2: {
    flex: 1,
    backgroundColor: "#f01111",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
  parrafo:{
    fontSize: 20,
    color: "#FFFFFF",
  },
  viewHome1:{
    borderColor: "orange",
    borderWidth: 2,
   alignItems: "center",
   gap: 20,

  },
  buttonSignIn: {
    backgroundColor: "orange",
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonTextSignIn: {
    color: "#FFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  linearGradient: {
    
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 20
  },
  signUpText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
    borderColor: "orange",
    borderWidth: 2,
  },
  signUpLink: {
    color: "#f472b6",
    fontWeight: "bold",
    borderColor: "orange",
    borderWidth: 2,
    textAlign: "center",
  },
}); 