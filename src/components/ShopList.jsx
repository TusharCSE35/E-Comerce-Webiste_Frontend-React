import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { outletList } from '../store/auth/actions';
import '../css/shopList.css';

const ShopList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { 
        userId, 
        name, 
        message, 
        profileImageUrl, 
        username, 
        password, 
        shopList = [] 
    } = location.state || {};

    const handleShopClick = (shop) => {
        const payload = {
            userId,
            name,
            username,
            password,
            shopId: shop.shopId,
            shopLogoUrl: shop.shopLogoUrl,
            shopTitle: shop.shopTitle
        };
        dispatch(outletList(payload, navigate));
    };

    return (
        <div className="shop-container">
            <div className="user-header">
                <img src={profileImageUrl} alt="Profile" className="profile-pic" />
                <h2>Welcome, {name}</h2>
            </div>

            <h4>{message}</h4>
            <div className="shop-list">
                {shopList.map((shop) => (
                    <div
                        key={shop.shopId}
                        className="shop-item"
                        onClick={() => handleShopClick(shop)}
                    >
                        <img src={shop.shopLogoUrl} alt={shop.shopTitle} className="shop-logo" />
                        <span className="shop-title">{shop.shopTitle}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopList;
