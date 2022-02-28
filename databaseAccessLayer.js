const database = include('/databaseConnection');


function getAllUsers(callback) {
	let sqlQuery = "SELECT restaurant_id, name, description FROM restaurant";
	database.query(sqlQuery, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}

function getRestaurant(restaurant_id, callback) {
	let sqlQuery = `SELECT review_id, reviewer_name, details, rating, name, description FROM review INNER JOIN restaurant ON review.restaurant_id = restaurant.restaurant_id WHERE review.restaurant_id = ${restaurant_id}`
	database.query(sqlQuery, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			callback(null, results);
		}
	});
}
function addRestaurant(postData, callback) {

	let sqlInsertSalt = "INSERT INTO restaurant (name, description) VALUES(:name, :description); ";
	let params = {
		name: postData.name,
		description: postData.description
	};
	console.log(sqlInsertSalt);
	database.query(sqlInsertSalt, params, (err, results, fields) => {
		if (err) {
			console.log(err);
			callback(err, null);
		} else {
			console.log(results);
			callback(null, results);
		}
	})
}

function deleteRestaurant(restaurantId, callback) {
	let sqlDeleteRestaurant = `DELETE FROM review WHERE review.restaurant_id = ${restaurantId}`
	let params = {
		restaurantId: restaurantId
	};
	database.query(sqlDeleteRestaurant, params, (err, result, fields) => {
		if(err) {
			callback(err, null)
		}
		else {
			sqlDeleteRestaurant = `DELETE FROM restaurant WHERE restaurant.restaurant_id = ${restaurantId}`
		
			database.query(sqlDeleteRestaurant, params, (err, result, fields) => {
				if(err) {
					callback(err, null)
				} else {
					callback(null, result)
				}
			})
		}
	})
}

function deleteReview(reviewId, callback) {
	let sqlDeleteReview = `DELETE FROM review WHERE review_id = ${reviewId}`;
	let params = {
		reviewId: reviewId
	};
	database.query(sqlDeleteReview, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}


module.exports = { getAllUsers, addRestaurant, getRestaurant, deleteRestaurant, deleteReview }