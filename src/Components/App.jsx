import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './../Pages/SignUp';
import User from './../Pages/User';
import SignIn from './../Pages/SignIn';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<HomePage />} /> */}
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/user-page" element={<User />} />
                <Route path="/sign-in" element={<SignIn />} />
        {/* <Route path="/institution-registration" element={} />
        <Route path="/insitution/:institutionId" element={} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default App;