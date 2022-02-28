
const router = require('express').Router();
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
	console.log("page hit");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', { message: 'Error connecting to MySQL' });
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {

			dbModel.getAllUsers((err, result) => {
				if (err) {
					res.render('error', { message: 'Error reading from MySQL' });
					console.log("Error reading from mysql");
					console.log(err);
				}
				else {
					res.render('index', { allUsers: result });
				}
			});
			dbConnection.release();
		}
	});

});

router.post('/addRestaurant', (req, res) => {
	console.log("form submit");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', { message: 'Error connecting to MySQL' });
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {

			dbModel.addRestaurant(req.body, (err, result) => {
				if (err) {
					res.render('error', { message: 'Error writing to MySQL' });
					console.log("Error writing to mysql");
					console.log(err);
				} else {
					res.redirect('/');
					console.log(result)
				}
			})

			dbConnection.release();
		}
	});
})

router.get("/deleteRestaurant", (req, res) => {
	console.log("we're here")
	let restaurantId = req.query.id;
	database.getConnection(function (err, dbConnection) {
		if(err) {
			res.render('error', { message: 'Error connecting to MySQL' });
			console.log("Error connecting to mysql");
			console.log(err);
		} else {
			
			if(restaurantId) {
				dbModel.deleteRestaurant(restaurantId, (err, result) => {
					if(err) {
						res.render('error', { message: 'Error writing to MySQL' });
						console.log("Error writing to mysql");
						console.log(err);					
					} else {
						res.redirect("/");
					}
				
				})
			}
			else {
				res.render('error', { message: 'Error on Delete' });
			}

			dbConnection.release();
		}
	})
})

router.get("/showReviews", (req, res) => {
	let restaurant_id = req.query.id
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', { message: 'Error connecting to MySQL' });
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {

			dbModel.getRestaurant(restaurant_id, (err, result) => {
				if (err) {
					res.render('error', { message: 'Error writing to MySQL' });
					console.log("Error writing to mysql");
					console.log(err);
				} else {
					res.render('showReviews', { result })
					// console.log(result)
				}
			})
		}
		dbConnection.release();

	})
})


router.get("/deleteReview", (req, res) => {
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', { message: 'Error connecting to MySQL' });
			console.log("Error connecting to mysql");
			console.log(err);
		} else {
			console.log(req.query);
			let reviewId = req.query.id;
			console.log(reviewId)
			
				dbModel.deleteReview(reviewId, (err, result) => {
					if (err) {
						res.render('error', { message: 'Error writing to MySQL' });
						console.log("Error writing to mysql");
						console.log(err);
					} else {
						// res.render(`showReviews?id=${reviewId}`)
						res.redirect('/')
					}
		})}
	})
}
)



module.exports = router;