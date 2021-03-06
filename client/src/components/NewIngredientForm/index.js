import React from 'react';
import { useForm } from 'react-hook-form'


export function IngredientForm(props) {
    const { register, handleSubmit, errors } = useForm({mode: 'onChange'});
    const onSubmit = (data, e) => {
        e.target.reset();
        props.sendIngredient(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                defaultValue=""
                name="newIngredient"
                type="text"
                placeholder="Add Ingredient(Required)"
                ref={register({
                    required: true,
                    pattern: /^[a-zA-Z0-9_.-/,%]+( [a-zA-Z0-9_.-/,%]+)*$/,
                    minLength: 2,
                    maxLength: 30
                })} />

            {errors.newIngredient && errors.newIngredient.type === "required" && "Please enter an ingredient name"}
            {errors.newIngredient && errors.newIngredient.type === "pattern" && "Please enter proper characters for the ingredient name"}
            {errors.newIngredient && errors.newIngredient.type === "minLength" && "Ingredient name must be longer"}
            {errors.newIngredient && errors.newIngredient.type === "maxLength" && "Ingredient name must be shorter"}
            <input
                defaultValue=""
                name="newQuantity"
                type="text"
                placeholder="Add Quantity(Required)"
                ref={register({
                    required: true,
                    pattern: /^[0-9]+$/,
                    min: 1,
                    max: 100
                })} />
            {errors.newQuantity && errors.newQuantity.type === "required" && "Please enter a quantity"}
            {errors.newQuantity && errors.newQuantity.type === "pattern" && "Please enter only numbers for quantity"}
            {errors.newQuantity && errors.newQuantity.type === "min" && "Quantity must be greater than 0"}
            {errors.newQuantity && errors.newQuantity.type === "max" && "Quantity must less than 100"}
            <input
                defaultValue=""
                name="newUnit"
                type="text"
                placeholder="Add Unit"
                ref={register({
                    required: false,
                    maxLength: 10
                })} />
            {errors.newUnit && errors.newUnit.type === "maxLength" && "Unit name must shorter"}
            <button className="standardButton" type="submit">Submit Ingredient</button>
        </form>
    )
}

export function DrinkForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data, e) => {
        e.target.reset();
        props.sendDrink(data);
    };
    return (
        <div className="fontNorm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    defaultValue=""
                    name="newDrink"
                    type="text"
                    placeholder="Add Liquor(Required)"
                    ref={register({
                        required: true,
                        pattern: /^[a-zA-Z0-9]*$/,
                        minLength: 1,
                        maxLength: 30
                    })} />

                {errors.newDrink && errors.newDrink.type === "required" && "Please enter an drink name"}
                {errors.newDrink && errors.newDrink.type === "pattern" && "Please enter only letters and numbers"}
                {errors.newDrink && errors.newDrink.type === "minLength" && "Drink name must be longer"}
                {errors.newDrink && errors.newDrink.type === "maxLength" && "Drink name must be shorter"}

                <button className="standardButton" type="submit">Submit Liquor</button>
            </form>
        </div>
    )
}