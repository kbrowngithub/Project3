import React from 'react';
import { useForm } from 'react-hook-form'


export function IngredientForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        props.sendIngredient(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                name="newIngredient"
                type="text"
                placeholder="Add Ingredient(Required)"
                value={props.newIngredient}
                onChange={props.addIngredient}
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
                name="newQuantity"
                type="text"
                placeholder="Add Quantity(Required)"
                value={props.newQuantity}
                onChange={props.addIngredient}
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
                name="newUnit"
                type="text"
                placeholder="Add Unit"
                defaultValue={props.newUnit}
                onChange={props.addIngredient}
                ref={register({
                    required: false,
                    maxLength: 5
                })} />
            {errors.newUnit && errors.newUnit.type === "max" && "Unit name must shorter"}
            <button type="submit">Submit Ingredient</button>
        </form>
    )
}

export function DrinkForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        props.sendDrink(data);
    };
    return (
    <form onSubmit={handleSubmit(onSubmit)}>
            <input
                name="newDrink"
                type="text"
                placeholder="Add Liquor(Required)"
                value={props.newDrink}
                onChange={props.addIngredient}
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
    
            <button type="submit">Submit Liquor</button>
        </form>
    )
}