import { View, Text, StyleSheet } from "react-native";

const NoteItem = ({ note }) => {
    return (
        <View style={styles.noteItem}>
            <Text style={styles.NotesText}> {note.text} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    NotesText: {
        textAlign: "left",
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 15,
    },
    noteItem: {
        flex: 1,                    // allow it to fill space
        borderColor: "grey",
    }
});

export default NoteItem;