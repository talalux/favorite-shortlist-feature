import styles from "@styles/button.module.scss"

const Button = (
    {
        title,
        onClick=function(){},
        theme
    }
) => {
    let _style = "";
    switch (theme) {
        case "red":
            _style = styles.red;
            break;
    }
    return (
        <div className={`${styles.main} ${_style}`} onClick={() => {onClick()}}>
            <span className={styles.title}>{title}</span>
        </div>
    )
}

export default Button;