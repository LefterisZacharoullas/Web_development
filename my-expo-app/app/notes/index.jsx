import { View, Text, StyleSheet, TouchableOpacity, Alert, } from "react-native";
import { useState, useEffect } from "react";
import Notelist from "../../components/Notelist";
import AddNoteModal from "../../components/AddNoteModal";
import bookServices from "../../services/bookServices";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "expo-router";

const NoteScreen = () => {
    //I have to use hooks to interact with the user
    const [book, SetBooks] = useState([]);
    const [pages, setPages] = useState();
    const [newNote, setNewNote] = useState("")
    const [modalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            setError("You must be logged in to view notes.");
            router.replace("/auth"); // Redirect to auth page if not authenticated
            return;
        } else {
            fetchbooks();
            setError(null);
        }
    }, [isAuthenticated]);

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

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>
                {loading && <Text>Loading...</Text>}
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