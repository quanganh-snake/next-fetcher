'use client';
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import FetchWrapper from '@/libs/fetcher/fetch-wrapper';

const fetchWrapper = new FetchWrapper('https://jsonplaceholder.typicode.com');

const HomePage = () => {
    const [todos, setTodos] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchWrapper.get('/todos', {
                    headers: {
                        'x-api-key': 'your-api-key-here', // Replace with your actual API key
                    },
                });
                setTodos((response.data as any) || []);
                console.log('Fetched todos:', response);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Header />
            {todos.length > 0 ? (
                <ul>
                    {todos.map((todo: any) => (
                        <li key={todo.id}>
                            {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No todos available.</p>
            )}
        </div>
    );
};

export default HomePage;
