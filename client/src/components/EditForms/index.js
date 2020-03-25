import React from 'react';
import { useForm } from 'react-hook-form';
import "./style.css";

export function TitleForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        props.updateField(data);
    };
    return (
        <form key={props.key} onSubmit={handleSubmit(onSubmit)}>
            <input
                className="titleEdit"
                defaultValue={props.value}
                name="title"
                onChange={props.handleInputChange}
                ref={register({
                    required: true,
                    pattern: /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
                    minLength: 2,
                    maxLength: 100
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
    return (
        <form key={props.key} onSubmit={handleSubmit(onSubmit)}>
            <textarea
                className="summEdit"
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

export function NoteForm(props) {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        props.updateField(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <title className="noteHead">Custom Notes</title>
            <textarea
                name="notes"
                className="noteEdit"
                placeholder={props.ph}
                defaultValue={props.value}
                onChange={props.handleInputChange}
                ref={register({
                    required: true,
                    minLength: 1
                })}
            />


            <button type="submit">Submit</button>
        </form>
    )
}

