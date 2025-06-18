import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchCartRequest, addUpdateCartRequest } from "../store/cart/actions";
import { AuthRepository } from "../services/api/AuthRepository";
import '../css/home.css';

function Home(props) {
  const { auth, cart } = props;

  const { isAuthenticated } = auth;
  const { items: cartItems, loading, error } = cart;

  const [shop, setShop] = useState(null);
  const [menu, setMenu] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchMenu() {
      try {
        const res = await AuthRepository.getMenuByShopAndCategory();
        setShop(res.data.shop);
        setMenu(res.data.menu_list || []);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    }
    fetchMenu();

    const tempOrderId = localStorage.getItem("temporaryOrderId");
    if (tempOrderId) {
      dispatch(fetchCartRequest(tempOrderId));
    }
  }, [isAuthenticated, dispatch]);

  const cleanText = (text) => text?.replace(/[^\x00-\x7F]/g, "").trim() || "";

  const handleCartAction = (dish, quantity = 1) => {
    if (quantity < 1) return;

    const temporaryOrderId = localStorage.getItem("temporaryOrderId");
    if (!temporaryOrderId) {
      alert("Temporary order ID missing. Please try again.");
      return;
    }

    const payload = {
      addonGroupChoiceIds: [],
      addonIds: [],
      dishId: dish.dishId,
      isComplimentary: false,
      optionsChoiceIds: [],
      quantity,
      temporaryOrderId: parseInt(temporaryOrderId),
    };
    dispatch(addUpdateCartRequest(payload));
  };

  const goToCartPage = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartTotal", cartItems.userNetPayableFormatted);
    window.location.href = "/cart";
  };

  if (!isAuthenticated) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div>
          <h1>Welcome to the Home Page</h1>
          <p>Please log in to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container home-container my-4">
      <h1 className="shop-title text-center mb-4">{shop?.title || "Loading shop..."}</h1>

      <div className="row">
        <div className="col-md-7">
          <div className="menu-box shadow-sm p-3 rounded">
            <h4 className="section-heading mb-3">🍽 Menu</h4>
            <div className="d-flex flex-column gap-3" style={{ maxHeight: "750px", overflowY: "auto" }}>
              {Array.isArray(menu) && menu.length > 0 ? (
                menu.map((dish) => (
                  <div
                    key={dish.dishId}
                    className="menu-card p-3 border rounded"
                    onClick={() => handleCartAction(dish)}
                    style={{ cursor: "pointer" }}
                    title={`Add ${cleanText(dish.title)} to cart`}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div className="menu-title fw-semibold">{cleanText(dish.title)}</div>
                      <div className="menu-price text-success">{dish.priceFormatted}</div>
                    </div>
                    {dish.category?.title && (
                      <div className="menu-category text-muted fst-italic">{cleanText(dish.category.title)}</div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted">Menu is empty.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="cart-box shadow-sm p-3 rounded" >
            <h4 className="section-heading mb-3">🛒 Cart Summary</h4>

            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && cartItems?.orderItemList?.length > 0 && (
              <div className="cart-items mb-3" style={{ maxHeight: "350px", overflowY: "auto" }}>
                <div className="row fw-bold border-bottom pb-2 mb-2">
                  <div className="col-4">Item</div>
                  <div className="col-3 text-left">Unit Price</div>
                  <div className="col-3 text-center">Quantity</div>
                  <div className="col-2 text-end">Total</div>
                </div>

                {cartItems.orderItemList.map((item, index) => (
                  <div className="row align-items-center border-bottom py-2" key={index}>
                    <div className="col-4">{cleanText(item.title)}</div>

                    <div className="col-3 text-let">
                      {item.unitPriceFormatted || `৳${(item.unitPrice || 0).toFixed(2)}`}
                    </div>

                    <div className="col-3 d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleCartAction(item, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleCartAction(item, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <div className="col-2 text-end text-primary">
                      {item.priceFormatted || `৳${(item.price || 0).toFixed(2)}`}
                    </div>
                  </div>
                ))}
              </div>

            )}

            {!loading && !error && cartItems?.orderItemList?.length > 0 && (
              <div className="cart-summary">
                <div className="d-flex justify-content-between py-1">
                  <strong>Total Amount:</strong>
                  <span>{cartItems.totalAmountFormatted || "৳0.00"}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <strong>Sales Tax:</strong>
                  <span>{cartItems.salesTaxFormatted || "৳0.00"}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <strong>Service Charge:</strong>
                  <span>{cartItems.serviceChargeAmountFormatted || "৳0.00"}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <strong>Service + Tax:</strong>
                  <span>{cartItems.totalCollectionFormatted || "৳0.00"}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <strong>Discount:</strong>
                  <span>{cartItems.totalDiscountFormatted || "৳0.00"}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <strong>Payable:</strong>
                  <span className="text-success fw-bold">{cartItems.userNetPayableFormatted || "৳0.00"}</span>
                </div>
              </div>

            )}

            {!loading && !error && cartItems?.orderItemList?.length > 0 && (
              <button onClick={goToCartPage} className="btn btn-primary mt-3 w-100">
                Proceed to Checkout ( {cartItems.userNetPayableFormatted || "৳0.00"} )
              </button>
            )}

            {!loading && !error && (!cartItems.orderItemList || cartItems.orderItemList.length === 0) && (
              <p className="text-muted">No items added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart,
});

export default connect(mapStateToProps)(Home);
