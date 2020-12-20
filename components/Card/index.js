import styles from "./Card.module.css";

export default function Card({ content, setToolSelected, updatePost }) {
  async function handleRemovePost(content) {
    setToolSelected(content);
  }

  async function handleUpdatePost(content) {
    updatePost(content);
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <a target="_blank" href={content.link} rel="noopener noreferrer" prefetch={false}>
          <h3 className={styles.title}>{content.title}</h3>
        </a>

        <div className={styles.cardButtons}>
          <button
            value={content.title}
            className={styles.updateButton}
            onClick={() => handleUpdatePost(content)}
            aria-label="Update Buttom"
          >
            <svg
              height="25px"
              viewBox="-15 -15 484.00019 484"
              width="25px"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                fill: "none",
                stroke: "#FFFFFF",
                strokeMiterlimit: 10,
                strokeWidth: "18px",
                width: "20px",
                height: "20px",
                backgroundColor: "transparent",
              }}
            >
              <path d="m401.648438 18.234375c-24.394532-24.351563-63.898438-24.351563-88.292969 0l-22.101563 22.222656-235.269531 235.144531-.5.503907c-.121094.121093-.121094.25-.25.25-.25.375-.625.746093-.871094 1.121093 0 .125-.128906.125-.128906.25-.25.375-.371094.625-.625 1-.121094.125-.121094.246094-.246094.375-.125.375-.25.625-.378906 1 0 .121094-.121094.121094-.121094.25l-52.199219 156.96875c-1.53125 4.46875-.367187 9.417969 2.996094 12.734376 2.363282 2.332031 5.550782 3.636718 8.867188 3.625 1.355468-.023438 2.699218-.234376 3.996094-.625l156.847656-52.324219c.121094 0 .121094 0 .25-.121094.394531-.117187.773437-.285156 1.121094-.503906.097656-.011719.183593-.054688.253906-.121094.371094-.25.871094-.503906 1.246094-.753906.371093-.246094.75-.621094 1.125-.871094.125-.128906.246093-.128906.246093-.25.128907-.125.378907-.246094.503907-.5l257.371093-257.371094c24.351563-24.394531 24.351563-63.898437 0-88.289062zm-232.273438 353.148437-86.914062-86.910156 217.535156-217.535156 86.914062 86.910156zm-99.15625-63.808593 75.929688 75.925781-114.015626 37.960938zm347.664062-184.820313-13.238281 13.363282-86.917969-86.917969 13.367188-13.359375c14.621094-14.609375 38.320312-14.609375 52.945312 0l33.964844 33.964844c14.511719 14.6875 14.457032 38.332031-.121094 52.949218zm0 0" />
            </svg>
            <p className={styles.updateText}>Update</p>
          </button>
          <button
            value={content.title}
            className={styles.removeButton}
            onClick={() => handleRemovePost(content)}
            aria-label="Remove Buttom"
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
                backgroundColor: "transparent",
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
    </div>
  );
}
