import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { format } from 'date-fns';
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../api";
import useAxiosWithAuth from "../useAxiosWithAuth";

export default function AddProduct() {
  const axiosAuth = useAxiosWithAuth();

  let navigate = useNavigate();
  const [productName, setProductName] = useState();
  const [img, setImg] = useState();
  const [detail, setDetail] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [saleStartTime, setSaleStartTime] = useState(new Date());
  const [saleEndTime, setSaleEndTime] = useState(new Date());


  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  // const handleUploadImage = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const formData = new FormData();
  //     formData.append('file', selectedImage);
  //     const response = await axios.post(`/product-service/seller/products/uploadImage`, 
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //     );
  //     const imgPath = response.data;
  //     setImg(imgPath);
  //   } catch (error) {
  //     console.error('Error while uploading image: ', error);
  //   }

  //   handleHideModal();
  // };

  const handleUploadImage = async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData();
    formData.append('file', selectedImage);

    // Use FileReader to read the image file and convert it to binary data
    const reader = new FileReader();
    reader.onload = async () => {
      const binaryImage = new Uint8Array(reader.result);

      // Send a request to the backend to get the pre-signed URL
      const response = await axiosAuth.get('product-service/seller/products/uploadImage', {
        params: {
          extension: selectedImage.name.split('.').pop(), // Get the file extension
        },
      });

      const updatePath = response.data;

      // Use the pre-signed URL to upload the image to S3
      await axios.put(updatePath, binaryImage);

      // Save the image URL to the state
      setImg(updatePath.split('?')[0]); // Only store the part before the '?' in the URL
    };

    // Start reading the image file as binary data
    reader.readAsArrayBuffer(selectedImage);
  } catch (error) {
    console.error('Error while uploading image: ', error);
  }

  handleHideModal();
};

 
  
  // 返回获取的状态值获取登陆者id和role
  //获取登录成功后的用户信息
  const userInfo = useSelector(state => state.userLogin.userInfo);
  
  const onSubmit = async (e) => {
    e.preventDefault();

    const formattedSaleStartTime = format(saleStartTime, "yyyy-MM-dd'T'HH:mm:ss");
    const formattedSaleEndTime = format(saleEndTime, "yyyy-MM-dd'T'HH:mm:ss");

    const product = {
      sellerId:userInfo.id,
      productName: productName,
      img: img,
      detail: detail,
      price: price,
      stock: stock,
      saleStartTime: formattedSaleStartTime,
      saleEndTime: formattedSaleEndTime,
    };
    console.log("Product: ", product)
    await axiosAuth.post(`/product-service/seller/products` , product);
    navigate("/seller");
  };


  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Product</h2>

          <form onSubmit={(e) => onSubmit(e)}>

            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
              Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter product name"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Image" className="form-label">
              Image
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Update image"
                name="img"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
              <Button className="ms-2" variant="primary" onClick={handleShowModal}>
                  Select Image
              </Button>
            </div>

            <div className="mb-3">
              <label htmlFor="Detail" className="form-label">
              Detail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Detail of product"
                name="detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
              price
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
              stock
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter stock"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="saleStartTime" className="form-label">
              saleStartTime
              </label>
              <input
                type="datetime-local"
                className="form-control"
                placeholder="Enter sale Start Time"
                name="saleStartTime"
                value={saleStartTime ? saleStartTime.toISOString().slice(0, 16) : ''}
                onChange={(e) => setSaleStartTime(new Date(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="saleEndTime" className="form-label">
              saleEndTime
              </label>
              <input
                type="datetime-local"
                className="form-control"
                placeholder="Enter sale End Time"
                name="saleEndTime"
                value={saleEndTime ? saleEndTime.toISOString().slice(0, 16) : ''}
                onChange={(e) => setSaleEndTime(new Date(e.target.value))}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/products">
              Cancel
            </Link>
          </form>
        </div>
      </div>

      <Modal show={showModal} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Select Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleUploadImage}>
          <div className="mb-3">
            <label htmlFor="imageUpload" className="form-label">
              Choose an image:
            </label>
            <input
              type="file"
              className="form-control"
              id="imageUpload"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </form>
      </Modal.Body>
    </Modal>
    </div>

    
  )
}
