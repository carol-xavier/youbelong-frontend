import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from '../../Context/ContextAPI';
import './../../Assets/Style/index.css';
import './../../Assets/Style/reset.css';
import SignUp from '../../Pages/SignUp';
import User from '../../Pages/User';
import SignIn from '../../Pages/SignIn';
import Home from '../../Pages/Home';
import Institution from '../../Pages/Institution';

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
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App;