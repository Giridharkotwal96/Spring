import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [product, setProduct] = useState({
    id: "",
    name: "",
    brand: "",
    description: "",
    price: 0,
    category: "",
    quantity: 0,
    releaseDate: "",
    availability: false,
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/product/${id}`);

      setProduct(response.data);

      if (response.data.imageName) {
        setImagePreview(
          `http://localhost:8080/api/product/${id}/image`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct({
      ...product,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "product",
      new Blob([JSON.stringify(product)], {
        type: "application/json",
      })
    );

    // Always send imageFile
    if (image) {
      formData.append("imageFile", image);
    } else {
      formData.append(
        "imageFile",
        new Blob([], { type: "application/octet-stream" }),
        ""
      );
    }

    try {
      await axios.put(`/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Updated Successfully");

      navigate(`/product/${id}`);
    } catch (error) {
      console.error(error);
      alert("Unable to update product");
    }
  };

  return (
    <div className="container mt-5">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Category</label>

          <select
            className="form-select"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="Headphone">Headphone</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Accessories">Accessories</option>
            <option value="Furniture">Furniture</option>
            <option value="Wearables">Wearables</option>
            <option value="Computer Accessories">
              Computer Accessories
            </option>
            <option value="Home Appliances">
              Home Appliances
            </option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Release Date</label>
          <input
            type="date"
            className="form-control"
            name="releaseDate"
            value={product.releaseDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Product Image</label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              width="220"
              className="mt-3 rounded border"
            />
          )}
        </div>

        <div className="col-md-6 d-flex align-items-center">
          <div className="form-check mt-4">
            <input
              type="checkbox"
              className="form-check-input"
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
          <button
            type="submit"
            className="btn btn-primary"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;