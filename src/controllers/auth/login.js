import mongoose from 'mongoose';
import { User } from '../../models/User.model.js';
import bcrypt from 'bcryptjs';
import { renderWithErrors } from '../../utils/auth.js'; 


const Login = (req, res, next) => {

  const user = ({ email, password } = req.body);
  const USER = isUserRegistered(user.email)

  if (USER) {
    if (isValidPassword(user.password, USER.passwordHash)) {
    req.session.currentUser = USER._id;
    res.redirect('/');  
    }
  }
  else {
    renderWithErrors(
      { errorMessage: 'Email is not registered. Try with other email.' },
      user
    )
  }
}


const isUserRegistered = (email) => {
  User.findOne({ email })
    .then((user) => {
      return user
    })    
  .catch((err) => {
    if (err instanceof mongoose.Error.ValidationError) {
      renderWithErrors(err.errors);
    } else {
      next(err);
    }
  });
}


const isValidPassword = (password, passwordHash) => {
  return bcrypt.compareSync(password, passwordHash)
}


export { Login }


/* User.findOne({ email: email })
.then((userFound) => {
    if(userFound) {
        return userFound.checkPassword(password)
            .then((match) => {
                if(!match) {
                    res.render('auth/login', {
                        errors: {
                            password: 'Invalid email or password',
                            email: 'Invalid email or password'
                        },
                        user: req.body
                    });
                } else {
                    req.session.userId = userFound._id;
                    res.redirect('/profile');
                }
            })
    } else {
        res.render('auth/login', {
            errors: {
                email: 'Invalid email or password',
                password: 'Invalid email or password'
            }
        });
    }
})
.catch((e) => next(e)); */