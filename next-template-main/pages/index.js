import Button from "@/components/button";
import RealEstateCard from "@/components/card";
import Dropdown from "@/components/dropdown";
import Loading from "@/components/loading";
import NoData from "@/components/no-data";
import { get } from "@/public/utils/api";
import style from "@styles/home-page.module.scss"
import { useEffect, useState } from "react";

const index = () => {
    const list = [
        { title: "JavaScript", value: "js" },
        { title: "TypeScript", value: "ts" },
        { title: "Python", value: "py" },
    ];
    const [filter, setFilter] = useState(
        {
            title: "",
            location: "",
            price: "",
            limit: "",
        }
    );
    const [userList, setUserList] = useState([]);
    const [listCard, setListCard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectUser, setSelectUser] = useState({});
    const [defaultDropdown, setDefaultDropdown] = useState("");
    const getListRealEstate = async (param) => {
        let findUserId = localStorage.getItem("user_id");
        console.log(findUserId);
        console.log('findUserId');
        
        const res = await get(
            process.env.BASE_URL + "real_estate/list",
            {
                params : {
                    title: param.title,
                    location: param.location,
                    price: param.price,
                    limit: param.limit,
                    user_id: findUserId
                }
            }
        );
        if(res.status == "Success"){
            setListCard(res.data)
        }else{
            setListCard([])
        }
        if(res){
            setTimeout(() => {
                setLoading(false)
            }, 300);
        }
    }
    const getUserList = async (param) => {
        const res = await get(
            process.env.BASE_URL + "user/list",
            {
                username: param?.title,
                nickname: param?.location,
            }
        );
        if(res.status == "Success"){
            let fetchUser = res.data.map(items => {
                return {
                    title: items.nickname,
                    value: items.user_id
                }
            });
            setUserList(fetchUser)
        }
    }
    const setUser = (info) => {
        // localStorage.setItem("user_id", info.value);
    }
    const submitUser = () => {
        localStorage.setItem("user_id", selectUser.value);
        setLoading(true);
        getListRealEstate(filter)
    }
    useEffect(() => {
        let findUserId = localStorage.getItem("user_id");
        console.log(findUserId,'=-=-=-');
        
        setDefaultDropdown(findUserId)
        getListRealEstate(filter)
        getUserList()
    },[]);
    return (
        <div className={style.main}>
            <div className={style.inner}>
                <Dropdown
                    label="เลือก User"
                    options={userList}
                    onSelect={(item) => {
                        // setUser(item);
                        setSelectUser(item)
                    }}
                    value={defaultDropdown}
                />
                <div className={style.button_wrapper}>
                    <Button title={"Select User"} onClick={() => {submitUser()}}/>
                </div>
                <div className={style.button_wrapper}>
                    <Button title={"Filter With User"}/>
                </div>
                {/* <Loading/> */}
            </div>
            <div className={style.card_wrapper}>
                {
                    loading &&
                    <div className={style.loading}>
                        <Loading/>
                    </div>
                }
                {
                    !loading &&
                    listCard &&
                    listCard.length > 0 &&
                    listCard.map((items,index) => {
                        return (
                            <RealEstateCard
                                key={index}
                                image={items.image}
                                title={items.title}
                                location={items.location}
                                price={items.price}
                                initialLike={items.count_like}
                                uniq_id={items?.uniq_id}
                            />
                        )
                    })
                }
                {
                    !loading &&
                    (listCard.length <= 0 || !listCard) &&
                    <NoData/>
                }
            </div>
        </div>
    )
}

export default index;