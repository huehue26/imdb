import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
function DropDown() {
    const [drop, setDrop] = useState(false)
    return (
        <div className="flex flex-col position-fixed">
            <div onClick={() => setDrop(!drop)} className="flex justify-center items-center hover:text-yellow-500">
                <FaUserAlt size={23} className="pr-2" />
                User
            </div>
            {drop ?
                <div className="fixed top-10 w-24 ">
                    <div>WatchList</div>
                    <div>Logout</div>
                </div>
                : ""}
        </div>
    )
}

export default DropDown
