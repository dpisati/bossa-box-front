import { useEffect, useRef, useState } from "react";

import styles from "./Modal.module.css";

export default function Modal({ setAddModal, fetchPosts, tool }) {
  const tagInput = useRef(null);

  let initialErrors = {};

  const [errors, setErrors] = useState(initialErrors);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  async function validateForm() {
    let initialErrors = {};

    if (title.length === 0) {
      initialErrors.title = "Title is required";
    }
    if (link.length === 0) {
      initialErrors.link = "Link is required";
    }
    if (description.length === 0) {
      initialErrors.description = "Description is required";
    }
    if (tags.length === 0) {
      initialErrors.tags = "A Tag is required";
    }
    setErrors(initialErrors);

    if (
      Object.keys(tool).length > 0 &&
      Object.keys(initialErrors).length === 0
    ) {
      await fetch(`https://bossa-box-api.herokuapp.com/tools/${tool.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          link,
          description,
          tags,
        }),
      });
      fetchPosts();
      handleCloseModal();
    }

    if (
      Object.keys(tool).length === 0 &&
      Object.keys(initialErrors).length === 0
    ) {
      // await fetch("http://localhost:3000/tools", {
      await fetch("https://bossa-box-api.herokuapp.com/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          link,
          description,
          tags,
        }),
      });
      fetchPosts();
      handleCloseModal();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await validateForm();
  }

  function handleCloseModal() {
    setAddModal(false);
    setTitle("");
    setDescription("");
    setLink("");
    setTag("");
    setTags([]);
  }

  function handleAddTag() {
    const trimTag = tag.trim();
    if (trimTag) {
      handleFocus();
      setTags([...tags, trimTag]);
      setTag("");
    }
    return handleFocus();
  }

  function handleRemoveTag(e) {
    const result = tags.filter((word) => word != e);
    setTags(result);
  }

  function handleFocus() {
    tagInput.current.focus();
  }

  useEffect(() => {
    if (Object.keys(tool).length > 0) {
      setTitle(tool.title);
      setDescription(tool.description);
      setLink(tool.link);
      setTags(tool.tags);
    }
  }, []);

  return (
    <div className={styles.modal}>
      <form
        onSubmit={handleSubmit}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div className={styles.modalBody}>
          <div className={styles.modalHeader}>
            <div className={styles.modalHeaderAdd}>
              {Object.keys(tool).length === 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 61.414 61.42"
                  style={{
                    fill: "none",
                    stroke: "#170C3A",
                    strokeMiterlimit: 10,
                    strokeWidth: "10px",
                    transform: "rotate(45deg)",
                    width: "12px",
                    height: "12px",
                  }}
                >
                  <defs></defs>
                  <g transform="translate(-568.793 -714.793)">
                    <path
                      className="a"
                      d="M80,20.005l-60,60m60,0L20,20"
                      transform="translate(549.501 695.5)"
                    />
                  </g>
                </svg>
              )}

              <h3 className={styles.modalTitle}>
                {Object.keys(tool).length === 0
                  ? "Add a new tool"
                  : "Update tool"}
              </h3>
            </div>
            <svg
              className={styles.closeModal}
              onClick={handleCloseModal}
              xmlns="http://www.w3.org/2000/svg"
              width="13.414"
              height="13.415"
              viewBox="0 0 13.414 13.415"
              style={{
                fill: "none",
                stroke: "#8f8a9b",
                strokeMiterlimit: 10,
                strokeWidth: "2px",
              }}
            >
              <defs></defs>
              <path
                className="a"
                d="M32,20,20,32m12,0L20,20"
                transform="translate(-19.292 -19.293)"
              />
            </svg>
          </div>
          <div className={styles.modalContent}>
            <label className={styles.modalLabel}>
              Tool Title{" "}
              <span className={`${errors.title && styles.span}`}>*</span>
            </label>
            <input
              className={`${styles.modalInput} ${
                errors.title && styles.modalInputError
              }`}
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors({ ...errors, title: "" });
              }}
            />

            {errors.title && (
              <p className={styles.modalErrorMessage}>{errors.title}</p>
            )}

            <label className={styles.modalLabel}>
              Link <span className={`${errors.link && styles.span}`}>*</span>
            </label>
            <input
              className={`${styles.modalInput} ${
                errors.link && styles.modalInputError
              }`}
              type="text"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
                setErrors({ ...errors, link: "" });
              }}
            />

            {errors.link && (
              <p className={styles.modalErrorMessage}>{errors.link}</p>
            )}

            <label className={styles.modalLabel}>
              Description{" "}
              <span className={`${errors.description && styles.span}`}>*</span>
            </label>
            <textarea
              className={`${styles.modalInputTextArea} ${
                errors.description && styles.modalInputTextAreaError
              }`}
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors({ ...errors, description: "" });
              }}
            />

            {errors.description && (
              <p className={styles.modalErrorMessage}>{errors.description}</p>
            )}

            <label className={styles.modalLabel}>
              Tags <span className={`${errors.tags && styles.span}`}>*</span>
            </label>
            <div className={styles.addTags}>
              <input
                ref={tagInput}
                className={`${styles.modalInput} ${
                  errors.tags && styles.modalInputError
                }`}
                type="text"
                value={tag}
                onKeyPress={(e) => {
                  e.key === "Enter" && (e.preventDefault(), handleAddTag());
                }}
                onChange={(e) => {
                  setTag(e.target.value);
                  setErrors({ ...errors, tags: "" });
                }}
              />

              {errors.tags && (
                <p className={styles.modalErrorMessage}>{errors.tags}</p>
              )}

              <div
                onClick={() => handleAddTag()}
                className={styles.addTagField}
              >
                <svg
                  className={styles.addTag}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 61.414 61.42"
                >
                  <g transform="translate(-568.793 -714.793)">
                    <path
                      className="addTag"
                      d="M80,20.005l-60,60m60,0L20,20"
                      transform="translate(549.501 695.5)"
                    />
                  </g>
                </svg>
              </div>

              <p>
                <div className={styles.tagsContainer}>
                  {tags &&
                    tags.map((tag) => {
                      return (
                        <div
                          className={styles.tag}
                          value={tag}
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <p className={styles.tagText}>{tag}</p>
                          <svg
                            className={styles.removeTag}
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 13.414 13.415"
                            style={{
                              fill: "none",
                              stroke: "#8f8a9b",
                              strokeMiterlimit: 10,
                              strokeWidth: "2px",
                            }}
                          >
                            <defs></defs>
                            <path
                              className="a"
                              d="M32,20,20,32m12,0L20,20"
                              transform="translate(-19.292 -19.293)"
                            />
                          </svg>
                        </div>
                      );
                    })}
                </div>
              </p>
            </div>
          </div>

          <footer className={styles.modalFooter}>
            <button className={styles.cancelButton} onClick={handleCloseModal}>
              Cancel
            </button>
            <button className={styles.saveButton} type="submit" value="Submit">
              Save
            </button>
          </footer>
        </div>
      </form>
    </div>
  );
}
