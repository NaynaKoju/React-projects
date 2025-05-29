import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./pageediting.css";
import RichTextEditor from "./richtexteditor";

const isValidImage = (url) => {
  if (typeof url !== "string") return false;

  const trimmedUrl = url.trim().toLowerCase();
  const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg", ".ico", ".avif", ".tiff"];
 
  return (
    (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://") || trimmedUrl.startsWith("/")) &&
    validExtensions.some((ext) => trimmedUrl.endsWith(ext))
  );
};

function AdminEditPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [sections, setSections] = useState([]);
  const [originalSections, setOriginalSections] = useState([]);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [brokenImages, setBrokenImages] = useState(new Set());
  const isModified = JSON.stringify(sections) !== JSON.stringify(originalSections);

  useEffect(() => {
  fetch(`http://localhost:3004/api/pages/${slug}`)
    .then(res => res.json())
    .then(data => {
      const copy = JSON.parse(JSON.stringify(data)); // deep copy
      setSections(copy);
      setOriginalSections(copy);
      setBrokenImages(new Set());
    })
    .catch(err => console.error("Failed to load page", err));
}, [slug]);
  // useEffect(() => {
  //   fetch(`http://localhost:3004/api/pages/${slug}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setSections(data);
  //       setOriginalSections(data);
  //       setBrokenImages(new Set());
  //     })
  //     .catch(err => console.error("Failed to load page", err));
  // }, [slug]);

  const handleImageError = (index, url) => {
    setBrokenImages((prev) => new Set(prev).add(url));
  };

  const handleChange = (index, field, value) => {
  setSections(prevSections => {
    const updated = [...prevSections];
    updated[index] = { ...updated[index], [field]: value };
    return updated;
  });
};

  // const handleChange = (index, field, value) => {
  //   const updated = [...sections];
  //   updated[index][field] = value;
  //   setSections(updated);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

  const preparedSections = sections
  .filter(section => !section._delete) // Remove marked-for-deletion
  .map(section => {
    if (section.title === "Slider Images") {
      try {
        JSON.parse(section.content);
        return section;
      } catch {
        if (Array.isArray(section.content)) {
          return {
            ...section,
            content: JSON.stringify(section.content),
          };
        }
      }
    }
    return section;
  });

  // to let backend know which id to delete
  const idsToDelete = sections
  .filter(section => section._delete && section.id)
  .map(section => section.id);

    const res = await fetch(`http://localhost:3004/api/pages/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sections: preparedSections, deleteIds: idsToDelete }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Updated successfully!");
      setIsEditing(false);
      setOriginalSections(preparedSections);
      setBrokenImages(new Set());
    } else {
      setMessage(data.message || "Failed to update.");
    }
  };

  const handleCancel = () => {
    setSections(originalSections);
    setIsEditing(false);
    setMessage("");
    setBrokenImages(new Set());
  };

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3004/api/upload-image", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        const imageUrl = data.imageUrl;
        if (sections[index].title === "Main Image URL") {
          handleChange(index, "content", imageUrl);
        } else {
          const updatedContent = `${sections[index].content}<br/><img src="${imageUrl}" alt="uploaded image" />`;
          handleChange(index, "content", updatedContent);
        }
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const handleRecentImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3004/api/upload-image", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        const imageUrl = data.imageUrl;
        let imageList = [];
        try {
          imageList = JSON.parse(sections[index].content || "[]");
          if (!Array.isArray(imageList)) imageList = [];
        } catch {
          imageList = [];
        }
        imageList.push(imageUrl);
        handleChange(index, "content", JSON.stringify(imageList));
      }
    } catch (err) {
      console.error("Error uploading recent image:", err);
    }
  };

  // const handleAddSection = () => {
  //   const newSection = { id:null, title: "", content: "" };
  //   setSections(prev=> [...prev, newSection]);
  // };
 const handleAddSection = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found.");
      return;
    }

    const newSection = { id: null, title: "", content: "" };

    // Update UI state
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    console.log("New sections state:", updatedSections);

    // Make API call
    const response = await fetch(`http://localhost:3004/api/pages/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sections: updatedSections }),
    });

    const data = await response.json();
    console.log("Response from API:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to save section.");
    }

  } catch (error) {
    console.error("Error in handleAddSection:", error);
  }
};


  // const handleDeleteSection = (index) => {
  //   const confirmed = window.confirm("Are you sure you want to delete this section?");
  //   if (confirmed) {
  //     const updatedSections = sections.filter((_, i) => i !== index);
  //     setSections(updatedSections);
  //   }
  // };

  const handleDeleteSection = (index) => {
  const confirmed = window.confirm("Are you sure you want to delete this section?");
  if (!confirmed) return;

  setSections((prevSections) => {
    const section = prevSections[index];

    if (section.id) {
      // Existing section → mark it for deletion
      const updated = [...prevSections];
      updated[index] = { ...section, _delete: true };
      return updated;
    } else {
      // Unsaved section → remove it directly
      return prevSections.filter((_, i) => i !== index);
    }
  });
};

  return (
    <div className="edit-page-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      <h2 className="page-heading">Edit "{slug}" Page</h2>
      {message && <p className="message">{message}</p>}

      {!isEditing ? (
        <div>
          {sections
          .filter((section) => !section._delete) //hide deleted sections from UI
          .map((section, index) => (
            <div key={section.id || index}>
               <input
        required
        value={section.title}
        onChange={(e) => handleChange(index, "title", e.target.value)}
      />
      {/* Tiptap editor here */}
      <button onClick={() => handleDeleteSection(index)}>Delete</button>


         <h3 className="page-title">{section.title}</h3>

              {section.title === "Slider Images" ? (
                <div className="recent-images-viewer">
                  {(() => {
                    try {
                      const images = JSON.parse(section.content || "[]");
                      return Array.isArray(images)
                        ? images
                            .filter(img => !brokenImages.has(img))
                            .map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt={`slider-${i}`}
                                style={{ width: "150px", margin: "5px", borderRadius: "8px" }}
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  handleImageError(i, img);
                                }}
                              />
                            ))
                        : <p>Invalid image list.</p>;
                    } catch {
                      return <p>Invalid image list.</p>;
                    }
                  })()}
                </div>
              ) : (
                <p className="page-content" dangerouslySetInnerHTML={{ __html: section.content }} />
              )}
            </div>
          ))}
          <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {sections.map((section, index) => (
            <div key={index}>
              <input
                type="text"
                name="title"
                value={section.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                placeholder="Page Title"
                className="input-field"
                required
              />

              {section.title === "Slider Images" ? (
                <>
                  <div className="recent-images-viewer">
                    {(() => {
                      try {
                        const images = JSON.parse(section.content || "[]");
                        if (!Array.isArray(images)) return <p>Invalid image list.</p>;

                        return images.map((img, i) => (
                          <div key={i} style={{ display: "inline-block", position: "relative", margin: "5px" }}>
                            <img
                              src={img}
                              alt={`slider-${i}`}
                              style={{ width: "150px", borderRadius: "8px" }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updatedImages = images.filter((_, idx) => idx !== i);
                                handleChange(index, "content", JSON.stringify(updatedImages));
                              }}
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                cursor: "pointer",
                                width: "24px",
                                height: "24px",
                                lineHeight: "20px",
                                fontWeight: "bold"
                              }}
                              aria-label={`Delete image ${i + 1}`}
                            >
                              &times;
                            </button>
                          </div>
                        ));
                      } catch {
                        return <p>Invalid image list.</p>;
                      }
                    })()}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleRecentImageUpload(e, index)}
                  />
                </>
              ) : (
                <>
                
  <RichTextEditor
    key={`editor-${index}`}
    content={section.content}
    onChange={(value) => handleChange(index, "content", value)}
  />
  <div className="image-upload">
    <label htmlFor={`upload-${index}`}>Upload Image:</label>
    <input
      id={`upload-${index}`}
      type="file"
      accept="image/*"
      onChange={(e) => handleImageChange(e, index)}
    />

    {(() => {
      const extractImageUrl = (html) => {
        const match = html.match(/<img\s+src="([^"]+)"/i);
        return match ? match[1] : null;
      };
      const imageUrl = extractImageUrl(sections[index].content) || sections[index].content;
      if (isValidImage(imageUrl)) {
        return (
          <img
            src={imageUrl}
            alt={`preview-${index}`}
            className="preview-image"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        );
      }

      return null;
    })()}
  </div>
</>
              )}

              <button
                type="button"
                onClick={() => handleDeleteSection(index)}
                className="delete-section-btn"
              >
                🗑️ Delete Section
              </button>
              <hr />
            </div>
          ))}

          <button type="button" onClick={handleAddSection} className="add-section-btn">
            ➕ Add Section
          </button>

          <div className="button-group">
            <button type="submit" disabled ={!isModified} className="save-btn">Save</button>
            <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdminEditPage;
