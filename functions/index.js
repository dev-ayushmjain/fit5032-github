const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const {onDocumentCreated} = require("firebase-functions/firestore");
setGlobalOptions({maxInstances: 10});


const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = await admin.firestore().collection("books")
          .count();
      const count = (await booksCollection.get()).data().count;
      res.status(200).json({count});
    } catch (error) {
      console.error("Error counting books: ", error.message);
      res.status(500).send("Error counting books");
    }
  });
});


exports.capitalizeTrigger = onDocumentCreated("books/{bookId}",
    async (event) => {
      const snapshot = event.data;
      if (!snapshot) {
        console.log("No data associated with the event");
        return;
      }
      const data = snapshot.data();
      const bookId = event.params.bookId;
      console.log(`New book created ${bookId}:`, data);
      const newData = {...data,
        capitalizedName: String(data.name).toLocaleUpperCase()};
      try {
        await admin.firestore().collection("books")
            .doc(bookId).update(newData);
        console.log("Document modified");
      } catch (error) {
        console.error("Error capitalizing book");
      }
    });

