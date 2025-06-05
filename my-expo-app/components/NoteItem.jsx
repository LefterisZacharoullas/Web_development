import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

const NoteItem = ({ note, deleteBook }) => {
    return (
        <View style={styles.noteItem}>
            <Text style={styles.NotesText}> {note.book_name} </Text>
            <TouchableOpacity onPress={() => deleteBook(note.id)}>
                <Text style={styles.deleteBook}>❌</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    NotesText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
    },
    noteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    deleteBook: {
        fontSize: 18,
    }
});

export default NoteItem;