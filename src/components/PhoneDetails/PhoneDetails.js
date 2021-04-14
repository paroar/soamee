import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { CircularProgress } from '@material-ui/core'
import { withRouter } from "react-router";
import Form from './../Form/Form';

const PhoneDetails = () => {

    let { id } = useParams();
    let history = useHistory();

    const [phoneDetails, setPhoneDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [formIsHidden, setFormIsHidden] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/${id}`)
                const json = await res.json()
                setPhoneDetails(json)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id])

    const handleDelete = async () => {
        const con = window.confirm("Are you sure to delete this item?")
        if (con) {
            try {
                await fetch(`${process.env.REACT_APP_SERVER_URL}/${id}`, {
                    method: "DELETE"
                })
                history.push("/")
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleFormHidden = () => {
        setFormIsHidden(!formIsHidden)
    }

    const handlePatch = async (body) => {
        try {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/${id}`, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            history.go(0)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`${isLoading ? "loading" : "details-wrapper"}`}>
            {isLoading ?
                <CircularProgress className="loader" />
                :
                (
                    <>
                        <Form details={phoneDetails} isHidden={formIsHidden} handleHidden={handleFormHidden} submit="Edit" fetchSubmit={handlePatch} />
                        <div className={formIsHidden ? "phone-details-info" : "hidden"}>
                            <div className="phone-details-info__img">
                                <img src={phoneDetails.img} alt="phone-img"/>
                            </div>
                            <div className="phone-details-desc">
                                <h3>Model</h3>
                                <p className="phone-details-desc-text">{phoneDetails.title}</p>
                                <h3>Company</h3>
                                <p className="phone-details-desc-text">{phoneDetails.company}</p>
                                <h3>Price</h3>
                                <p className="phone-details-desc-text">{phoneDetails.price}€</p>
                                <h3>Description</h3>
                                <p className="phone-details-desc-text">{phoneDetails.info}</p>
                            </div>
                            <div className="phone-details-info__actions">
                                <AiFillEdit size={30} onClick={handleFormHidden} />
                                <AiFillDelete size={30} onClick={handleDelete} />
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default withRouter(PhoneDetails)
