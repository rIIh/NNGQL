import * as React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useState } from 'react';

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

export default function() {
  const { error, loading, data, refetch } = useQuery(TODOS);
  const [create] = useMutation(CREATE_TODO);
  const [remove] = useMutation(DELETE_TODO);
  const [switchState] = useMutation(SWITCH_STATE);
  const [newTodoTitle, setNewTodoTitle] = useState('Hello world');
  if (error) {
    return <p>Failed to fetch todos</p>;
  }
  if (loading) {
    return <p>Loading data</p>;
  }
  return <div className='todoContainer'>
    <input type='text' value={newTodoTitle} onChange={e => setNewTodoTitle(e.target.value)}/>
    <button onClick={e => create({
      variables: {
        title: newTodoTitle,
      },
    }).then(_ => refetch())}>
      Create
    </button>
    {
      data.todos.map((todo: Todo) => (
          <div className='todoRow' key={todo.id}>
            <input type='checkbox' checked={todo.completed} onChange={e => switchState({
              variables: {
                id: todo.id,
              },
            }).then(_ => refetch())}/>
            <p className={todo.completed ? 'completed' : ''}>{todo.title}</p>
            <button onClick={e => remove({
              variables: {
                id: todo.id,
              },
            }).then(_ => refetch())}>
              Remove
            </button>
          </div>
        ),
      )
    }
    <style jsx>{`
      div.todoContainer {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: space-around;
      }
      div.todoRow * {
        display: inline;
      }
      p.completed {
        text-line-through: single;
      }
    `}</style>
  </div>;
}
