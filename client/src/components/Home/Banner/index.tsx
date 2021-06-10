import React, { useRef, useState, useEffect } from 'react'
import { clearInterval } from 'timers';
import { ImgSlide } from "./styles"
export default function Banner() {

    const [isActive, SetIsActive] = useState<boolean[]>([]);
    const [count, SetCount] = useState(0);

    useEffect(() => {
        SetIsActive([false, false, false]);
    }, [])

    useEffect(() => {
        const fadeRoof = setTimeout(() => {
            setFadeImg();
        }, 3000);

        return () => {
            clearTimeout(fadeRoof);
        }
    }, [isActive, count])

    const setFadeImg = () => {
        // console.log(isActive);
        // console.log(count);
        SetIsActive((value) => {
            value[count] = false;
            if (count < value.length - 1) {
                value[count + 1] = true;
            } else {
                value[0] = true;
            }
            return [...value]
        })
        SetCount(value => {
            if (value < isActive.length - 1) {
                return value + 1;
            } else {
                return 0;
            }
        });
    }


    return (
        <div>
            <ImgSlide>
                <img className={"active"} src="img/ch1.jpg" alt="#" />
                <img className={isActive[1] ? "active" : ""} src="img/ch2.jpg" alt="#" />
                <img className={isActive[2] ? "active" : ""} src="img/ch3.jpg" alt="#" />
            </ImgSlide>
            <div style={{ height: "calc(100vh - 100px)" }}></div>
        </div>
    )
}
