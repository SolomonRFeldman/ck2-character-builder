Ruby Version 2.6.4

# Crusader Kings II Character Builder
Crusader Kings II Character Builder is a JS/Rails app that allows users to create characters, similar to how the ruler designer in Crusader Kings II works, so the user has another place to do it instead of just in-game. This comes with the benifit of not relying on having the game open on one menu to keep your character sheet and being able to persist your character.

# Installation
To run the webapp in a development setting you need to first setup postgresql. Then clone the repository, from inside the backend, run ```$ bundle install```, then run ```$ rake db:create```, then migrate the db and seed it (in order to populate the traits table). Now navigate to the front end in a different terminal and run ```$npm install``` and ```$npx webpack```. To run the app navigate to the backend and run up the rails server with ```$ rails s```. Now in a new terminal navigate to dist in the front end and open up index.html in your browser of choice.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/SolomonRFeldman/good-writes. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The app is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
