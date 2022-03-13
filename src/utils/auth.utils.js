
const Logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
};


const isAuthenticated = (req, res, next) => {
  if(req.user){
      next();
  } else {
      res.redirect('/');
  }
}


const renderWithErrors = (res, errors, user) => {
  console.log(errors)
	res.render("auth/signup", {
		errors: errors,
    user: user,
    layout: false
  },
  )};


export { Logout, isAuthenticated, renderWithErrors }