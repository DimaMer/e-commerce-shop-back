const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models/User');

const bcrypt = require('bcryptjs');

passport.serializeUser((client, done)=>{
  console.log(`We are going to serialize this: ${client.id}`);
  return done(null,client.id);
});

passport.deserializeUser((id, done)=>{
  console.log(`We are going to deserialize this: ${id}`);
    User.findById(id)
  .then( client =>{
    console.log('foundClient', client);
    return done(null,client);
  });
});

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async function(email, password, done) {

    const foundedUser = await User.findOne({ email });
      console.log(foundedUser)
    if(!foundedUser){
      return done(null, false);
    }
    const success = await bcrypt.compare(password, foundedUser.password);

    if (!success){
        return done(null, false) }

    return done(null, foundedUser);
  }
));


