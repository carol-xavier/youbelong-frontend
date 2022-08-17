import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from '../../Context/ContextAPI';
import './../../Assets/Style/index.css';
import './../../Assets/Style/reset.css';
import SignUp from '../../Pages/SignUp';
import User from '../../Pages/User';
import SignIn from '../../Pages/SignIn';
import Home from '../../Pages/Home';
import Institution from '../../Pages/Institution';
import RegisterInstiution from '../../Pages/RegisterInstitution';

function App() {

    return (
        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/user-page" element={<User />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/institution/:institutionId" element={<Institution />} />
                    <Route path="/register-institution" element={<RegisterInstiution />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App;