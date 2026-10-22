<template>
    <div>
        <ul>
            <h1>Books with ISBN > 1000</h1>
            <li v-for="book in books" :key="book.id">
                {{ book.name }} [{{ book.capitalizedName }}] (ISBN: {{ book.isbn }}) <span class="click-me" @click="editThisBook(book)">Edit</span>
                <span class="click-me-red" @click="deleteThisBook(book)">Delete</span>
            </li>
        </ul>

        <ul>
            <h1>Books with ISBN > 1000, limit 2</h1>
            <li v-for="book in books2" :key="book.id">
                {{ book.name }} [{{ book.capitalizedName }}] (ISBN: {{ book.isbn }}) <span class="click-me" @click="editThisBook(book)">Edit</span>
                <span class="click-me-red" @click="deleteThisBook(book)">Delete</span>
            </li>
        </ul>

        <ul>
            <h1>Books with ISBN > 1000, order by isbn desc</h1>
            <li v-for="book in books3" :key="book.id">
                {{ book.name }} [{{ book.capitalizedName }}] (ISBN: {{ book.isbn }}) <span class="click-me" @click="editThisBook(book)">Edit</span>
                <span class="click-me-red" @click="deleteThisBook(book)">Delete</span>
            </li>
        </ul>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";

const emitter = defineEmits(['editBook', 'deleteBook'])
const books = ref([]);
const books2 = ref([]);
const books3 = ref([]);

const fetchBooks = async () => {
    try {
        const q = query(collection(db, "books"), where('isbn', '>', 1000));
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
        })
        books.value = booksArray

        const q2 = query(collection(db, "books"), where('isbn', '>', 1000), limit(2));
        const querySnapshot2 = await getDocs(q2);
        const booksArray2 = [];
        querySnapshot2.forEach((doc) => {
            booksArray2.push({ id: doc.id, ...doc.data() });
        })
        books2.value = booksArray2;

        const q3 = query(collection(db, "books"), where('isbn', '>', 1000), orderBy('isbn', "desc"));
        const querySnapshot3 = await getDocs(q3);
        const booksArray3 = [];
        querySnapshot3.forEach((doc) => {
            booksArray3.push({ id: doc.id, ...doc.data() });
        })
        books3.value = booksArray3;
    }
    catch (error) {
        console.error("Error fetching books: ", error);
    }
}

const editThisBook = (book) => {
    emitter("editBook", book)
}

const deleteThisBook = (book) => {
    emitter("deleteBook", book)
}

onMounted (() => {
    fetchBooks ();
})

</script>

<style>
.click-me{
    color:blue;
    text-decoration: underline;
    cursor: pointer;
    padding-left: 8px;
}

.click-me-red{
    color:red;
    text-decoration: underline;
    cursor: pointer;
    padding-left: 8px;
}
</style>