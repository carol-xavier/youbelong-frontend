import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import './../Assets/Style/index.css';
import './../Assets/Style/reset.css';
import SignUp from './../Pages/SignUp';
import User from './../Pages/User';
import SignIn from './../Pages/SignIn';
import Home from './../Pages/Home';

function App() {
    // const getData = { userData, setUserData }; //salvar inst. do usuário

    return (
        // <UserContext.Provider value={}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/user-page" element={<User />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    {/* <Route path="/institution-registration" element={} />
        <Route path="/insitution/:institutionId" element={} /> */}
                </Routes>
            </BrowserRouter>
        // </UserContext.Provider>
    )
}

export default App;