import { useState, useEffect, useContext } from "react";
import ProfilePreview from "../components/ProfilePreview";
import axiosInstance from "../api/axiosInstance";
import AuthContext from "../context/AuthContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ToastContext } from "../context/ToastContext";
import "../styles/links.css";

// Import icons and images
import defaultProfile from "../assets/avatar.png";
import linkSelected from "../assets/links/link-icon-selected.png";
import linkUnselected from "../assets/links/link-icon-without-selected.png";
import signalIcon from "../assets/links/streamline-signal-full.png";
import editIcon from "../assets/links/system-uicons-write.png";
import pictureIcon from "../assets/links/system-uicons-picture.png";
import deleteIcon from "../assets/links/delete.png";
import instagramIcon from "../assets/instagram.png";
import facebookIcon from "../assets/facebook.png";
import youtubeIcon from "../assets/youtube.png";
import xIcon from "../assets/x.png";

const Links = () => {
  const { user } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const [bio, setBio] = useState("Bio");
  const [image, setImage] = useState(defaultProfile);
  const [editableUsername, setEditableUsername] = useState(
    user?.username || ""
  );
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [selectedType, setSelectedType] = useState("link");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bgColor, setBgColor] = useState("#5A3E2B");
  const [theme, setTheme] = useState("light");
  const [layout, setLayout] = useState("default");
  const customization = {
    theme,
    layout,
    avatar: image,
    bio,
    username: user?.username,
    bannerColor: bgColor,
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get("api/user/profile", {
        withCredentials: true,
      });

      if (
        response.data.profileImage &&
        response.data.profileImage !== "undefined"
      ) {
        const timestamp = new Date().getTime();
        setImage(`${response.data.profileImage}?t=${timestamp}`);
      } else {
        setImage(defaultProfile);
      }

      if (response.data.bio) {
        setBio(response.data.bio);
      }

      if (response.data.username) {
        setEditableUsername(response.data.username);
      }

      // Fetch background color
      const appearanceResponse = await axiosInstance.get("api/appearance", {
        withCredentials: true,
      });

      if (appearanceResponse.data.backgroundColor) {
        setBgColor(appearanceResponse.data.backgroundColor);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      addToast("error", "Error fetching profile data");
    }
  };

  // Function to toggle username editing
  const handleUsernameEditToggle = async () => {
    if (isEditingUsername) {
      // Save updated username along with the current bio
      try {
        await axiosInstance.put(
          "api/user/profile",
          { username: editableUsername, bio },
          { withCredentials: true }
        );
        addToast("success", "Profile updated successfully");
      } catch (err) {
        console.error("Error updating username:", err);
        addToast("error", "Failed to update profile");
      }
    }
    setIsEditingUsername(!isEditingUsername);
  };

  // Fetch links from backend
  const fetchLinks = async () => {
    console.log("Fetching links from API...");
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get("api/links");

      console.log("Full API Response:", response);

      if (response.data && Array.isArray(response.data)) {
        console.table(response.data);
        setLinks(response.data);
      } else {
        console.warn("API did not return an array!");
        setLinks([]);
      }
    } catch (err) {
      console.error("Failed to fetch links:", err);
      setError("Failed to load links.");
      addToast("error", "Failed to load links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Upload Profile Image
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axiosInstance.post(
        "api/user/upload-profile-image",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.profileImage) {
        const timestamp = new Date().getTime();
        setImage(`${response.data.profileImage}?t=${timestamp}`);
        setTimeout(fetchProfileData, 500); // Delay refetching for instant UI update
      }
      addToast("success", "Profile image updated");
    } catch (error) {
      console.error("Error uploading profile image:", error);
      addToast("error", "Error uploading profile image");
    }
  };

  // Remove Profile Image
  const handleImageRemove = async () => {
    try {
      await axiosInstance.delete("api/user/remove-profile", {
        withCredentials: true,
      });

      setImage(defaultProfile);
      fetchProfileData();
      addToast("success", "Profile image removed");
    } catch (error) {
      console.error("Error removing profile image:", error);
      addToast("error", "Error removing profile image");
    }
  };

  const handleAdd = () => {
    const newLink = {
      _id: `temp-${Date.now()}`,
      title: "",
      url: "",
      type: selectedType,
      active: true,
      clicks: 0,
      editing: true,
    };

    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  const handleDelete = async (id) => {
    console.log("Attempting to delete link with ID:", id);
    try {
      await axiosInstance.delete(`api/links/${id}`);
      setLinks((prevLinks) => prevLinks.filter((link) => link._id !== id));
      console.log("Deleted link successfully.");
      addToast("success", "Link deleted successfully");
    } catch (err) {
      console.error("Error deleting link:", err);
      addToast("error", "Error deleting link");
    }
  };

  const handleToggle = (id) => {
    console.log("Toggling link visibility for ID:", id);
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link._id === id ? { ...link, active: !link.active } : link
      )
    );
  };

  const handleColorChange = (color) => {
    setBgColor(color);
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put(
        "api/user/profile",
        { username: editableUsername, bio },
        { withCredentials: true }
      );
      addToast("success", "Profile updated successfully!");
      console.log("Profile updated successfully!");
      setIsEditingUsername(false);
      await axiosInstance.put(
        "api/appearance",
        { backgroundColor: bgColor },
        { withCredentials: true }
      );
      addToast("success", "Background color saved successfully!");
      console.log("Background color saved successfully!");
    } catch (error) {
      console.error("Error saving background color:", error);
      addToast("error", "Error saving background color");
    }
  };

  // Toggle Edit Mode
  const toggleEditMode = (id) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link._id === id ? { ...link, editing: !link.editing } : link
      )
    );
  };

  // Handle Input Change
  const handleEditChange = (id, field, value) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link._id === id ? { ...link, [field]: value } : link
      )
    );
  };

  // Save Edited Link
  const saveEdit = async (id) => {
    const editedLink = links.find((link) => link._id === id);
    if (!editedLink) return;

    try {
      if (id.startsWith("temp-")) {
        // Create new link in backend
        const response = await axiosInstance.post(
          "api/links",
          {
            title: editedLink.title,
            url: editedLink.url,
            type: editedLink.type,
          },
          { withCredentials: true }
        );

        // Replace temp link with actual DB link
        setLinks((prevLinks) =>
          prevLinks.map((link) =>
            link._id === id ? { ...response.data.link, editing: false } : link
          )
        );

        if (response.data.link.type === "shop") {
          addToast("success", "Successfully added shop link");
        } else {
          addToast("success", "Successfully added link");
        }
      } else {
        // Update existing link in backend
        await axiosInstance.put(
          `api/links/${id}`,
          { title: editedLink.title, url: editedLink.url },
          { withCredentials: true }
        );

        // Exit edit mode
        setLinks((prevLinks) =>
          prevLinks.map((link) =>
            link._id === id ? { ...link, editing: false } : link
          )
        );
        addToast("success", "Successfully saved");
      }
    } catch (error) {
      console.error("Error updating link:", error);
      addToast("error", "Error updating link");
    }
  };
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedLinks = Array.from(links);
    const [movedLink] = updatedLinks.splice(result.source.index, 1);
    updatedLinks.splice(result.destination.index, 0, movedLink);
    setLinks(updatedLinks);
  };

  const isEditingLink = links.some(
    (link) => link.type === "link" && link.editing
  );

  return (
    <div className="links-container">
      <div className="greeting">
        <h2 className="analytics-title">
          Hi, {user?.firstName} {user?.lastName}!
        </h2>
        <p className="analytics-subtitle">
          Congratulations! You got a great response today.
        </p>
      </div>
      <div className="left-section">
        <ProfilePreview customization={customization} />
      </div>
      <div className="right-section">
        <div className="profile-section">
          <label htmlFor="profile-image-upload" className="profile-avatar">
            <img src={image ? image : defaultProfile} alt="Profile" />
          </label>
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          <button
            className="upload-btn full-width"
            onClick={() =>
              document.getElementById("profile-image-upload").click()
            }
          >
            Pick an image
          </button>
          <button
            className="remove-btn full-width"
            onClick={handleImageRemove}
            disabled={image === defaultProfile}
          >
            Remove
          </button>

          <div className="profile-title-container">
            <span className="profile-label">Profile Title</span>
            {isEditingUsername ? (
              <input
                type="text"
                value={editableUsername}
                onChange={(e) => setEditableUsername(e.target.value)}
                className="username-input"
              />
            ) : (
              <div
                className="profile-title"
                onClick={() => {
                  setIsEditingUsername(true);
                }}
              >
                @{editableUsername || "username"}
              </div>
            )}
          </div>

          <div className="bio-container">
            <span className="profile-label">Bio</span>
            <textarea
              className="bio-input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={80}
              placeholder="Bio"
            />
            <span className="char-counter">{bio.length} / 80</span>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="linksList">
            {(provided) => (
              <div
                className="links-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="top-controls">
                  <input
                    type="checkbox"
                    id="links-toggle"
                    className="toggleCheckbox"
                    checked={selectedType === "shop"}
                    onChange={(e) =>
                      setSelectedType(e.target.checked ? "shop" : "link")
                    }
                  />
                  <label htmlFor="links-toggle" className="toggleContainer">
                    <div>
                      Add Link
                      <img
                        src={
                          selectedType === "link"
                            ? linkSelected
                            : linkUnselected
                        }
                        alt="Link Icon"
                      />
                    </div>
                    <div>
                      Add Shop
                      <img
                        src={
                          selectedType === "shop"
                            ? linkSelected
                            : linkUnselected
                        }
                        alt="Shop Icon"
                      />
                    </div>
                  </label>
                  <button className="add-btn" onClick={handleAdd}>
                    + Add {selectedType === "link" ? "Link" : "Shop"}
                  </button>
                </div>

                {loading ? (
                  <p>Loading links...</p>
                ) : error ? (
                  <p className="error">{error}</p>
                ) : (
                  links
                    .filter((link) => link.type === selectedType)
                    .map((link, index) => (
                      <Draggable
                        key={link._id}
                        draggableId={link._id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <>
                            <div
                              className="link-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <span
                                className="drag-handle"
                                {...provided.dragHandleProps}
                              >
                                ☰
                              </span>

                              <div className="link-content">
                                {/* Title Field - Editable */}
                                {link.editing ? (
                                  <input
                                    type="text"
                                    value={link.title}
                                    className="link-input"
                                    onChange={(e) =>
                                      handleEditChange(
                                        link._id,
                                        "title",
                                        e.target.value
                                      )
                                    }
                                    onBlur={() => saveEdit(link._id)}
                                    onKeyDown={(e) =>
                                      e.key === "Enter" && saveEdit(link._id)
                                    }
                                  />
                                ) : (
                                  <div className="link-title">
                                    {link.title}{" "}
                                    <img
                                      src={editIcon}
                                      alt="Edit"
                                      className="edit-icon"
                                      onClick={() => toggleEditMode(link._id)}
                                    />
                                  </div>
                                )}

                                {/* URL Field - Editable */}
                                {link.editing ? (
                                  <input
                                    type="text"
                                    value={link.url}
                                    className="link-input"
                                    onChange={(e) =>
                                      handleEditChange(
                                        link._id,
                                        "url",
                                        e.target.value
                                      )
                                    }
                                    onBlur={() => saveEdit(link._id)}
                                    onKeyDown={(e) =>
                                      e.key === "Enter" && saveEdit(link._id)
                                    }
                                  />
                                ) : (
                                  <div className="link-url">
                                    <a
                                      href={`http://localhost:5000/r/${link._id}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {link.url}{" "}
                                    </a>
                                    <img
                                      src={editIcon}
                                      alt="Edit URL"
                                      className="edit-icon"
                                      onClick={() => toggleEditMode(link._id)}
                                    />
                                  </div>
                                )}

                                <div className="click-stats">
                                  {link.type === "shop" && (
                                    <img
                                      src={pictureIcon}
                                      alt="Shop Icon"
                                      className="type-icon"
                                    />
                                  )}
                                  <img src={signalIcon} alt="Clicks" />{" "}
                                  {link.clicks} clicks
                                </div>
                              </div>

                              <div className="link-actions">
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    checked={link.active}
                                    onChange={() => handleToggle(link._id)}
                                  />
                                  <span className="slider round"></span>
                                </label>
                                <img
                                  src={deleteIcon}
                                  alt="Delete"
                                  className="delete-icon"
                                  onClick={() => handleDelete(link._id)}
                                />
                              </div>
                            </div>
                            {selectedType === "link" && link.editing && (
                              <>
                                {/* Divider line */}
                                <hr className="applications-divider" />
                                <h3 className="applications-heading">
                                  Applications
                                </h3>
                                <div className="applications-row">
                                  <div className="app-icon">
                                    <img src={instagramIcon} alt="Instagram" />
                                    <span>Instagram</span>
                                  </div>
                                  <div className="app-icon">
                                    <img src={facebookIcon} alt="Facebook" />
                                    <span>Facebook</span>
                                  </div>
                                  <div className="app-icon">
                                    <img src={youtubeIcon} alt="YouTube" />
                                    <span>YouTube</span>
                                  </div>
                                  <div className="app-icon">
                                    <img src={xIcon} alt="X" />
                                    <span>X</span>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </Draggable>
                    ))
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="links-page">
          <div className="banner" style={{ backgroundColor: bgColor }}>
            <img src={image} alt="Profile" className="profile-image" />
          </div>

          <div className="color-selection-container">
            <label className="color-label">Custom Background Color</label>
            <div className="color-options">
              <button
                className="color-btn brown"
                onClick={() => handleColorChange("#5A3E2B")}
              ></button>
              <button
                className="color-btn white"
                onClick={() => handleColorChange("#FFFFFF")}
              ></button>
              <button
                className="color-btn black"
                onClick={() => handleColorChange("#000000")}
              ></button>

              <div className="color-picker-container">
                <input
                  type="color"
                  id="color-picker"
                  className="color-picker"
                  onChange={(e) => handleColorChange(e.target.value)}
                  value={bgColor}
                />
                <label
                  htmlFor="color-picker"
                  className="color-preview"
                  style={{ backgroundColor: bgColor }}
                ></label>
                <span className="color-code">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>
        <button className="save-btn-links" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Links;
