import styles from "@styles/home-banner.module.scss"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination} from 'swiper/modules';

const HomeBanner = () =>{
    var arr = [
        {
            bg: "#fff",
            title: "What is Lorem Ipsum?",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            bg: "#333",
            title: "Why do we use it?",
            desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        },
        {
            bg: "#000",
            title: "Where does it come from?",
            desc: "Contrary to popular belief, Lorem Ipsum is not simply random text."
        },
    ]
    return (
        <div className={styles.main_home_banner}>
            <Swiper className="mySwiper"
                navigation={{
                    prevEl: '.prev',
                    nextEl: '.next',
                  }}
                pagination={true}
                modules={[Navigation, Pagination]}
            >
                {
                    arr.map((data,index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={styles.banner_card} style={{"--bgCard" : data.bg}}>
                                    <span className={styles.title}>{data.title}</span>
                                    <span className={styles.desc}>{data.desc}</span>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
                <div className="prev">
                    <span>prev</span>
                </div>
                <div className="next">
                    <span>next</span>
                </div>
            </Swiper>
        </div>
    )
}
export default HomeBanner;