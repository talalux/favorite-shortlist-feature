import Button from "@/components/button";
import RealEstateCard from "@/components/card";
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
                    <Button title={"Select User"}/>
                </div>
                <div className={style.button_wrapper}>
                    <Button title={"Filter With User"}/>
                </div>
                <RealEstateCard
                    image="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                    title="บ้านเดี่ยว 2 ชั้น"
                    location="ลาดพร้าว กรุงเทพฯ"
                    price="฿5,500,000"
                    initialLike={12}
                />
                {/* <Loading/> */}
            </div>
        </div>
    )
}

export default index;