import React from 'react'
import { Link } from 'react-router-dom'

const PhonePreview = ({ details }) => {

    const { _id, title, company, img } = details

    return (
        <div className="phone-preview">
            <Link to={`/${_id}`}>
                <img alt="phone-img" src={img} />
                <div className="phone-preview__info">
                    <p>{title}</p>
                    <p>{company}</p>
                </div>
            </Link>
        </div>
    )
}

export default PhonePreview
