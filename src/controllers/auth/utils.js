const logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
};


const isAuthenticated = (req, res, next) => {
  if(req.user){
      next();
  } else {
      res.redirect('/');
  }
}


const renderWithErrors = (errors, user) => {
	res.render("auth/register", {
		errors: errors,
		user: user,
	});
};


export { logout, isAuthenticated, renderWithErrors }