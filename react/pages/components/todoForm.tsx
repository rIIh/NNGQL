import {Button, FormControl, InputGroup} from 'react-bootstrap';
import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

interface TodoFormProps {
    onChange: () => void;
}

const CREATE_TODO = gql`
    mutation createTodo($title: String!) {
        createTodo(todo: {
            title: $title
        }) {
            id
        }
    }
`;

export const TodoForm = ({onChange}: TodoFormProps) => {
    const [create] = useMutation(CREATE_TODO);
    const [state, setState] = useState({
        title: 'Hello World',
    });

    return (
        <InputGroup className={'w-3 mb-4'}>
            <FormControl type='text'
                         value={state.title}
                         onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => {
                             setState({
                                 title: x.currentTarget.value,
                             });
                         }}
            />
            <InputGroup.Append>
                <Button variant='primary'
                        onClick={() => create({
                            variables: {
                                title: state.title,
                            },
                        }).then(onChange)}>Create</Button>
            </InputGroup.Append>
        </InputGroup>
    );
};
