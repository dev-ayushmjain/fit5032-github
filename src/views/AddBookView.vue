<template>
    <div class="fb-container">
        <h1>Add Book</h1>
        <form @submit.prevent="save">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="isbn" id="isbn" required>
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required>
            </div>
            <button type="submit" class="color-black" v-if="!editBook">Add Book</button>
            <button type="submit" class="color-black" v-if="editBook">Save</button>
            <button @click="cancelEdit" class="color-black" v-if="editBook">Cancel</button>
        </form>
    </div>
    <BookList @edit-book="editBook" @delete-book="deleteBook"></BookList>
</template>

<script setup>
import { ref } from 'vue';
import db from '../firebase/init.js';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

import BookList from '../components/BookList.vue';

const isbn = ref('');
const name = ref('');

var isEditing = ref(false)
var editingBook = null

const save = async () => {
    try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
            alert('Please enter a valid ISBN number. ');
            return;
        }
        if(!isEditing.value){
            await addDoc(collection(db, "books"), {
                isbn: isbnNumber,
                name: name.value
            });
            alert('Book added successfully!');
        }
        else{
            const bookRef = doc(db, "books", editingBook.id);
            await updateDoc(bookRef, {
                isbn: isbnNumber,
                name: name.value
            });
            alert('Book updated successfully!');
            isEditing.value = false;
            editingBook = null;
        }
        isbn.value = '';
        name.value = '';

    } catch (error) {
        console.error('Error adding book: ', error);
    }
}

const editBook = (book) => {
    editingBook = book
    isbn.value = book.isbn
    name.value = book.name
    isEditing.value = true
}

const deleteBook = async (book) => {
    try {
        const bookRef = doc(db, "books", book.id);
        await deleteDoc(bookRef);
        alert('Book deleted successfully!');
    } catch (error) {
        console.error('Error deleting book: ', error);
    }
}

</script>

<style>
.fb-container{
    width: 100%;
    padding: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.color-black {
    color: black;
}

</style>