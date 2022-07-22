import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { Divider, List, ListItem, TopNavigation, Text } from '@ui-kitten/components';
import { createTodo, deleteTodo, loadTodos, updateTodo } from '../services/todoService';
import { Input, Layout, Button } from '@ui-kitten/components';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [todos, setTodos] = useState([]);
  const [value, setValue] = React.useState('');

  const handleFormSubmit = (todo) => {
    console.log('Todo to create', todo);
    createTodo(todo).then(onRefresh());
    //message.success('Todo added!');
  };

  const handleRemoveTodo = (todo) => {
    console.log('Todo to remove', todo);
    deleteTodo(todo.id).then(onRefresh());;
    //message.warn('Todo removed!');
  };

  const handleToggleTodoStatus = (todo) => {
    console.log('Todo to change', todo);
    todo.completed = !todo.completed;
    updateTodo(todo).then(onRefresh());;
    //message.info('Todo state updated!');
  };

  const refresh = async () => {
    await loadTodos()
      .then(json => {
        setTodos(json);
        console.log('Todos', json);
      });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh().then(() => setRefreshing(false));
    console.log('Refresh state', refreshing);
  }, [refreshing]);

  useEffect(() => {
    refresh();
  }, [onRefresh]);

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.title}`}
    />
  );

  return (
    <>
      <TopNavigation
        title='Codebrains Todo'
      />
      <Divider />
      <Layout style={styles.rowContainer} level='1'>
        <Input
          style={styles.input}
          status='basic'
          placeholder='Enter your todo'
          onChangeText={nextValue => setValue(nextValue)}
        />

        <View style={styles.controlContainer}>
          <Button style={styles.button} size='tiny'>
            SUBMIT
          </Button>
        </View>
      </Layout>
      <Divider />
      {todos.length > 0 ? (<List
        style={styles.container}
        data={todos}
        ItemSeparatorComponent={Divider}
        renderItem={TodoItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />):(<Text>No Todos</Text>)}

    </>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    margin: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: '#3366FF',
  },
  button: {
  },
  container: {
  }
});

export default TodoList;