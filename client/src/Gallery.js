import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import Hearts from "./Hearts.js";

function Gallery() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch images
  const fetchImages = async () => {
    const res = await axios.get("http://localhost:5000/api/photos", {
      headers: { Authorization: token }
    });
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Upload image
  const upload = async () => {
    if (!file) return alert("Select a file first!");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    await axios.post(
      "http://localhost:5000/api/photos/upload",
      formData,
      { headers: { Authorization: token } }
    );

    setFile(null);
    setCaption("");
    fetchImages(); // refresh properly
  };

  // Delete image
  const deleteImage = async (img) => {
    await axios.delete(
      `http://localhost:5000/api/photos/${img}`,
      { headers: { Authorization: token } }
    );

    fetchImages();
  };

  return (
    <>
     {/* ❤️ Hearts animation MUST be here */}
      <Hearts />

      {/* Upload Card */}
      <div style={{
        margin: "30px auto",
        width: "320px",
        padding: "25px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(20px)",
        textAlign: "center",
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
      }}>
        <p style={{ color: "white", marginBottom: "10px" }}>
          Upload a Memory 💕
        </p>

        <input type="file" onChange={e => setFile(e.target.files[0])} />
        
        <input
          type="text"
          placeholder="Write a caption ❤️"
          value={caption}
          onChange={e => setCaption(e.target.value)}
          style={{
            marginTop: "10px",
            padding: "8px",
            width: "100%",
            borderRadius: "8px",
            border: "none"
          }}
        />

        <button onClick={upload} style={{ marginTop: "10px" }}>
          Upload ❤️
        </button>
      </div>

      {/* Gallery Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          padding: "20px"
        }}
      >
        {images.map((imgObj, i) => (
          <div
            key={i}
            className="image-card"
            style={{
              position: "relative",
              borderRadius: "15px",
              overflow: "hidden",
              cursor: "pointer"
            }}
            onClick={() => setSelectedImage(imgObj)}
          >
            <img
              src={imgObj.image}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover"
              }}
            />

            {/* Overlay */}
            <div className="overlay">
              ❤️ View
            </div>

            {/* Caption */}
            <div style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              background: "rgba(0,0,0,0.5)",
              color: "white",
              padding: "5px",
              fontSize: "14px"
            }}>
              {imgObj.caption}
            </div>

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteImage(imgObj._id);
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer"
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={selectedImage.image}
              style={{
                maxWidth: "90%",
                maxHeight: "80%",
                borderRadius: "15px"
              }}
            />
            <p style={{ color: "white", marginTop: "10px" }}>
              {selectedImage.caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;