import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import {  Route, Routes } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import MainWrapped from "../components/main/MainWrapped";
import { blue, blueGrey, teal} from "@mui/material/colors";
import Landing from "./landing/Landing";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from 'react-hot-toast';

function App() {
  const theme = createTheme({
		primaryColor: blue,
		typography: {
			fontFamily: [
				'Nunito Sans',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'sans-serif'
			].join(','),
		},
		palette: {
			primary: {
				main: '#0074D9',
			},
			secondary: {
				main: '#FF4136',
			},
			textColor: {
				main: '#333333',
			},
			neutral:{
				main:'#DDDDDD',
			},
			successColor:{
				main:'#2ECC40',
			},
			warningColor:{
				main:'#FF851B',
			},
			errorColor:{
				main:'#FF4136',
			},
			teal:{
				main:teal[500]
			},
			blueGray1:{
				main:blueGrey[800]
			}
		}
	});
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AuthProvider>
			<Toaster/>
			<Routes>
				<Route exact path="/" element={<Landing/>} />
				<Route path='/*' element={<MainWrapped/>}/>
				{/* <Route path="/" exact element={<Navigate replace to="/dashboard"/>}/> */}
			</Routes>
		</AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
