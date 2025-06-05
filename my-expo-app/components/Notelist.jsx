import { View, FlatList } from 'react-native'
import NoteItem from './NoteItem'

const Notelist = ({ book, deleteBook }) => {
    return (
        <View>
            <FlatList
                data={book}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NoteItem note={item} deleteBook={deleteBook}/>}
            />
        </View>
    )
}

export default Notelist