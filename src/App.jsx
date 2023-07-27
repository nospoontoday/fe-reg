import { Routes, Route } from 'react-router-dom';

import { Alert } from '_components';
import { AccountLayout } from 'account';

export { App };

function App() {
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
