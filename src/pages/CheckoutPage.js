import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api';
import MessageBox from '../component/MessageBox';
import useAxiosWithAuth from '../useAxiosWithAuth';

export default function CheckoutPage() {

  const axios = useAxiosWithAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const productId = queryParams.get('productId');

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    address2: '',
    country: '',
    state: '',
    zip: '',
    ccName: '',
    ccNumber: '',
    ccExpiration: '',
    ccCvv: ''
  });

  const [isFormFilled, setIsFormFilled] = useState(false);
  const [totalItems, setTotalItems] = useState(''); // 默认值为'items'
  const [subtotal, setSubtotal] = useState('');

  const handleFormChange = event => {
    const { id, value } = event.target;
    setFormValues(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  useEffect(() => {
    // Update the disabled state of the button when form field values change
    // Note: You can add additional checks or validations if needed
    const isFilled = Object.values(formValues).every(value => value !== '');
    setIsFormFilled(isFilled);
  }, [formValues]);

  useEffect(() => {
    // Fetch product information based on the productId
    const fetchProductInfo = async () => {
      try {
        const response = await axios.get(
          `/product-service/flashsale/products/${productId}`
        );
        if (response.data) {
          setTotalItems(response.data.productName); // 设置totalItems为产品名称
          setSubtotal(response.data.price); // 设置productName为产品名称
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductInfo();
  }, [productId, axios]);

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission
    try{
      const response = await axios.post(
        `/order-service/flashsale/checkout`,
        null,
        {
          params: {
            productId: productId,
            userId: userId
          },
        }
      );
      console.log("successful payment", response.data);
      navigate(`/product/${productId}`);
    }catch(error){
      console.log("Error", error);
    }
    
  };


  let shipping = 10;

  
  return (
    <div className="container py-5">
      <div className="row my-4">
        <div className="col-md-5 col-lg-4 order-md-last">
          <div className="card mb-4">
            <div className="card-header py-3 bg-light">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products: 
                  <span>{totalItems}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Price:
                  <span>${subtotal}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping:
                  <span>${shipping}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                  </div>
                  <span>
                    <strong>${Math.round(subtotal + shipping)}</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-lg-8">
          <div className="card mb-4">
            <div className="card-header py-3">
              <h4 className="mb-0">Billing address</h4>
            </div>
            <div className="card-body">
              <form className="needs-validation" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-sm-6 my-1">
                    <label htmlFor="firstName" className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder=""
                      value={formValues.firstName}
                      onChange={handleFormChange}
                      required
                    />

                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>

                  <div className="col-sm-6 my-1">
                    <label htmlFor="lastName" className="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder=""
                      value={formValues.lastName}
                      onChange={handleFormChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>

                  <div className="col-12 my-1">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="you@example.com"
                      value={formValues.email}
                      onChange={handleFormChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping
                      updates.
                    </div>
                  </div>

                  <div className="col-12 my-1">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="1234 Main St"
                      value={formValues.address}
                      onChange={handleFormChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address2" className="form-label">
                      Address 2{" "}
                      {/* <span className="text-muted">(Optional)</span> */}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address2"
                      placeholder="Apartment or suite"
                      value={formValues.address2}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="col-md-5 my-1">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <br />
                    <select className="form-select" id="country" required>
                      <option value="">Choose...</option>
                      <option>China</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>

                  <div className="col-md-4 my-1">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <br />
                    <select className="form-select" id="state" required>
                      <option value="">Choose...</option>
                      <option>Chongqing</option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>

                  <div className="col-md-3 my-1">
                    <label for="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      placeholder=""
                      value={formValues.zip}
                      onChange={handleFormChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Zip code required.
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <h4 className="mb-3">Payment</h4>

                <div className="row gy-3">
                  <div className="col-md-6">
                    <label for="ccName" className="form-label">
                      Name on card
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ccName"
                      placeholder=""
                      value={formValues.ccName}
                      onChange={handleFormChange}
                      required
                    />
                    <small className="text-muted">
                      Full name as displayed on card
                    </small>
                    <div className="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label for="ccNumber" className="form-label">
                      Credit card number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ccNumber"
                      placeholder=""
                      value={formValues.ccNumber}
                      onChange={handleFormChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label for="ccExpiration" className="form-label">
                      expiration
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ccExpiration"
                      placeholder=""
                      value={formValues.ccExpiration}
                      onChange={handleFormChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label for="ccCvv" className="form-label">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ccCvv"
                      placeholder=""
                      value={formValues.ccCvv}
                      onChange={handleFormChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <button
                  className="w-100 btn btn-primary "
                  id = "payButton"
                  type="submit"  
                  // disabled={!isFormFilled}
                >
                  Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
