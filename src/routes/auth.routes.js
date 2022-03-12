import { Router } from "express";
import bcrypt from 'bcryptjs';


const authrouter = new Router();

const saltRounds = 10;

authrouter.get('/signup', (req, res) =>
  res.render('auth/signup')
);


authrouter.post('/signup', (req, res, next) => {
  console.log('The form data: ', req.body);

  const { username, email, password } = req.body;

  bcrypt
  .genSalt(saltRounds)
    .then(salt => 
      bcrypt.hash(password, salt)
    )
    .then(hashedPassword => 
      console.log(`Password hash: ${hashedPassword}`)
  )
    
/*   .then(hashedPassword => {
    return User.create({
      // username: username
      username,
      email,
      // passwordHash => this is the key from the User model
      //     ^
      //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
      passwordHash: hashedPassword
    });
  })
  .then(userFromDB => {
    console.log('Newly created user is: ', userFromDB);
  }) */
    
    .catch(error =>
      next(error)
    );
  
});


export { authrouter }

