const dbName = "smartPostShow";
const storeName = "postsStore";

// Open or create the IndexedDB
const openDB = () => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, 1);

		request.onerror = (event) => reject(`Error opening DB: ${event.target.error}`);
		request.onsuccess = (event) => resolve(event.target.result);

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, {
					keyPath: "id",
					autoIncrement: true,
				});
			}
		};
	});
};

export const addPostsInIndexedDb = async (posts) => {
	try {
		const db = await openDB();
		const transaction = db.transaction([storeName], "readwrite");
		const store = transaction.objectStore(storeName);

		await store.add(posts);
		return "Post added successfully";
	} catch (error) {
		console.error(`Error adding post: ${error}`);
		throw error;
	}
};

export const removePostsFromIndexedDb = async () => {
	try {
		const db = await openDB();
		const transaction = db.transaction([storeName], "readwrite");
		const store = transaction.objectStore(storeName);
		await store.clear();
	} catch (error) {
		console.error(`Error removing all posts: ${error}`);
		throw error;
	}
};

export const getAllPostsFromIndexedDb = async (id) => {
	try {
		const db = await openDB();
		const transaction = db.transaction([storeName], "readonly");
		const store = transaction.objectStore(storeName);
		return new Promise((resolve, reject) => {
			const request = store.getAll();
			request.onsuccess = () => resolve(request?.result?.find((d) => d.key === id));
			request.onerror = (event) => reject(`Error fetching posts: ${event.target.error}`);
		});
	} catch (error) {
		console.error(error);
	}
};
