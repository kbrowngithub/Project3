import React from 'react';
import { FormBtn } from "../Form";
import { useForm } from 'react-hook-form'
import './styles.css';


export default function RecipeForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        props.handleFormSubmit(data);
    };

    return (
        <div className="background">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <input
                    className="form-control"
                    value={props.title}
                    onChange={props.handleInputChange}
                    name="title"
                    ref={register({
                        required: true,
                        pattern: /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
                        minLength: 2,
                        maxLength: 60
                    })}
                    placeholder="Title (Required)"
                />
                {errors.title && errors.title.type === "required" && "Please enter a title"}
                {errors.title && errors.title.type === "pattern" && "Please enter only letters and numbers for the title"}
                {errors.title && errors.title.type === "minLength" && "Title length must be longer"}
                {errors.title && errors.title.type === "maxLength" && "Title length must be shorter"}
            </div>
            <div className="form-group">
                <input
                    className="form-control"
                    value={props.image}
                    onChange={props.handleInputChange}
                    name="image"
                    ref={register({
                        required: false,
                        pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm,
                        minLength: 5,
                        maxLength: 150
                    })}
                    placeholder="Image Link (Optional)"
                />
                {errors.image && errors.image.type === "pattern" && "Please enter an image URL"}
                {errors.image && errors.image.type === "minLength" && "Image URL must be longer"}
                {errors.image && errors.image.type === "maxLength" && "Image URL must be shorter"}
            </div>
            <div className="form-group">
                <input
                    className="form-control"
                    value={props.ingredients}
                    onChange={props.handleInputChange}
                    name="ingredients"
                    placeholder="Ingredients (Required)"
                    ref={register({
                        required: true,
                        pattern: /^[a-zA-Z0-9_.-/,%]+( [a-zA-Z0-9_.-/,%]+)*$/,
                        minLength: 5
                    })}
                />
                {errors.ingredients && errors.ingredients.type === "required" && "Please enter a list of ingredients"}
                {errors.ingredients && errors.ingredients.type === "pattern" && "Please enter proper characters"}
                {errors.ingredients && errors.ingredients.type === "minLength" && "ingredients length must be longer"}
                {errors.ingredients && errors.ingredients.type === "maxLength" && "ingredients length must be shorter"}
            </div>
            <div className="form-group">
            <textarea
                className="form-control"
                rows= "20"
                value={props.instructions}
                onChange={props.handleInputChange}
                name="instructions"
                ref={register({
                    required: false,
                    minLength: 5
                })}
                placeholder="Instructions (Optional)"
            />
            {errors.instructions && errors.instructions.type === "minLength" && "Instructions length must be longer"}
            </div>
            <FormBtn className="standardButton" variant="light">
                Submit Recipe
            </FormBtn>
        </form>
        </div>
    )
}