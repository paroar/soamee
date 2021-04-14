import React, { useEffect, useState, Suspense, lazy } from 'react'
import { CircularProgress } from '@material-ui/core'
import { AiOutlinePlus } from 'react-icons/ai'
import Form from './../Form/Form'
import { Skeleton } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'

const PhonePreview = lazy(() => import('../PhonePreview/PhonePreview'))

const Catalogue = () => {

    let history = useHistory();

    const [phones, setPhones] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [formIsHidden, setFormIsHidden] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(process.env.REACT_APP_SERVER_URL)
                const json = await res.json()
                setPhones(json)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const handleFormHidden = () => {
        setFormIsHidden(!formIsHidden)
    }

    const handlePost = async (body) => {
        try {
            await fetch(process.env.REACT_APP_SERVER_URL, {
                method: "POST",
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
        <div className={`${isLoading ? "loading" : ""}`}>
            <Form details={null} isHidden={formIsHidden} handleHidden={handleFormHidden} fetchSubmit={handlePost} submit="Create" />
            <div className={`${formIsHidden ? "catalogue" : "hidden"}`}>
                {isLoading ?
                    <CircularProgress className="loader" />
                    :
                    <>
                        <AiOutlinePlus size={30} className="catalogue__add" onClick={handleFormHidden} />
                        {
                            phones.map(d => (
                                <Suspense key={d._id} fallback={(
                                    <>
                                        <div className="skeleton-wrapper">
                                            <Skeleton animation="wave" width={150} height={350} />
                                        </div>
                                    </>
                                )}>
                                    <PhonePreview key={d._id} details={d} />
                                </Suspense>
                            ))
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Catalogue
