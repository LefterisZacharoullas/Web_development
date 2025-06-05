import { View, Text, StyleSheet, TouchableOpacity, Alert, } from "react-native";
import { useState, useEffect } from "react";
import Notelist from "../../components/Notelist";
import AddNoteModal from "../../components/AddNoteModal";
import bookServices from "../../services/bookServices";

const NoteScreen = () => {
    //I have to use hooks to interact with the user
    const [book, SetBooks] = useState([]);
    const [pages, setPages] = useState();
    const [newNote, setNewNote] = useState("")
    const [modalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchbooks()
    }, []);

    const fetchbooks = async () => {
        setLoading(true);
        const res = await bookServices.getbooks()
        if (res.error) {
            setError(res.error)
            Alert.alert("Error", res.error) //This will notify the user
        } else {
            SetBooks(res)
            setError(null)
        }
        setLoading(false);
    }

    // This is post request to database 
    async function addNote() {
        if (newNote.trim() === "" || !pages) return

        const res = await bookServices.postbook({ book_name: newNote, last_page: parseInt(pages) }) //My post request
        console.log("Post Book Data:", res)

        if (res.error) {
            setError(res.error)
            Alert.alert("Error", res.error)
        } else {
            SetBooks((prevNotes) => [...prevNotes, res]);
            setNewNote("")
            setPages("")
            setModalVisible(false)
        }
    }

    // Delete request to db
    async function ondelete(id) {
        const bookToDelete = book.find(book => book.id === id);

        if (!bookToDelete) {
            Alert.alert("Error", "Book not found");
            return;
        }

        Alert.alert("Delete Book", `Are you sure you want to delete this book ${bookToDelete.book_name} ?`, [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    const res = await bookServices.deletebook(id)
                    if (res.error) {
                        Alert.alert("error", res.error)
                    } else {
                        SetBooks(book.filter((book) => book.id !== id))
                    }
                }
            }
        ])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>
                {loading && <Text>Loading...</Text>}
                {error && <Text style={{ color: 'red' }}>{error}</Text>}
            </Text>

            <Notelist book={book} deleteBook={ondelete} />

            <TouchableOpacity style={styles.addButton} onPress={() =>
                setModalVisible(true)}>
                <Text style={styles.addButtonText}>Add Note</Text>
            </TouchableOpacity>

            {/*Model */}
            <AddNoteModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                newNote={newNote}
                setNewNote={setNewNote}
                bookPages={pages}
                setPages={setPages}
                addNote={addNote}
            />
        </View>
    )
};

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
});

export default NoteScreen;