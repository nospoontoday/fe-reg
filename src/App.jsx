import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { history } from '_helpers';
import { Alert } from '_components';
import { AccountLayout } from 'account';

export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="app-container bg-light">
            <Alert />
            <div className="container pt-4 pb-4">
                <Routes>
                    <Route path="*" element={<AccountLayout />} />
                </Routes>
            </div>
        </div>
    );
}
