import React from 'react';
import { Input, TextArea, FormBtn } from "../Form";


function RecipeForm(props) {
    return (
        <form>
            <Input
                value={props.title}
                onChange={props.handleInputChange}
                name="title"
                placeholder="Title (Required)"
            />
            <Input
                value={props.image}
                onChange={props.handleInputChange}
                name="image"
                placeholder="Image Link (Optional)"
            />
            <Input
                value={props.ingredients}
                onChange={props.handleInputChange}
                name="ingredients"
                placeholder="Ingredients (Required)"
            />
            <TextArea
                value={props.instructions}
                onChange={props.handleInputChange}
                name="instructions"
                placeholder="Instructions (Optional)"
            />
            <FormBtn
                disabled={!(props.ingredients && props.title)}
                onClick={props.handleFormSubmit}
            >
                Submit Recipe
            </FormBtn>
        </form>
    )
}

export default RecipeForm;