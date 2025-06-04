import { View, FlatList } from 'react-native'
import NoteItem from './NoteItem'

const Notelist = ({ book }) => {
    return (
        <View>
            <FlatList
                data={book}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NoteItem note={item}/>}
            />
        </View>
    )
}

export default Notelist