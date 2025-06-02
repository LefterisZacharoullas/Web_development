import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";

const NoteScreen = () => {
    const [notes, SetNotes] = useState([
        {id:1, text: "Note One"},
        {id:2, text: "Note Two"},
        {id:3, text: "Note three"},
    ]);

  return (
    <View style={styles.container}>
        <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>(
            <View style={styles.noteItem}>
                <Text style={styles.noteItem}> {item.text} </Text>
            </View>
            )}
        />


        <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Note</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})


export default NoteScreen;
