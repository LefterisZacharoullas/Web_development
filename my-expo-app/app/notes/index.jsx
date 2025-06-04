import { View, Text, StyleSheet, TouchableOpacity, Alert, } from "react-native";
import { useState, useEffect} from "react";
import Notelist from "../../components/Notelist";
import AddNoteModal from "../../components/AddNoteModal";
import { getbooks, postbook } from "@/services/bookServices"

const NoteScreen = () => {
    //I have to use hooks to interact with the user
    const [book, SetBooks] = useState([]);
    const [pages, setPages] = useState();
    const [newNote, setNewNote] = useState("")
    const [modalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState(true)
    const [error, setError ] = useState(null)

    useEffect(() => {
        fetchbooks()
    }, []);

    const fetchbooks = async () => {
        setLoading(true);
        const res = await getbooks()
        if (res.error){
            setError(res.error)
            Alert.alert("Error", res.error) //This will notify the user
        } else{
            SetBooks(res)
            setError(null)
        }
        setLoading(false);
    }

    // This is post request to database 
    async function addNote() {
        if (newNote.trim() === "" || !pages) return

        const res = await postbook({book_name: newNote, last_page: parseInt(pages)}) //My post request
        console.log("Post Book Data:", res)

        if (res.error){
            setError(res.error)
            Alert.alert("Error", res.error)
        } else {
            SetBooks((prevNotes) => [...prevNotes, res]);
            setNewNote("")
            setPages("")
            setModalVisible(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>
                {loading && <Text>Loading...</Text>}
                {error && <Text style={{color: 'red'}}>{error}</Text>}
            </Text>

            <Notelist book={book} />

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