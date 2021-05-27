const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const unitRouter = require("./routes/unit");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const p = path.resolve(__dirname, "../");
app.use(express.static(p)); //! caminho comum para arquivos publicos e estaticos

app.use("/api", indexRouter);
app.use("/unit", unitRouter);
app.get("*", (req, res) => {
	var options = {
		root: "frontend/public",
	};
	let fileName = req.url;
	res.sendFile(fileName, options, (err) => {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		} else {
			console.log("Sent:", fileName);
		}
	});
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// TODO Web Template Studio: Add your own error handler here.
if (process.env.NODE_ENV === "production") {
	// Do not send stack trace of error message when in production
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.send("Error occurred while handling the request.");
	});
} else {
	// Log stack trace of error message while in development
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		console.log(err);
		res.send(err.message);
	});
}

module.exports = app;
