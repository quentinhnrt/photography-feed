require("firebase-functions/lib/logger/compat");
const { db } = require('../util/admin');

exports.getAllTodos = (request, response) => {
	db
		.collection('todos')
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let todos = [];
            console.log('datas :' + data[0]);
			data.forEach((doc) => {
				todos.push({
                    todoId: doc.id,
                    title: doc.data().Title,
					body: doc.data().Body,
					createdAt: doc.data().createdAt,
				});
			});
			return response.json(todos);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};