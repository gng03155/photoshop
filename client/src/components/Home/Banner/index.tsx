import React, { useCallback, useState, useEffect } from 'react'
import { ImgSlide, Wrap } from "./styles"
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

    const setFadeImg = useCallback(() => {

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
    }, [count, isActive])


    return (
        <Wrap>
            <ImgSlide>
                <img className={"active"} src="img/1.jpg" alt="#" />
                <img className={isActive[1] ? "active" : ""} src="img/2.jpg" alt="#" />
                <img className={isActive[2] ? "active" : ""} src="img/3.jpg" alt="#" />
            </ImgSlide>
            <div style={{ height: "calc(100vh - 100px)" }}></div>
        </Wrap>
    )
}
