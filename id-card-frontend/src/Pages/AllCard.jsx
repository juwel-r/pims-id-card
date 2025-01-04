import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../customHooks/useAxios';

const AllCard = () => {
    const instance = useAxios()
    const [allCard, setAllCard]=useState([])
    useEffect(()=>{
        instance.get("/id-card").then(res=>console.log(res.data))
    },[])
    return (
        <div>
            All card
        </div>
    );
};

export default AllCard;