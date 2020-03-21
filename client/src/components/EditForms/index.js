import React from 'react';
import { useForm } from 'react-hook-form';

export function TitleForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        props.updateField(data);
    };
    return(
        <form key={props.key} onSubmit={handleSubmit(onSubmit)}>
            <input
                defaultValue={props.value}
                name="title"
                onChange={props.handleInputChange}
                ref={register({
                    required: true,
                    pattern: /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
                    minLength: 2,
                    maxLength: 60
                })}  
                
            />
            {errors.title && errors.title.type === "required" && "Please enter a title"}
            {errors.title && errors.title.type === "pattern" && "Please enter only letters and numbers for the title"}
            {errors.title && errors.title.type === "minLength" && "Title length must be longer"}
            {errors.title && errors.title.type === "maxLength" && "Title length must be shorter"}
            <button type="submit">Submit</button>
        </form>
    )
}

export function SummForm(props) {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        props.updateField(data);
    };
    return(
        <form key={props.key} onSubmit={handleSubmit(onSubmit)}>
            <textarea
                defaultValue={props.value}
                name="summary"
                onChange={props.handleInputChange}
                ref={register({
                    required: false,
                    minLength: 1
                })}  
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export function IngredientForm(props) {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        props.updateField(data);
    };
    const ingredients = props.value;
    console.log(ingredients)
    return(
        <form key={props.key} onSubmit={handleSubmit(onSubmit)}>
            {ingredients.map(ingredient => (
                <input
                name="ingredient"
                defaultValue={ingredient.amount + " " + ingredient.unit + " " + ingredient.name}
                onChange={props.handleInputChange}
                ref={register({
                    required: true,
                    minLength: 1
                })}  
            />

            ))}
            
            <button type="submit">Submit</button>
        </form>
    )
}

