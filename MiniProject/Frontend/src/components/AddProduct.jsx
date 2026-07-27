import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    id: null,
    name: "",
    brand: "",
    description: "",
    price: 0,
    category: "",
    quantity: 0,
    releaseDate: "",
    availability: false,
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "product",
      new Blob([JSON.stringify(product)], {
        type: "application/json",
      })
    );

    formData.append("imageFile", image);

    console.log("Sending Product:");
    console.log(product);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/product",
        formData
      );

      console.log(response.data);
      alert("Product Added Successfully");

      setProduct({
        id: null,
        name: "",
        brand: "",
        description: "",
        price: 0,
        category: "",
        quantity: 0,
        releaseDate: "",
        availability: false,
      });

      setImage(null);
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      console.error(error);
      alert("Error Adding Product");
    }
  };

  return (
    <div className="container mt-4">
      <form className="row g-3" onSubmit={submitHandler}>
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Brand</label>
          <input
            className="form-control"
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Description</label>
          <input
            className="form-control"
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input
            className="form-control"
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={product.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="Headphone">Headphone</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Toys">Toys</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Quantity</label>
          <input
            className="form-control"
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Release Date</label>
          <input
            className="form-control"
            type="date"
            name="releaseDate"
            value={product.releaseDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Image</label>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="col-md-6 d-flex align-items-center">
          <div className="form-check mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              name="availability"
              checked={product.availability}
              onChange={handleInputChange}
            />
            <label className="form-check-label">
              Product Available
            </label>
          </div>
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;