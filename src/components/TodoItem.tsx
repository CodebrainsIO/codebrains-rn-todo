import { ListItem, Layout, Button, Icon, CheckBox } from '@ui-kitten/components';
import React from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';


const TodoItem = ({ item }) => {
    return (
        <ListItem
            title={`${item.title}`}
            description={`${item.title}`}
            accessoryRight={<RenderAccessory todo={item} />}
        />
    )
}

const RenderAccessory = ({ todo }) => {
    const [checked, setChecked] = React.useState(todo.completed);

    const DeleteIcon = (props) => (
        <Icon {...props} name='trash-2-outline' />
    );

    return (
        <Layout style={styles.container}>
            <Layout style={styles.layout} level='1'>
                <CheckBox
                    checked={checked}
                    onChange={nextChecked => setChecked(nextChecked)} />

            </Layout>
            <Layout style={styles.layout} level='1'>
                <Button size='tiny' accessoryLeft={DeleteIcon} />
            </Layout>
        </Layout>
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
        flex: .5,
        flexDirection: 'row',
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TodoItem;