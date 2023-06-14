'use client'

import axios from "axios";
import { useEffect, useState } from "react";

function TestAPI(){
    const [data, setData] = useState("Wait");
    const getData = () => {
        axios.get('/api/genres/artists')
            .then((response) => {
                setData(JSON.stringify(response.data))
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <button
                className="min-h-[200px] min-w-[300px]"
            onClick={getData}>Click Me</button>
            <p>
                {data}
            </p>
        </div>
        
    )
};

export default TestAPI;
