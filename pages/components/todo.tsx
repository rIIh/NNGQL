import * as React from 'react';
import {Button, FormCheck, FormControl, InputGroup, Row} from 'react-bootstrap';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import classNames from 'classnames';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const DELETE_TODO = gql`
    mutation deleteTodo($id: ID!){
        remove(id: $id)
    }
`;

const SWITCH_STATE = gql`
    mutation switchState($id: ID!) {
        switchTodoState(id: $id)
    }
`;

function resolveTodoClass(todo: Todo) {
    return classNames({
        'completed': todo.completed,
        'm-0': true,
    });
}

interface TodoProps {
    todo: Todo;
    onChange: () => void;
}

export const TodoComponent = ({todo, onChange}: TodoProps) => {
    const [remove] = useMutation(DELETE_TODO);
    const [switchState] = useMutation(SWITCH_STATE);
    return (
        <InputGroup key={todo.id} className='mb-3'>
            <InputGroup.Prepend>
                <InputGroup.Checkbox checked={todo.completed}
                                     onChange={() => switchState({
                                         variables: {
                                             id: todo.id,
                                         },
                                     }).then(onChange)}/>
            </InputGroup.Prepend>
            <FormControl disabled={true} value={todo.title}/>
            <InputGroup.Append>
                <Button variant='outline-danger'
                        onClick={() => remove({
                            variables: {
                                id: todo.id,
                            },
                        }).then(onChange)}>Remove</Button>
            </InputGroup.Append>
            <style jsx>{
                `
                .form-control:disabled {
                  background-color: white !important;
                }`
            }
            </style>
        </InputGroup>
    );
};
