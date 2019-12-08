import * as React from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useState} from 'react';
import {Container, Row, Col, InputGroup, Button, FormControl, FormCheck} from 'react-bootstrap';
import classNames from 'classnames';
import {TodoComponent} from './components/todo';
import {TodoForm} from './components/todoForm';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const TODOS = gql`
    {
        todos {
            id
            title
            completed
        }
    }
`;

const CREATE_TODO = gql`
    mutation createTodo($title: String!) {
        createTodo(todo: {
            title: $title
        }) {
            id
        }
    }
`;

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
        completed: todo.completed,
    });
}

enum SortDescriptor {
    None= 0,
    CompletedAtTop,
    CompletedAtBottom = -1,
}

interface TodoFilter {
    sortDirection: SortDescriptor;
    showCompleted: boolean;
    showUncompleted: boolean;
}

export default function() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState({
        sortDirection: SortDescriptor.CompletedAtBottom,
        showCompleted: true,
        showUncompleted: true,
    });

    const {error, refetch} = useQuery(TODOS, {
        ssr: true,
        fetchPolicy: 'cache-and-network',
        onCompleted: data1 => {
            setTodos(() => data1.todos);
        }});

    if (error) {
        return <p>Failed to fetch todos</p>;
    }
    return (
        <Container fluid={true} className='pt-4'>
            <Row className='justify-content-center'>
                <Col md={6} className='align-items-center'>
                    <h1 className='text-center'>Your Todos</h1>
                    <TodoForm onChange={refetch} />
                    <FormControl value={filter.sortDirection.toString(10)}
                                 className='mb-2'
                                 as='select' onChange={(event: React.FormEvent<FormControl & HTMLInputElement>) => {
                        const inputValue = parseInt(event.currentTarget.value, 10);
                        setFilter((prevState: TodoFilter) => {
                            return {
                                ...prevState,
                                sortDirection: inputValue,
                            };
                        });
                        console.log(SortDescriptor[filter.sortDirection]);

                    }}>
                        <option value={0}>None</option>
                        <option value={1}>Completed at top</option>
                        <option value={-1}>Completed at bottom</option>
                    </FormControl>
                    {
                        todos.concat().sort((a: Todo, b: Todo) => {
                            if (filter.sortDirection === -1) {
                                return a.completed ? 1 : -1;
                            } else if (filter.sortDirection === 1) {
                                return a.completed ? -1 : 1;
                            } else { return 0; }
                        }).map((todo: Todo) => {
                            return <TodoComponent key={todo.id} todo={todo} onChange={refetch}/>;
                        })
                    }
                    ---------------------------------------
                    {
                        todos.map((todo: Todo) => {
                            return <TodoComponent key={todo.id} todo={todo} onChange={refetch}/>;
                        })
                    }
                </Col>
            </Row>
        </Container>
    );
}
