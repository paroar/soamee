import React from 'react'
import { useForm } from "react-hook-form";
import { AiOutlineClose } from 'react-icons/ai'


const Form = ({ submit, isHidden, handleHidden, details, fetchSubmit }) => {

    const { title, company, price, info, img } = details || ""

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            "title": title,
            "company": company,
            "price": price,
            "info": info,
            "img": img
        }
    });
    const onSubmit = data => {
        fetchSubmit(data);
    }

    return (
        <div className={`form-wrapper ${isHidden ? "hidden" : ""}`}>
            <AiOutlineClose size={30} className="form__close" onClick={() => handleHidden()}/>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="form__basic-info">
                    <div>
                        <label htmlFor="title">Title</label><br />
                        <input id="title" defaultValue={title} {...register("title", { required: true })} />
                    </div>

                    <div>
                        <label htmlFor="company">Company</label><br />
                        <input id="company" defaultValue={company} {...register("company", { required: true })} />
                    </div>

                    <div>
                        <label htmlFor="price">Price</label><br />
                        <input id="price" defaultValue={price} {...register("price", { required: true })} />
                    </div>
                </div>

                <div className="form__misc-info">
                    <div>
                        <label htmlFor="info">Description</label><br />
                        <textarea id="info" defaultValue={info} {...register("info", { required: true })} />
                    </div>

                    <div>
                        <label htmlFor="img">Image URL</label><br />
                        <input id="img" defaultValue={img} {...register("img", { required: true })} />
                    </div>
                </div>

                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" value={submit} className="submit" />
            </form>
        </div >
    );
}

export default Form
