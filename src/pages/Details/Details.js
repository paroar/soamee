import React from 'react'
import PhoneDetails from '../../components/PhoneDetails/PhoneDetails'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const Details = () => {
    return (
        <div className="details">
            <div className="details__back">
                <Link to="/">
                    <AiOutlineArrowLeft size={30} />
                </Link>
            </div>
            <PhoneDetails />
        </div>
    )
}

export default Details
