import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<HomePage />} /> */}
                <Route path="/sign-up" element={<SignUp />} />
                {/* <Route path="/sign-in" element={} />
        <Route path="/institution-registration" element={} />
        <Route path="/user-page" element={<UserPage />} />
        <Route path="/insitution/:institutionId" element={} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default App;