import styles from "../Modal/Modal.module.css";

export default function ConfirmationModal({ setAddModal, tool, fetchPosts }) {
  async function handleSubmit(e) {
    e.preventDefault();
    // await fetch(`http://localhost:3000/tools/${tool.id}`, {
    await fetch(`https://bossa-box-api.herokuapp.com/tools/${tool.id}`, {
      method: "DELETE",
    });
    fetchPosts();
    handleCloseModal();
  }

  function handleCloseModal() {
    setAddModal(false);
  }

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
              <h3 className={styles.confirmationModal}>Are you sure?</h3>
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
            <p>{`Are you sure to remove the tool "${tool.title}" from the list?`}</p>
          </div>

          <footer className={styles.modalFooter}>
            <button className={styles.cancelButton} onClick={handleCloseModal}>
              Cancel
            </button>
            <button className={styles.saveButton} type="submit" value="Submit">
              Confirm
            </button>
          </footer>
        </div>
      </form>
    </div>
  );
}
