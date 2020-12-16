import styles from "./Card.module.css";

import Image from "next/image";

export default function Card({ content, setToolSelected, updatePost }) {
  async function handleRemovePost(content) {
    setToolSelected(content);
  }

  async function handleUpdatePost(content) {
    updatePost(content);
  }

  return (
    <fieldset className={styles.card}>
      <div className={styles.cardHeader}>
        <a target="_blank" href={content.link}>
          <h3>{content.title}</h3>
        </a>

        <div className={styles.cardButtons}>
          <button
            value={content.title}
            className={styles.updateButton}
            onClick={() => handleUpdatePost(content)}
          >
            <Image src="/edit.png" alt="edit" width={20} height={20} />
            <p className={styles.updateText}>Update</p>
          </button>
          <button
            value={content.title}
            className={styles.removeButton}
            onClick={() => handleRemovePost(content)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="61.414"
              height="61.42"
              viewBox="0 0 61.414 61.42"
              style={{
                fill: "none",
                stroke: "#FFFFFF",
                strokeMiterlimit: 10,
                strokeWidth: "10px",
                width: "15px",
                height: "15px",
              }}
            >
              <defs></defs>
              <g transform="translate(-568.793 -714.793)">
                <path
                  d="M80,20.005l-60,60m60,0L20,20"
                  transform="translate(549.501 695.5)"
                />
              </g>
            </svg>
            <p className={styles.removeText}>Remove</p>
          </button>
        </div>
      </div>
      <p className={styles.cardContent}>{content.description}</p>
      <ul className={styles.tags}>
        {content.tags.map((tag) => {
          return <li>#{tag}</li>;
        })}
      </ul>
    </fieldset>
  );
}
