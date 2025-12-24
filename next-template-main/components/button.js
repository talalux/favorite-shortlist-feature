import styles from "@styles/button.module.scss"

const Button = (
    {
        title,
        onClick=function(){}
    }
) => {
    return (
        <div className={styles.main} onClick={() => {onClick()}}>
            <span className={styles.title}>{title}</span>
        </div>
    )
}

export default Button;