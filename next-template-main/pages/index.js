import Button from "@/components/button";
import Dropdown from "@/components/dropdown";
import Loading from "@/components/loading";
import style from "@styles/home-page.module.scss"

const index = () => {
    const list = [
        { title: "JavaScript", value: "js" },
        { title: "TypeScript", value: "ts" },
        { title: "Python", value: "py" },
    ];
    return (
        <div className={style.main}>
            <div className={style.inner}>
                <Dropdown
                    label="เลือก User"
                    options={list}
                    onSelect={(item) => console.log(item)}
                />
                <div className={style.button_wrapper}>
                    <Button title={"Filter With User"}/>
                </div>
                {/* <Loading/> */}
            </div>
        </div>
    )
}

export default index;