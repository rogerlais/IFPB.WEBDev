const logRoutes = (app) => {
	console.log("Rotas atualmente carregadas da aplicação:");
	if (app._router) {
		app._router.stack.forEach(function (r) {
			if (r.route && r.route.path) {
				console.log(r.route.path);
			}
		});
	} else {
		console.log("Nehuma no momento!");
	}
};

module.exports = { logRoutes };
