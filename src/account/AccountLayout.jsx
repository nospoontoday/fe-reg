import { Routes, Route, Navigate } from 'react-router-dom';
import { Register } from './';

function AccountLayout() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8 offset-sm-2 mt-5">
                    <Routes>
                        <Route path="register" element={<Register />} />
                        <Route path="/" element={<Navigate to="/register" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export { AccountLayout };
