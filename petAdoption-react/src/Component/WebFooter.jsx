import React from "react";
import style from '../styles/WebFooter.module.css';


const WebFooter = ()=>{

    return(

        <>
            <footer>


            <div className={style.footer} style={{textAlign: "center", fontSize: "1.25rem"}}>

                <div className={style.footeInlineContainer}>
                    <div className={style.footerMain}>@Copyright 2025 PetHomeAdoption All Rights Reserved.</div>
                </div>

            </div>

            </footer>
        </>

    )
    

}

export default WebFooter