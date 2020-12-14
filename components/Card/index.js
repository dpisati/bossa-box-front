import styles from './Card.module.css'

export default function Card({ content, onDelete, setToolSelected }) {
          
  async function handleRemovePost(e, content) {
        setToolSelected(content)
        // const remove = await fetch(`http://localhost:3000/tools/${e.target.value}`, {
        //     method: 'DELETE',
        // });
        // onDelete();
    }

    return(
        <fieldset className={styles.card}>
            <div className={styles.cardHeader}>
                <a  target="_blank" href={content.link}>
                    <h3>{content.title}</h3>
                </a>
                <button value={content.title} className={styles.removeButton} onClick={(e) => handleRemovePost(e, content)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="61.414" height="61.42" viewBox="0 0 61.414 61.42" style={{fill:"none", stroke: "#FFFFFF", strokeMiterlimit: 10, strokeWidth: "10px", width: "15px", height: "15px"}}><defs></defs><g transform="translate(-568.793 -714.793)"><path class="a" d="M80,20.005l-60,60m60,0L20,20" transform="translate(549.501 695.5)"/></g></svg>
                    Remove
                </button>
            </div>
            <p className={styles.cardContent}>{content.description}</p>
            <ul className={styles.tags}>

                {content.tags.map(tag => {
                    return <li>#{tag}</li>
                })}       
            </ul>
        </fieldset>
    )
}