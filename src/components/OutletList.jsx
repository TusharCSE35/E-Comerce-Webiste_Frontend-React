import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/auth/actions';
import '../css/outletList.css';

const OutletList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        message,
        shopTitle,
        shopLogoUrl,
        outletList = [],
        userId,
        name,
        username,
        password,
        shopId
    } = location.state || {};


    const handleOutletClick = (outlet) => {
        const payleod = {
            userId,
            name,
            username,
            password,
            shopId,
            outletId: outlet.id
        }

        dispatch(loginUser(payleod, navigate));
    };

    return (
        <div className="outlet-container">
            <div className="user-header">
                <img src={shopLogoUrl} alt="Shop Logo" className="shop-logo-header" />
                <h2 className="shop-title-header">Welcome, {shopTitle}</h2>
            </div>

            <h3 className="outlet-message">{message}</h3>

            <div className="outlet-list">
                {outletList.map((outlet) => (
                    <div
                        key={outlet.id}
                        className="outlet-item"
                        onClick={() => handleOutletClick(outlet)}
                    >
                        <h4 className="outlet-title">{outlet.title}</h4>
                        <p className="outlet-address">{outlet.streetAddress}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OutletList;
