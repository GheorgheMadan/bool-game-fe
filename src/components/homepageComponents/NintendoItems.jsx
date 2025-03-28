import axios from "axios"
import { useEffect, useState } from "react"
export default function NintendoItems() {

    const [item, setItem] = useState({})
    const [item1, setItem1] = useState({})
    const [item2, setItem2] = useState({})

    function getNintendoItem() {
        axios.get('http://localhost:3000/api/products/131')
            .then(res => setItem(res.data))
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { getNintendoItem() }, [])

    function getNintendoItem1() {
        axios.get('http://localhost:3000/api/products/132')
            .then(res => setItem1(res.data))
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { getNintendoItem1() }, [])

    function getNintendoItem2() {
        axios.get('http://localhost:3000/api/products/133')
            .then(res => setItem2(res.data))
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { getNintendoItem2() }, [])

    return (
        <div class="container-nintendo-items">
            <div class="box left"><img src={item.image_url} alt="" className="img-nintendo" /></div>
            <div class="box bottom-right"><img src={item1.image_url} alt="" className="img-nintendo" /></div>
            <div class="box bottom-left"><img src={item2.image_url} alt="" className="img-nintendo" /></div>
        </div>
    )
}