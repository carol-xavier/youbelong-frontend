import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import DonorContext from '../Context/DonorContext';
import './../Assets/Style/index.css';
import './../Assets/Style/reset.css';
import SignUp from './../Pages/SignUp';
import User from './../Pages/User';
import SignIn from './../Pages/SignIn';
import Home from './../Pages/Home';

function App() {
    const [donorInstitutions, setDonorInstitutions] = useState([])
    const getData = { donorInstitutions, setDonorInstitutions }; 

    return (
        <DonorContext.Provider value={getData}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/user-page" element={<User />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/institution/:institutionId" element={<User />} />
                    {/* <Route path="/institution-registration" element={} />*/}
                </Routes>
            </BrowserRouter>
        </DonorContext.Provider>
    )
}

export default App;